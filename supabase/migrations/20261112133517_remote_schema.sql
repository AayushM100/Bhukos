SET local check_function_bodies = off;

CREATE TABLE "public"."food_items" (
  "id"          uuid                     NOT NULL DEFAULT gen_random_uuid(),
  "name"        text                     NOT NULL,
  "brand"       text                     NOT NULL,
  "category"    text,
  "rarity"      text,
  "poster_url"  text,
  "description" text,
  "flavors"     text[],
  "quote"       text,
  "created_at"  timestamp with time zone DEFAULT now(),
  CONSTRAINT "food_items_pkey" PRIMARY KEY (id),
  CONSTRAINT "food_items_rarity_check" CHECK ((rarity = ANY (ARRAY['Common'::text, 'Rare'::text, 'Epic'::text, 'Legendary'::text])))
);

ALTER TABLE "public"."food_items"
  ENABLE ROW LEVEL SECURITY;

CREATE TABLE "public"."logs" (
  "id"           uuid                     NOT NULL DEFAULT gen_random_uuid(),
  "user_id"      uuid,
  "food_item_id" uuid,
  "rating"       integer,
  "review"       text,
  "created_at"   timestamp with time zone DEFAULT now(),
  CONSTRAINT "logs_pkey" PRIMARY KEY (id),
  CONSTRAINT "logs_rating_check" CHECK (((rating >= 1) AND (rating <= 10)))
);

ALTER TABLE "public"."logs"
  ENABLE ROW LEVEL SECURITY;

CREATE TABLE "public"."profiles" (
  "id"           uuid                     NOT NULL,
  "username"     text,
  "full_name"    text,
  "avatar_url"   text,
  "streak_count" integer                  DEFAULT 0,
  "last_login"   timestamp with time zone DEFAULT now(),
  "created_at"   timestamp with time zone DEFAULT now(),
  CONSTRAINT "profiles_pkey" PRIMARY KEY (id),
  CONSTRAINT "profiles_username_key" UNIQUE (username)
);

ALTER TABLE "public"."profiles"
  ENABLE ROW LEVEL SECURITY;

CREATE TABLE "public"."trivia" (
  "id"          uuid NOT NULL DEFAULT gen_random_uuid(),
  "fact"        text NOT NULL,
  "source"      text,
  "active_date" date NOT NULL,
  CONSTRAINT "trivia_active_date_key" UNIQUE (active_date),
  CONSTRAINT "trivia_pkey" PRIMARY KEY (id)
);

ALTER TABLE "public"."trivia"
  ENABLE ROW LEVEL SECURITY;

CREATE TABLE "public"."wishlist" (
  "id"           uuid                     NOT NULL DEFAULT gen_random_uuid(),
  "user_id"      uuid,
  "food_item_id" uuid,
  "created_at"   timestamp with time zone DEFAULT now(),
  CONSTRAINT "wishlist_pkey" PRIMARY KEY (id)
);

ALTER TABLE "public"."wishlist"
  ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.handle_new_user()
  RETURNS TRIGGER
  LANGUAGE plpgsql
  SECURITY DEFINER
  SET search_path TO ''
  AS $function$
declare
    generated_username text;
begin

    generated_username :=
        lower(
            regexp_replace(
                coalesce(
                    new.raw_user_meta_data ->> 'username',
                    split_part(coalesce(new.email, 'foodie'), '@', 1)
                ),
                '[^a-zA-Z0-9_]',
                '',
                'g'
            )
        ) || '_' || substr(new.id::text, 1, 8);

    insert into public.profiles (
        id,
        username,
        full_name,
        avatar_url
    )
    values (
        new.id,
        generated_username,
        coalesce(
            new.raw_user_meta_data ->> 'full_name',
            new.raw_user_meta_data ->> 'name'
        ),
        new.raw_user_meta_data ->> 'picture'
    );

    return new;
end;
$function$;

CREATE OR REPLACE FUNCTION public.rls_auto_enable()
  RETURNS event_trigger
  LANGUAGE plpgsql
  SECURITY DEFINER
  SET search_path TO 'pg_catalog'
  AS $function$
DECLARE
  cmd record;
  tbl name;
BEGIN
  FOR cmd IN
    SELECT *
    FROM pg_event_trigger_ddl_commands()
    WHERE command_tag IN ('CREATE TABLE', 'CREATE TABLE AS', 'SELECT INTO')
      AND object_type IN ('table','partitioned table')
  LOOP
     IF cmd.schema_name IS NOT NULL AND cmd.schema_name IN ('public') AND cmd.schema_name NOT IN ('pg_catalog','information_schema') AND cmd.schema_name NOT LIKE 'pg_toast%' AND cmd.schema_name NOT LIKE 'pg_temp%' THEN
      BEGIN
        SELECT c.relname INTO tbl FROM pg_catalog.pg_class c WHERE c.oid = cmd.objid;
        EXECUTE format('alter table if exists %I.%I enable row level security', cmd.schema_name, tbl);
        RAISE LOG 'rls_auto_enable: enabled RLS on %', cmd.object_identity;
      EXCEPTION
        WHEN OTHERS THEN
          RAISE LOG 'rls_auto_enable: failed to enable RLS on %', cmd.object_identity;
      END;
     ELSE
        RAISE LOG 'rls_auto_enable: skip % (either system schema or not in enforced list: %.)', cmd.object_identity, cmd.schema_name;
     END IF;
  END LOOP;
END;
$function$;

ALTER TABLE "public"."logs"
  ADD CONSTRAINT "logs_food_item_id_fkey" FOREIGN KEY (food_item_id) REFERENCES public.food_items(id) ON DELETE CASCADE;

ALTER TABLE "public"."profiles"
  ADD CONSTRAINT "profiles_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE "public"."logs"
  ADD CONSTRAINT "logs_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;

ALTER TABLE "public"."wishlist"
  ADD CONSTRAINT "wishlist_food_item_id_fkey" FOREIGN KEY (food_item_id) REFERENCES public.food_items(id) ON DELETE CASCADE;

ALTER TABLE "public"."wishlist"
  ADD CONSTRAINT "wishlist_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;

CREATE INDEX idx_food_items_brand ON public.food_items USING btree (brand);

CREATE INDEX idx_food_items_name ON public.food_items USING btree (name);

CREATE INDEX idx_logs_food_item_id ON public.logs USING btree (food_item_id);

CREATE INDEX idx_logs_user_id ON public.logs USING btree (user_id);

CREATE INDEX idx_wishlist_user_id ON public.wishlist USING btree (user_id);

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

CREATE POLICY "Food items are viewable by everyone" ON "public"."food_items"
  FOR SELECT
  TO PUBLIC
  USING (true);

CREATE POLICY "Logs are viewable by everyone" ON "public"."logs"
  FOR SELECT
  TO PUBLIC
  USING (true);

CREATE POLICY "Users can delete own logs" ON "public"."logs"
  FOR DELETE
  TO PUBLIC
  USING ((auth.uid() = user_id));

CREATE POLICY "Users can insert own logs" ON "public"."logs"
  FOR INSERT
  TO PUBLIC
  WITH CHECK ((auth.uid() = user_id));

CREATE POLICY "Users can update own logs" ON "public"."logs"
  FOR UPDATE
  TO PUBLIC
  USING ((auth.uid() = user_id))
  WITH CHECK ((auth.uid() = user_id));

CREATE POLICY "Profiles are viewable by everyone" ON "public"."profiles"
  FOR SELECT
  TO PUBLIC
  USING (true);

CREATE POLICY "Users can update own profile" ON "public"."profiles"
  FOR UPDATE
  TO PUBLIC
  USING ((auth.uid() = id))
  WITH CHECK ((auth.uid() = id));

CREATE POLICY "Trivia is viewable by everyone" ON "public"."trivia"
  FOR SELECT
  TO PUBLIC
  USING (true);

CREATE POLICY "Users can manage own wishlist" ON "public"."wishlist"
  FOR ALL
  TO PUBLIC
  USING ((auth.uid() = user_id))
  WITH CHECK ((auth.uid() = user_id));

CREATE EVENT TRIGGER "ensure_rls"
  ON ddl_command_end
  WHEN TAG IN ('CREATE TABLE', 'CREATE TABLE AS', 'SELECT INTO')
  EXECUTE FUNCTION "public"."rls_auto_enable"();

GRANT EXECUTE ON FUNCTION "public"."handle_new_user"() TO PUBLIC, "anon", "authenticated";

REVOKE ALL ON FUNCTION "public"."handle_new_user"() FROM "postgres";

GRANT EXECUTE ON FUNCTION "public"."handle_new_user"() TO "postgres";

GRANT EXECUTE ON FUNCTION "public"."handle_new_user"() TO "service_role";

GRANT EXECUTE ON FUNCTION "public"."rls_auto_enable"() TO PUBLIC, "anon", "authenticated";

REVOKE ALL ON FUNCTION "public"."rls_auto_enable"() FROM "postgres";

GRANT EXECUTE ON FUNCTION "public"."rls_auto_enable"() TO "postgres";

GRANT EXECUTE ON FUNCTION "public"."rls_auto_enable"() TO "service_role";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."food_items" TO "anon", "authenticated";

REVOKE ALL ON TABLE "public"."food_items" FROM "postgres";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."food_items" TO "postgres";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."food_items" TO "service_role";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."logs" TO "anon", "authenticated";

REVOKE ALL ON TABLE "public"."logs" FROM "postgres";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."logs" TO "postgres";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."logs" TO "service_role";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."profiles" TO "anon", "authenticated";

REVOKE ALL ON TABLE "public"."profiles" FROM "postgres";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."profiles" TO "postgres";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."profiles" TO "service_role";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."trivia" TO "anon", "authenticated";

REVOKE ALL ON TABLE "public"."trivia" FROM "postgres";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."trivia" TO "postgres";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."trivia" TO "service_role";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."wishlist" TO "anon", "authenticated";

REVOKE ALL ON TABLE "public"."wishlist" FROM "postgres";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."wishlist" TO "postgres";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."wishlist" TO "service_role";


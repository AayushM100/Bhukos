-- Seed Data for Indian Food Brands (Bhukos)

insert into public.food_items (name, brand, category, rarity, description, flavors, quote)
values
  (
    'Maaza Mango Drink',
    'Coca-Cola',
    'Drinks',
    'Common',
    'Thick mango, sunny afternoons and the kind of nostalgia that doesn’t need a special occasion.',
    array['Sweet', 'Mango', 'Rich'],
    'A little sip of an Indian summer.'
  ),
  (
    'Haldiram Aloo Bhujia',
    'Haldiram''s',
    'Snacks',
    'Rare',
    'Classic masala and potato crunch that pairs with every cup of chai.',
    array['Classic Masala', 'Crunchy', 'Spicy'],
    'The crunch that always delivers.'
  ),
  (
    'Parle-G Glucose Biscuit',
    'Parle',
    'Biscuits',
    'Common',
    'The undisputed king of tea-time. Dunk for exactly two seconds for peak bliss.',
    array['Sweet', 'Malt', 'Buttery'],
    'Genius everyday snacking.'
  ),
  (
    'Paper Boat Aam Panna',
    'Paper Boat',
    'Beverages',
    'Epic',
    'Raw mango cooler laced with roasted cumin and black salt.',
    array['Sour', 'Tangy', 'Cumin'],
    'Summer in a pouch.'
  ),
  (
    'Old Monk 7-Year Rum',
    'Mohan Meakin',
    'Spirits',
    'Legendary',
    'Dark, vanilla-kissed legendary rum that fuels decades of college stories.',
    array['Vanilla', 'Oak', 'Caramel'],
    'Not just a drink, an emotion.'
  );

-- Sample Daily Trivia
insert into public.trivia (fact, source, active_date)
values
  (
    'The best part of a biscuit? The two seconds before it meets chai.',
    'From the community''s very unofficial snack wisdom.',
    current_date
  )
on conflict (active_date) do nothing;

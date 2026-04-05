const sampleRecipes = [
  {
    id: "sample-1",
    name: "Classic Italian Margherita",
    category: "Italian", // User-defined tag
    description: "1. Prepare pizza dough.\n2. Spread crushed San Marzano tomatoes.\n3. Add fresh buffalo mozzarella and basil leaves.\n4. Drizzle with extra virgin olive oil.\n5. Bake in a 450°F oven until charred.",
    image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?auto=format&fit=crop&q=80&w=1000",
    mediaType: "image",
    userId: "chef-1",
    username: "Napoletana_King",
    userPhoto: "https://api.dicebear.com/7.x/avataaars/svg?seed=King",
    createdAt: new Date().toISOString(),
    likes: 124,
    comments: [
      { id: 101, username: "PizzaLover", text: "The crust looks perfect!", createdAt: new Date().toISOString() }
    ]
  },
  {
    id: "sample-2",
    name: "Spicy Ghost Pepper Wings",
    category: "Spicy",
    description: "Warning: Extremely hot! \n1. Deep fry wings until crispy.\n2. Toss in ghost pepper and honey glaze.\n3. Serve with blue cheese to survive the heat.",
    image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&q=80&w=1000",
    mediaType: "image",
    userId: "chef-2",
    username: "FireBreather",
    userPhoto: "https://api.dicebear.com/7.x/avataaars/svg?seed=Spice",
    createdAt: new Date().toISOString(),
    likes: 89,
    comments: []
  },
  {
    id: "sample-3",
    name: "Garden Fresh Buddha Bowl",
    category: "Vegan",
    description: "1. Quinoa base.\n2. Top with roasted chickpeas, avocado, and kale.\n3. Lemon tahini dressing on top.",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=1000",
    mediaType: "image",
    userId: "chef-3",
    username: "EcoEats",
    userPhoto: "https://api.dicebear.com/7.x/avataaars/svg?seed=Green",
    createdAt: new Date().toISOString(),
    likes: 256,
    comments: []
  },
  {
    id: "sample-4",
    name: "Mom's Secret Ramen",
    category: "Comfort Food",
    description: "1. Soft boil eggs for exactly 6.5 minutes.\n2. Simmer pork bone broth for 12 hours.\n3. Add handmade noodles and chashu pork.",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&q=80&w=1000",
    mediaType: "image",
    userId: "chef-4",
    username: "TokyoDrift",
    userPhoto: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tokyo",
    createdAt: new Date().toISOString(),
    likes: 512,
    comments: []
  }
];

export default sampleRecipes;
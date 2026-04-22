// data.js - Central Data Store for DineDash Hyderabad

const restaurants = [
    { 
        id: 1, 
        name: "Jewel of Nizams", 
        rating: 4.8, 
        location: "Masab Tank", 
        area: "Central Hyderabad",
        cuisine: "Mughlai, Hyderabadi", 
        image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800", 
        price: "₹3000 for two",
        description: "The Minar is an iconic fine-dining destination offering authentic royal flavors."
    },
    { 
        id: 2, 
        name: "Bawarchi", 
        rating: 4.5, 
        location: "RTC X Roads", 
        area: "Musheerabad",
        cuisine: "Biryani, North Indian", 
        image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=800", 
        price: "₹800 for two",
        description: "The legendary home of Hyderabad's most famous Dum Biryani."
    },
    { 
        id: 3, 
        name: "Tatva", 
        rating: 4.7, 
        location: "Jubilee Hills", 
        area: "West Hyderabad",
        cuisine: "Fine Dining, Vegetarian", 
        image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800", 
        price: "₹2500 for two",
        description: "Elegant global fusion vegetarian cuisine in a sophisticated setting."
    },
    { 
        id: 4, 
        name: "Roast 24/7", 
        rating: 4.4, 
        location: "Gachibowli", 
        area: "IT Corridor",
        cuisine: "Cafe, Continental", 
        image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800", 
        price: "₹1200 for two",
        description: "A trendy 24-hour spot perfect for late-night coffee and European snacks."
    },
    { 
        id: 5, 
        name: "Chutneys", 
        rating: 4.3, 
        location: "Banjara Hills", 
        area: "Central Hyderabad",
        cuisine: "South Indian", 
        image: "https://images.unsplash.com/photo-1626074353765-517a681e40be?w=800", 
        price: "₹600 for two",
        description: "Famous for its variety of 6 different chutneys served with every tiffin."
    },
    { 
        id: 6, 
        name: "Olive Bistro", 
        rating: 4.6, 
        location: "Jubilee Hills", 
        area: "West Hyderabad",
        cuisine: "Mediterranean, Italian", 
        image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800", 
        price: "₹2200 for two",
        description: "A lakeside bungalow vibe offering the best wood-fired pizzas in town."
    },
    { 
        id: 7, 
        name: "Exotica", 
        rating: 4.4, 
        location: "Banjara Hills", 
        area: "Central Hyderabad",
        cuisine: "North Indian, Chinese", 
        image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800", 
        price: "₹1800 for two",
        description: "A rooftop garden restaurant with a serene atmosphere and great kebabs."
    },
    { 
        id: 8, 
        name: "Flechazo", 
        rating: 4.5, 
        location: "Madhapur", 
        area: "IT Corridor",
        cuisine: "Mediterranean, Asian", 
        image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800", 
        price: "₹1500 for two",
        description: "A vibrant buffet experience with live pasta and liquid nitrogen ice cream."
    },
    { 
        id: 9, 
        name: "The Fisherman's Wharf", 
        rating: 4.2, 
        location: "Gachibowli", 
        area: "IT Corridor",
        cuisine: "Goan, Seafood", 
        image: "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=800", 
        price: "₹1800 for two",
        description: "Bringing the spirit of Goa to Hyderabad with live music and fresh seafood."
    },
    { 
        id: 10, 
        name: "Manam Chocolate", 
        rating: 4.9, 
        location: "Banjara Hills", 
        area: "Central Hyderabad",
        cuisine: "Desserts, Cafe", 
        image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800", 
        price: "₹1200 for two",
        description: "India's premier craft chocolate experience and lab."
    },
    { 
        id: 11, 
        name: "Shah Ghouse", 
        rating: 4.3, 
        location: "Gachibowli", 
        area: "West Hyderabad",
        cuisine: "Mughlai, Mandi", 
        image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=800", 
        price: "₹900 for two",
        description: "A legendary spot known for its rich Haleem and spicy kebabs."
    },
    { 
        id: 12, 
        name: "Aura Cafe", 
        rating: 4.8, 
        location: "Jubilee Hills", 
        area: "West Hyderabad",
        cuisine: "Italian, Continental", 
        image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800", 
        price: "₹1500 for two",
        description: "Artisanal coffee and gourmet dishes in an Instagram-worthy space."
    },
    { 
        id: 13, 
        name: "Pista House", 
        rating: 4.4, 
        location: "Masab Tank", 
        area: "Central Hyderabad",
        cuisine: "Mughlai, Haleem", 
        image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=800", 
        price: "₹800 for two",
        description: "A global leader in Haleem and traditional Hyderabadi pastries."
    },
    { 
        id: 14, 
        name: "Mandar", 
        rating: 4.1, 
        location: "Masab Tank", 
        area: "Central Hyderabad",
        cuisine: "Arabian, Mandi", 
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800",
        price: "₹1000 for two",
        description: "The go-to destination for authentic Arabian Mandi in the city."
    },
    { 
        id: 15, 
        name: "Absolute Barbecues", 
        rating: 4.8, 
        location: "Gachibowli", 
        area: "IT Corridor",
        cuisine: "BBQ, Buffet", 
        image: "https://images.unsplash.com/photo-1529193591184-b1d58b34ecdf?w=800", 
        price: "₹1600 for two",
        description: "A DIY grilling experience with an extensive global buffet."
    },
    { 
        id: 16, 
        name: "Social", 
        rating: 4.6, 
        location: "Jubilee Hills", 
        area: "West Hyderabad",
        cuisine: "Fusion, Finger Food", 
        image: "https://images.unsplash.com/photo-1560624052-449f5ddf0c31?w=800", 
        price: "₹1500 for two",
        description: "A collaborative workspace by day and a high-energy bar by night."
    },
    { 
        id: 17, 
        name: "Conçu", 
        rating: 4.9, 
        location: "Jubilee Hills", 
        area: "West Hyderabad",
        cuisine: "French, Desserts", 
        image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800", 
        price: "₹1200 for two",
        description: "Exquisite French patisserie offering hand-crafted cakes."
    },
    { 
        id: 18, 
        name: "The Grill Lab", 
        rating: 4.2, 
        location: "Banjara Hills", 
        area: "Central Hyderabad",
        cuisine: "Steaks, BBQ", 
        image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800", 
        price: "₹1700 for two",
        description: "Experimental grilling techniques meeting classic steakhouse vibes."
    },
    { 
        id: 19, 
        name: "Nimrah Cafe", // Corrected from 'Nirmah'
        rating: 4.9, 
        location: "Masab Tank", 
        area: "Old City",
        cuisine: "Irani Chai, Bakery", 
        image: "https://images.unsplash.com/photo-1594631252845-29fc45865157?w=800",
        price: "₹200 for two",
        description: "Iconic Irani chai and Osmania biscuits near Charminar."
    },
    { 
        id: 20, 
        name: "Saffron Soul", 
        rating: 4.2, 
        location: "Jubilee Hills", 
        area: "West Hyderabad",
        cuisine: "North Indian, Thali", 
        image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800", 
        price: "₹1100 for two",
        description: "Traditional Indian thalis served with soul-warming spices."
    },
    { 
        id: 21, 
        name: "Blue Fox", 
        rating: 4.1, 
        location: "Himayatnagar", 
        area: "Central Hyderabad",
        cuisine: "Multi-cuisine, Bar", 
        image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800", 
        price: "₹1400 for two",
        description: "A classic city staple known for its sophisticated bar and reliable food."
    },
    { 
        id: 22, 
        name: "The Glass House", 
        rating: 4.4, 
        location: "Gachibowli", 
        area: "IT Corridor",
        cuisine: "European, Modern Indian", 
        image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800", 
        price: "₹2500 for two",
        description: "Stunning architecture and a global menu in the heart of the IT hub."
    },
    { 
        id: 23, 
        name: "SodaBottleOpenerWala", 
        rating: 4.3, 
        location: "Jubilee Hills", 
        area: "West Hyderabad",
        cuisine: "Parsi, Iranian", 
        image: "https://images.unsplash.com/photo-1563897539633-7374c276c212?w=800", 
        price: "₹1300 for two",
        description: "A quirky tribute to the dying legacy of a Bombay Irani Cafe."
    },
    { 
        id: 24, 
        name: "Autumn Leaf Cafe", 
        rating: 4.6, 
        location: "Jubilee Hills", 
        area: "West Hyderabad",
        cuisine: "American, Health Food", 
        image: "https://images.unsplash.com/photo-1466632346460-9d533a2a1c94?w=80", 
        price: "₹1100 for two",
        description: "A garden cafe that feels like a hidden sanctuary in the city."
    },
    { 
        id: 25, 
        name: "Minerva Coffee Shop", 
        rating: 4.4, 
        location: "Himayatnagar", 
        area: "Central Hyderabad",
        cuisine: "South Indian, Pure Veg", 
        image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800", 
        price: "₹500 for two",
        description: "Timeless South Indian breakfast and filter coffee."
    },
    { 
        id: 26, 
        name: "Paradise Biryani", 
        rating: 4.0, 
        location: "Secunderabad", 
        area: "Secunderabad",
        cuisine: "Hyderabadi, Biryani", 
        image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=800", 
        price: "₹1000 for two",
        description: "The world-famous landmark for authentic Hyderabadi Dum Biryani."
    },
    { 
        id: 27, 
        name: "Starbucks", 
        rating: 4.5, 
        location: "Banjara Hills", 
        area: "Central Hyderabad",
        cuisine: "Cafe, Beverages", 
        image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800", 
        price: "₹800 for two",
        description: "Global coffee giant offering premium beans and cozy workspaces."
    },
    { 
        id: 28, 
        name: "Hard Rock Cafe", 
        rating: 4.7, 
        location: "Hitech City", 
        area: "IT Corridor",
        cuisine: "American, Burger", 
        image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800", 
        price: "₹2500 for two",
        description: "Rock 'n' roll-themed chain with a high-energy vibe and legendary burgers."
    },
    { 
        id: 29, 
        name: "Third Wave Coffee", 
        rating: 4.6, 
        location: "Gachibowli", 
        area: "IT Corridor",
        cuisine: "Cafe, Roastery", 
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800", 
        price: "₹700 for two",
        description: "Specialty coffee roasters committed to the craft of artisan brewing."
    },
    { 
        id: 30, 
        name: "Omani Cafe", 
        rating: 4.2, 
        location: "Banjara Hills", 
        area: "Central Hyderabad",
        cuisine: "Arabian, Desserts", 
        image: "https://images.unsplash.com/photo-1590604518089-3abb1d1162da?w=800", 
        price: "₹900 for two",
        description: "Authentic Omani sweets and middle-eastern hospitality."
    }
];

const menuItems = [
    { id: 101, name: "Special Mutton Biryani", price: 420, image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400", category: "Main Course", isVeg: false },
    { id: 102, name: "Chicken 65 (Dry)", price: 320, image: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=400", category: "Starters", isVeg: false },
    { id: 103, name: "Paneer Butter Masala", price: 280, image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400", category: "Main Course", isVeg: true },
    { id: 104, name: "Double Ka Meetha", price: 150, image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400", category: "Dessert", isVeg: true },
    { id: 105, name: "Qubani Ka Meetha", price: 180, image: "https://images.unsplash.com/photo-1589114470451-240292723c0b?w=400", category: "Dessert", isVeg: true },
    { id: 106, name: "Garlic Naan (2pcs)", price: 90, image: "https://images.unsplash.com/photo-1601050633729-19548d688a7d?w=400", category: "Breads", isVeg: true }
];

let userWallet = {
    balance: 500, 
    rewardPoints: 50, 
    transactionHistory: [
        { id: 1, type: 'Credit', amount: 500, reason: 'Signup Bonus', date: '2026-03-25' }
    ]
};
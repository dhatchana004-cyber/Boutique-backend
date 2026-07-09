const prisma = require('../src/config/db.js')

const products = [
  {
    name: 'Ivory Zari Silk Saree',
    brand: 'Aurelia & Co.',
    category: 'Sarees',
    price: 42500,
    description: 'A luxurious hand-woven silk saree featuring intricate Zari work. Perfect for weddings and grand occasions.',
    image: '/assets/images/ivory_saree_model.png',
    images: [
      '/assets/images/ivory_saree_model.png',
      'https://images.unsplash.com/photo-1583391733958-d15024443ef5?w=800&q=80',
    ],
    specs: ['100% Pure Silk', 'Handwoven Zari', '6.5 Meters with Blouse Piece', 'Dry Clean Only'],
    isNew: true,
  },
  {
    name: 'Rani Velvet Jewel Box',
    brand: 'Vedhika Brand',
    category: 'Jewellery',
    price: 8900,
    description: 'A beautiful handcrafted velvet jewel box to store your most precious ornaments.',
    image: '/assets/images/velvet_jewel_box.png',
    images: [
      '/assets/images/velvet_jewel_box.png',
      'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=800&q=80',
    ],
    specs: ['Premium Velvet', 'Brass Hardware', 'Multiple Compartments', 'Handcrafted'],
    isNew: false,
  },
  {
    name: 'Meenakari Bowl Duo',
    brand: 'Vedhika Brand',
    category: 'Home Accessories',
    price: 3450,
    description: 'Exquisite handcrafted Meenakari bowls perfect for serving or as a luxury return gift.',
    image: 'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=800&q=80',
      'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&q=80',
    ],
    specs: ['Brass Base', 'Meenakari Enamel', 'Set of 2', 'Hand Wash Only'],
    isNew: true,
  },
  {
    name: 'Festive Lehenga Edit',
    brand: 'Aurelia & Co.',
    category: 'Lehengas',
    price: 68000,
    description: 'A stunning bespoke lehenga with heavy embroidery, designed for the modern bride.',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80',
      'https://images.unsplash.com/photo-1583391733958-d15024443ef5?w=800&q=80',
    ],
    specs: ['Raw Silk', 'Zardosi Embroidery', 'Custom Fit Available', 'Dry Clean Only'],
    isNew: true,
  },
  {
    name: 'Kundan Choker Set',
    brand: 'Aurelia & Co.',
    category: 'Jewellery',
    price: 25000,
    description: 'A regal Kundan choker set adorned with semi-precious stones and pearls.',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80',
    ],
    specs: ['22k Gold Plated', 'Kundan Stones', 'Adjustable Dori', 'Handcrafted'],
    isNew: false,
  },
  {
    name: 'Artisan Gift Hamper',
    brand: 'Vedhika Brand',
    category: 'Return Gifts',
    price: 5500,
    description: 'A curated hamper featuring gourmet treats, candles, and bespoke souvenirs.',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&q=80',
    ],
    specs: ['Custom Packaging', 'Assorted Goodies', 'Bulk Orders Available'],
    isNew: true,
  },
  {
    name: 'Embroidered Silk Clutch',
    brand: 'Aurelia & Co.',
    category: 'Accessories',
    price: 4200,
    description: 'A beautifully embroidered silk clutch to complement your festive attire.',
    image: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=800&q=80',
    ],
    specs: ['Pure Silk', 'Zari Embroidery', 'Gold Chain Included'],
    isNew: false,
  },
  {
    name: 'Bespoke Perfume Set',
    brand: 'Vedhika Brand',
    category: 'Return Gifts',
    price: 3200,
    description: 'A luxurious set of artisan perfumes with floral and woody notes.',
    image: 'https://images.unsplash.com/photo-1592914610354-fd354ea45e48?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1592914610354-fd354ea45e48?w=800&q=80',
    ],
    specs: ['3x 30ml Bottles', 'Long-lasting', 'Gift Packaged'],
    isNew: true,
  },
  {
    name: 'Silver-Plated Thali Set',
    brand: 'Vedhika Brand',
    category: 'Return Gifts',
    price: 12500,
    description: 'A heavy, luxurious silver-plated serving set for festive milestones.',
    image: 'https://images.unsplash.com/photo-1607344645866-009c320b63e0?q=80&w=800',
    images: ['https://images.unsplash.com/photo-1607344645866-009c320b63e0?q=80&w=800'],
    specs: ['Silver-Plated', 'Includes Thali, Bowls, Glass', 'Handcrafted', 'Festive Gift Box'],
    isNew: false,
  },
  {
    name: 'Artisan Scented Candles',
    brand: 'Vedhika Brand',
    category: 'Return Gifts',
    price: 2100,
    description: 'Hand-poured soy candles infused with rare essential oils in a brass container.',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=800',
    images: ['https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=800'],
    specs: ['100% Soy Wax', 'Brass Container', '50 Hours Burn Time', 'Lavender & Oud Scent'],
    isNew: false,
  },
  {
    name: 'Handwoven Silk Stoles',
    brand: 'Aurelia & Co.',
    category: 'Return Gifts',
    price: 6200,
    description: 'Luxurious Banarasi silk stoles, an elegant token of appreciation for honored guests.',
    image: 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?q=80&w=800',
    images: ['https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?q=80&w=800'],
    specs: ['Pure Banarasi Silk', 'Handwoven', 'Zari Border', 'Dry Clean Only'],
    isNew: false,
  },
  {
    name: 'Floral Artisan Soap Set',
    brand: 'Vedhika Brand',
    category: 'Return Gifts',
    price: 1250,
    description: 'Handcrafted flower-shaped aroma soaps packaged in an elegant window gift box with ribbon.',
    image: '/assets/images/gift_1.jpg',
    images: ['/assets/images/gift_1.jpg'],
    specs: ['Organic Ingredients', 'Essential Oils', 'Set of 4 Soaps', 'Gift Box Included'],
    isNew: false,
  },
  {
    name: 'Blossom Paper Gift Bags',
    brand: 'Vedhika Brand',
    category: 'Return Gifts',
    price: 850,
    description: 'Premium pastel pink gift bags decorated with silk ribbons and handcrafted vibrant floral accents.',
    image: '/assets/images/gift_2.jpg',
    images: ['/assets/images/gift_2.jpg'],
    specs: ['Handmade Paper', 'Silk Ribbon', 'Floral Embellishments', 'Set of 5 Bags'],
    isNew: false,
  },
  {
    name: 'Crimson Royal Luggage Set',
    brand: 'Vedhika Brand',
    category: 'Return Gifts',
    price: 18500,
    description: 'Exquisite white suitcases paired with traditional deep crimson wrapped chests, adorned with fresh orchids.',
    image: '/assets/images/gift_3.jpg',
    images: ['/assets/images/gift_3.jpg'],
    specs: ['Premium Suitcase', 'Crimson Gift Chest', 'Orchid Decorations', 'Complete Gifting Setup'],
    isNew: false,
  },
  {
    name: 'Satin Rose Luggage Gift Set',
    brand: 'Vedhika Brand',
    category: 'Return Gifts',
    price: 15900,
    description: 'Luxury rose-gold suitcases paired with elegant white ribbon gift boxes, finished with gold floral accessories.',
    image: '/assets/images/gift_4.jpg',
    images: ['/assets/images/gift_4.jpg'],
    specs: ['Rose-Gold Suitcase', 'Premium Gift Box', 'Gold Floral Embellishments'],
    isNew: false,
  },
  {
    name: "MK Luxe Mother's Day Hamper",
    brand: 'Vedhika Brand',
    category: 'Return Gifts',
    price: 24500,
    description: "A premium celebration hamper containing a designer Michael Kors handbag, fine French perfume, and matching card.",
    image: '/assets/images/gift_5.jpg',
    images: ['/assets/images/gift_5.jpg'],
    specs: ['Michael Kors Handbag', 'French Perfume 50ml', 'Custom Card', 'Luxe Gift Box'],
    isNew: false,
  }
]

async function main() {
  console.log('🌱 Seeding boutique products...')

  // Insert or update products
  for (const product of products) {
    const existing = await prisma.product.findFirst({
      where: { name: product.name }
    })
    if (existing) {
      await prisma.product.update({
        where: { id: existing.id },
        data: product
      })
    } else {
      await prisma.product.create({ data: product })
    }
  }

  console.log(`✅ ${products.length} boutique products seeded/updated successfully!`)
}

main()
  .catch(e => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

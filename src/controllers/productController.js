const prisma = require('../config/db')

// Get all products
exports.getProducts = async (req, res) => {
  try {
    const { category, search, sort, limit } = req.query

    // Build the query object
    const query = {
      where: {}
    }

    if (category) {
      query.where.category = { contains: category, mode: 'insensitive' }
    }

    if (search) {
      const searchWords = search.split(' ').filter(w => w.trim().length > 0)
      if (searchWords.length > 0) {
        query.where.OR = [
          { AND: searchWords.map(word => ({ name: { contains: word, mode: 'insensitive' } })) },
          { AND: searchWords.map(word => ({ description: { contains: word, mode: 'insensitive' } })) },
          { AND: searchWords.map(word => ({ brand: { contains: word, mode: 'insensitive' } })) },
          { AND: searchWords.map(word => ({ category: { contains: word, mode: 'insensitive' } })) },
        ]
      }
    }

    if (sort) {
      if (sort === 'newest') {
        query.orderBy = { createdAt: 'desc' };
      } else {
        const [field, order] = sort.split('-') // e.g. price-asc -> ['price', 'asc']
        if (field && order) {
          query.orderBy = {
            [field]: order
          }
        }
      }
    }

    if (limit) {
      query.take = parseInt(limit, 10);
    }

    const products = await prisma.product.findMany(query)

    res.json({
      success: true,
      count: products.length,
      data: products
    })
  } catch (error) {
    console.error('Error fetching products:', error)
    res.status(500).json({ success: false, message: 'Server error fetching products' })
  }
}

// Get single product
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params
    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) }
    })

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' })
    }

    res.json({
      success: true,
      data: product
    })
  } catch (error) {
    console.error('Error fetching product:', error)
    res.status(500).json({ success: false, message: 'Server error fetching product' })
  }
}

const prisma = require('../config/db')

exports.getContent = async (req, res) => {
  try {
    const { pageName } = req.params
    const contentData = await prisma.siteContent.findUnique({
      where: { pageName }
    })
    
    if (!contentData) {
      return res.json({ success: true, data: null })
    }

    res.json({ success: true, data: contentData.content })
  } catch (error) {
    console.error('Error fetching content:', error)
    res.status(500).json({ success: false, message: 'Server error' })
  }
}

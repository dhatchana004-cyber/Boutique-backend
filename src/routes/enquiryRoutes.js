const express = require('express');
const router = express.Router();
const enquiryController = require('../controllers/enquiryController');
const { protect } = require('../middleware/authMiddleware');

const adminGuard = (req, res, next) => {
  if (req.user.role !== 'ADMIN') {
    return res.status(403).json({ success: false, message: 'Admin access required' });
  }
  next();
};

router.post('/', enquiryController.submitEnquiry);
router.get('/', protect, adminGuard, enquiryController.getEnquiries);
router.put('/:id', protect, adminGuard, enquiryController.updateEnquiryStatus);

module.exports = router;

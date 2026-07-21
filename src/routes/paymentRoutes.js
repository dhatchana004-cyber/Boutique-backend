const express    = require('express')
const router     = express.Router()
const { protect } = require('../middleware/authMiddleware')
const {
  createOrder,
  verifyPayment,
  getMyOrders,
  cancelOrder,
} = require('../controllers/paymentController')

// All routes require authentication
router.use(protect)

// POST /api/payment/create-order  → create Razorpay order + DB record
router.post('/create-order', createOrder)

// POST /api/payment/cod-order     → create COD order + DB record
const { createCODOrder } = require('../controllers/paymentController');
router.post('/cod-order', createCODOrder)

// POST /api/payment/verify        → verify signature, update DB, clear cart
router.post('/verify', verifyPayment)

// GET  /api/payment/orders        → get logged-in user's order history
router.get('/orders', getMyOrders)

// PATCH /api/payment/orders/:id/cancel
router.patch('/orders/:id/cancel', cancelOrder)

// PATCH /api/payment/orders/:id/return
const { returnOrder } = require('../controllers/paymentController')
router.patch('/orders/:id/return', returnOrder)

module.exports = router

const express = require('express')
const { addTransaction, getTranscationofUser, getDashboard , getAllTransactions, getAllUsers, getTranscationofUserByAdmin} = require('../controllers/transactionController')
const authMiddleware = require('../middlewares/authMiddleware')
const roleMiddleware = require('../middlewares/roleMiddleware')
const router = express.Router()


router.post('/create', authMiddleware, roleMiddleware('user'), addTransaction)
router.get('/user', authMiddleware, roleMiddleware('user'), getTranscationofUser)
router.get('/dashboard', authMiddleware, roleMiddleware('user'),getDashboard)
router.get('/all-users', authMiddleware, roleMiddleware('admin'), getAllUsers)
router.get('/all-transactions', authMiddleware, roleMiddleware('admin'), getAllTransactions)
router.get('/user/:id/transactions', authMiddleware, roleMiddleware('admin'), getTranscationofUserByAdmin)


module.exports = router
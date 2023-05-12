const express = require('express')
const router = express.Router()
const adminControl = require('../Controller/adminControl')
const {adminProtect}= require('../Middlewares/Auth')
const mult= require("../Middlewares/multer")
const {sendEstimate,approveEstimate,startJob,endJob,declineEstimate,cancelBooking}= require('../Controller/apiControl')
const { getThisVoucher, unlistVoucher, listVoucher, editVoucher } = require('../Controller/voucherControl')

router.post('/',adminControl.adminLogin)
router.get('/isAdminAuth',adminProtect,adminControl.isAdminAuth)
router.get('/getExperts',adminProtect,adminControl.getExperts)
router.get('/getUsers',adminProtect,adminControl.getUsers)
router.get('/getJobs',adminProtect,adminControl.getJobs)
router.post('/addjobs',adminProtect,mult.single("image"),adminControl.addJobs)
router.get('/blockUser/:id',adminProtect,adminControl.blockUser)
router.get('/unBlockUser/:id',adminProtect,adminControl.unBlockUser)
router.post('/editUser',adminProtect,mult.single('image'),adminControl.editUser)
router.get('/unListJob/:id',adminProtect,adminControl.unListJob)
router.get('/listJob/:id',adminProtect,adminControl.listJob)
router.post('/editJob',adminProtect,mult.single("image"),adminControl.editJob)
router.get('/verifyExpert/:id',adminProtect,adminControl.verifyExpert)
router.post('/rejectExpert/:id',adminProtect,adminControl.rejectExpert)
router.post('/editExpert',adminProtect,mult.single('image'),adminControl.editExpert)
router.get('/blockExpert/:id',adminProtect,adminControl.blockExpert)
router.get('/unBlockExpert/:id',adminProtect,adminControl.unBlockExpert)
router.get('/getSchedule/:id',adminProtect,adminControl.getSchedule)
router.post('/addSchedule',adminProtect,adminControl.addSchedule)
router.get('/bookingList',adminProtect,adminControl.bookings)
router.get('/getBooking/:id',adminProtect,adminControl.manageBooking)
router.post('/addEstimate',adminProtect,sendEstimate)
router.get('/approveEstimate/:id',adminProtect,approveEstimate)
router.get('/startJob/:id',adminProtect,startJob)
router.post('/endJob',adminProtect,endJob)
router.post('/adminPay',adminProtect,adminControl.managePayment)
router.post('/decline',adminProtect,declineEstimate)
router.post('/cancelBooking',adminProtect,cancelBooking)
router.get('/getCardCounts',adminProtect,adminControl.getCounts)
router.get('/getChartData',adminProtect,adminControl.getChartData)
router.get('/getVouchers',adminProtect,adminControl.getVouchers)
router.post('/addVoucher',adminProtect,mult.single('image'),adminControl.addVoucher)
router.get('/getVoucher/:id',adminProtect,getThisVoucher)
router.get('/unlistVoucher/:id',adminProtect,unlistVoucher)
router.get('/listVoucher/:id',adminProtect,listVoucher)
router.post('/editVoucher',adminProtect,mult.single('image'),editVoucher)
module.exports = router
const express=require('express')
const controller=require('../controllers/adminController')

const router=express.Router()

router.post('/adduser',controller.adduser)
router.get('/getuser',controller.getuser)
router.delete('/deluser/:id',controller.deluser)

module.exports=router
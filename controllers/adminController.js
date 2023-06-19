const { UUID } = require('sequelize')
const User = require('../models/users')

exports.adduser=async (req,res,next)=>{
    const name=req.body.name
    const email=req.body.email
    const data=await User.create({
        name:name,
        email:email
    })
    res.status(201).json({dataValues:data})
}

exports.getuser=async(req,res,next)=>{
    try{
        const users=await User.findAll()
        console.log(res.status(200).json({allusers:users}))
    }
    catch(err){
        console.log(err)
    }
    
}

exports.deluser=async(req,res,next)=>{
    try{
        if(req.params.id=='undefined'){
            console.log("id is missing")
        }
        const uid=req.params.id
        await User.destroy({where:{id: uid}})
        console.log('user removed')
    }
    catch(err){
        console.log(err)
    }
}
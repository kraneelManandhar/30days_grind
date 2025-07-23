const express = require('express');
const router = express.Router();
const User = require('../models/Schema');

router.get('/',async (req,res) => {
    try{
        const all = await User.find();
        res.send(all);
    }catch(error){
        res.status(500).json({message : error.message})
    }
})

router.get('/:id',getUserById,(req,res)=>{
    res.send(res.user)
})


router.post('/',async (req,res)=>{
     const user = new User({
        name: req.body.name,
        task : req.body.task
    })
    try{
   const newUser = await user.save()
   res.status(201).json(newUser);
}catch(error){
    res.send(400).json({message : error.message});
}
})


router.patch('/:id',getUserById,(req,res)=> {
    res.send(res.user)
})


router.delete('/:id',getUserById,async (req,res) => {
    try{
        await res.user.deleteOne();
        res.send(`User deleted.`)
    }catch(error){
res.status(500).json({message:error.message})
    }
})


async function getUserById(req,res,next){
    let user;
    try{
        user = await User.findById(req.params.id);

        if (user == null){
            return res.status(404).json({message:"Cannot find user"})
        }
    }catch(err){
        return res.status(500).json({message : err.message})
    }
    res.user = user
    next()
}


module.exports = router;
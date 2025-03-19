const express = require('express');
//import model
const User = require('../models/userModel');

//View user detail::
const getUsers = async(req,res) =>{   // get user req function 
    try{
        const users =  await User.find(); //find the user
        res.status(200).json({success:true,users}); //message after get succssfully
    }catch(err){
        res.status(500).json({success:false,message:"Internal server Error",error:err.message}) //error message 
    }
};

//create user
const addUser = async(req,res)=>{
    try{
        const {name,roll,age,contact,address} = req.body;  // req boddy define
        
        const newUser = new User({name,roll,age,contact, address})  
        await newUser.save(); // save body into new User
        res.status(201).json({success:true, message: "User Created", User:newUser}); //suceesfully created message
    }catch(err){
        res.status(500).json({success:false,message:"Internal server error"}); //error message if not created user
    }
};

//update user:
const updateUser = async(req,res) =>{
    try{
    const{id} = req.params;
    const{name,roll,age,contact,address} = req.body
    //find user by id
    const user = await User.findById(id);
    if(!user){
        return res.status(404).json({
            success:false,
            message:"user not found",
            
        });
    }
    //update fields only if they exits in req.body:
    
    if (name)user.name =name;
    if(roll) user.roll = roll;
    if(age)user.age = age;
    if(contact)user.contact = contact;
    if(address)user.address = address;

    //save the updated user:
await user.save()
res.status(200).json({
    success:true,
    message:"user updated successfully",
    user,
});
}catch(err){
    console.error(err);
    res.status(500).json({
        success:false,
        message:"Internal server errror",
    });
}
};

//delete::
const deleteUser = async(req,res)=>{
    try{
        const{id} = req.params;
        const user = await User.findByIdAndDelete(id)
        if(!user){
            return res.status(400).json({
                success:false,
                message:'User not found'
            })
        };
        res.status(200).json({
            success:true,
            message:"User Deleted successfully"
        });
    }catch(err){
        res.status(500).json({success:false,
            message:"Internal server Errror"
        });
    }
}

// export the functions 
module.exports ={getUsers,deleteUser,updateUser,addUser}
import { User } from "../models/user.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

export const register=async(req,res)=>{
try { 
    const {fullname,email,phoneNumber,password,role}=req.body
    if(!fullname||!email||!phoneNumber||!password||!role){
        return  res.status(400).json({
            message:"something is missing fhfghgf",
            success:false
        })
    }
    const user=await User.findOne({email});
    if(user){
        return res.status(400).json({
            message:"user already register",
            success:false
        })
    }
    const hassPassword=await bcrypt.hash(password,10)
    await User.create({
        fullname,
        email,
        phoneNumber,
        password:hassPassword,
        role
    })

    res.status(201).json({
        message:"account created successfully",
        success:true
    })
} catch (error) {
    console.log(error)
}
}











export const login=async(req,res)=>{
try {
    const {email,password,role}=req.body;
if(!email||!password||!role){
return res.status(400).json({
    message:"something is missing",
    success:false
})
}
let user=await User.findOne({email})
if(!user){
    return res.status(400).json({
        message:"Increct email and password",
        success:false
    })
}
const isPasswordMatch=await bcrypt.compare(password,user.password)
if(!isPasswordMatch){
    return res.status(400).json({
         message:"Increct email and password",
        success:false
    })
}

if(role!==user.role){
    return res.status(400).json({
        message:"account not exist with this ",
        success:false
    })
}
const tokenData={
    userId:user._id
}
const token=await jwt.sign(tokenData,process.env.SECRET_KEY,{expiresIn:"1d"})

user={
    _id:user._id,
    fullname:user.fullname,
    email:user.email,
    phoneNumber:user.phoneNumber,
    role:user.role,
    profile:user.profile
}

return  res.status(200).cookie("token",{maxAge:1*24*60*60*1000,httpsonly:true,sameSite:"strict"}).json({
message:`welcome back to ${user.fullname}`,
user,
success:true
})
} catch (error) {
    console.log(error)
}
}






export const logout=async(req,res)=>{
try {
    return res.status(200).cookie("token","",{maxAge:0}).json({
        message:"logout success",
        success:true
    })
} catch (error) {
    console.log(error)
}

}





export const updateprofile=async(req,res)=>{
    try {
        const  {fullname,email,phoneNumber,bio,skills}=req.body;
        const file=req.file
     

        // cloudinary  ayga 
        const skillsArry=skills.split(",");
        const userId=req.id;
        let user=await User.findById(userId)
        if(!user){
            return res.status(400).json({
                message:"user not fount"
            })
        }

 // update data 
user.fullname=fullname,
user.email=email,
user.phoneNumber=phoneNumber,
user.profile.bio=bio,
user.profile.skills=skillsArry

await user.save();
user={
    _id:user._id,
    fullname:user.fullname,
    email:user.email,
    phoneNumner:user.phoneNumber,
    role:user.role,
    profile:user.profile


}


return res.status(200).json({
    message:"profile updated successfully",
    user,
    success:true
})
    } catch (error) {
        console.log(error)
    }
}
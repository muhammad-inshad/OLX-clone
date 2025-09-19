import User from '../models/userModel.js'

export const registerUser=async(req,res)=>{
    const {email,password,name}=req.body;
    const existing=await User.findOne({email})
    if(existing){
        return res.status(400).json({message:"User alredy exists"})
    }
    const newUser=new User({email,password,name})
    await newUser.save();
    res.json({message:'User registered Successfully',name:name,userId:newUser._id})
}

export const loginUser=async (req,res)=>{
    const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user==null) return res.status(400).json({ message: "User not found" });

  if (user.password != password) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  res.json({ message: "Login successful", name:user.name});
}
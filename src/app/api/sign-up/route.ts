import { connect } from "@/utils/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/utils/sendVerficationEmail";

export async function POST(request: Request) {
  await connect();
  try {
    const { username, email, password } = await request.json();
    const existingUserVerifiedByUsername=await User.findOne({
        username:username,
        isVerified:true
     });

     if(existingUserVerifiedByUsername){
      return Response.json(
        {
          success: false,
          message: "Username is already taken",
        },
        {
          status: 400,
        }
      )
     }

     const existingUserByEmail=await User.findOne({
      email:email,
      
     });
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
     if(existingUserByEmail){
      if(existingUserByEmail.isVerified){
      return Response.json(
        {
          success: false,
          message: "User already exists with this email",
        },
        {
          status: 400,
        }
      )
      }else{
        const hashedPassword = await bcrypt.hash(password, 10);
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 1);

       existingUserByEmail.password=hashedPassword;
       existingUserByEmail.verifyCode=verifyCode;
       existingUserByEmail.verifyCodeExpiry=expiryDate;
       await existingUserByEmail.save();
        
      }
     }else{
       const hashedPassword = await bcrypt.hash(password, 10);
       const expiryDate = new Date();
       expiryDate.setDate(expiryDate.getDate() + 1);

       const newUser=new User({
        username,
        email,
        password: hashedPassword,
        verifyCode,
        isVerified:false,
        verifyCodeExpiry: expiryDate,
        isAcceptionMessage:true,
        message:[]
       })

       await newUser.save();
     }
       const emailResponse = await sendVerificationEmail(email, username, verifyCode);

       if(!emailResponse){
        return Response.json(
          {
            success: false,
            message: "Failed to send verification email",
          },{status:500})
        }
       return Response.json(
         {
           success: true,
           message: "User registered successfully. Please check your email for verification.",
         },
         {
           status: 200,
         }
       )
  } catch (error: any) {
    console.log("Error registering the user", error.message);
    return Response.json(
      {
        success: false,
        message: "Failed to register the user",
      },
      {
        status: 500,
      }
    );
  }
}

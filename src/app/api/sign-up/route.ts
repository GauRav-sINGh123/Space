import { connect } from "@/utils/db";
import User from "@/models/user";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/utils/sendVerficationEmail";

export async function POST(request: Request) {
  await connect();
  try {
    const { username, email, password } = await request.json();

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

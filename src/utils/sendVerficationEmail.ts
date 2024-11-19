import { resend } from "./resend";
import VerificationEmail from "@/components/emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";


export async function sendVerificationEmail(
    email: string,
    username: string,
    verifyCode: string
): Promise<ApiResponse> {
     try {
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: "Verify your email",
            react: VerificationEmail({ username, otp: verifyCode }),
        })
        return {
            success: true,
            message: "Verification email sent successfully",
        }
     } catch (error:any) {
        console.log("Error sending verification email",error.message)
        return {
            success: false,
            message: "Failed to send verification email",
        }
     }
}
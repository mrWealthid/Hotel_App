import { connect } from "@/dbConfig/dbConfig";
import User from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { Emails } from "@/utils/email-resend";

connect();

const signToken = (id: any) =>
  jwt.sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

export async function POST(request: NextRequest) {
  const { email, newPassword, currentPassword, confirmNewPassword } =
    await request.json();
  try {
    const user = await User.findOne({ email }).select("+password");

    //2 Check if the user exists and the password is correct
    if (
      !user ||
      !(await user.correctPassword(currentPassword, user.password))
    ) {
      return NextResponse.json(
        { error: "Your current password is wrong" },
        { status: 400 }
      );
    }
    //3 If so, update password

    user.password = newPassword;
    user.passwordConfirm = newPassword;
    await user.save();

    const token = signToken(user._id);
    const response = NextResponse.json({
      status: "success",
      message: "Token sent to email",
    });

    const timeInMs = Number(process.env.JWT_COOKIE_EXPIRES_IN) * 60 * 1000; // 2 minutes in milliseconds
    const expires = new Date(Date.now() + timeInMs);
    response.cookies.set("token", token, {
      httpOnly: true,
      expires,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

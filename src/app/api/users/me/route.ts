import { connect } from "@/dbConfig/dbConfig";
import User from "@/model/userModel";
import { JwtPayload, verify } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(request: NextRequest) {
  try {
    //2) Check if user exists & password is correct after it's hashed

    // const cookie = cookies()?.get('token')?.value;
    let cookie = request.cookies.get("token")?.value || "";

    console.log("check-token", request.cookies.has("token"));

    console.log("my-cookie", cookie);

    const currentUser = getUserDetails(cookie!);

    const user = await User.findById((currentUser as JwtPayload).id);

    if (!user) NextResponse.json({ error: "User not found" }, { status: 404 });

    const response = NextResponse.json(
      {
        status: "success",
        data: user,
      },
      { status: 200 }
    );
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

function getUserDetails(token: string): JwtPayload | string {
  // 2. Verify and decode the JWT
  let decoded;
  try {
    decoded = verify(token, process.env.JWT_SECRET!);
  } catch (err: any) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
  return decoded;
}

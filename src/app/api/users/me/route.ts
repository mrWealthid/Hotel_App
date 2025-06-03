import { connect } from "@/dbConfig/dbConfig";
import User from "@/model/userModel";
import { verify, JwtPayload } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(request: NextRequest) {
  try {
    // Extract token from cookies
    const token = request.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { error: "Authentication token not found" },
        { status: 401 }
      );
    }

    // Decode JWT
    const decoded = verifyToken(token);
    if (!decoded || typeof decoded === "string" || !("id" in decoded)) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 401 }
      );
    }

    const userId = decoded.id;
    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        status: "success",
        data: user,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("GET /api/user error:", error.message);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

function verifyToken(token: string): JwtPayload | null {
  try {
    return verify(token, process.env.JWT_SECRET!) as JwtPayload;
  } catch (error) {
    console.error("JWT verification error:", (error as Error).message);
    return null;
  }
}

// Next Server
import { NextRequest, NextResponse } from "next/server";

// Services
import { getUserById, getUserId, getUserInfo } from "@/app/services/users";

export const GET = async (req: NextRequest) => {
  const authToken = req.headers.get("Authorization");

  if (!authToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = await getUserId(authToken.substring(7));

  if (!authToken.toLowerCase().includes("bearer") || !userId) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  const user = await getUserById(Number(userId.id));

  if (!user) {
    return new NextResponse(null, { status: 404 });
  }

  const data = await getUserInfo(user?.username);

  return NextResponse.json(data);
};

import { NextResponse, NextRequest } from "next/server";
import { addUser } from "@/app/services/users";

export async function POST(req: NextRequest) {
  // Protect the route from being used in production
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "This endpoint is not available in production" },
      { status: 403 },
    );
  }

  // Extract the user info from the request
  const body = await req.json();
  const { username, name, password } = body;

  // Add the user to the database
  const newUser = await addUser(username, name, password);

  // Remove any sensitive and unnecessary fields
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { passwordHash, token, ...otherFields } = newUser[0];

  // Return the new user data within the response
  return NextResponse.json(otherFields, { status: 201 });
}

import { NextResponse } from "next/server";
import { clearTables } from "@/app/services/testing";

export async function DELETE() {
  // Protect the route from being used in production
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "This endpoint is not available in production" },
      { status: 403 },
    );
  }

  await clearTables();
  return new NextResponse(null, { status: 204 });
};

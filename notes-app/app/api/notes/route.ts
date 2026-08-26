// Next Server
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getUserId } from "@/app/services/users";

// Services
import { getNotes, addNote } from "../../services/notes";

export const GET = async () => {
  const notes = await getNotes(false);
  return NextResponse.json(notes);
}

export const POST = async (req: NextRequest) => {
  const authToken = req.headers.get("Authorization");

  if (!authToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const userId = await getUserId(authToken.substring(7));

  if (!authToken.toLowerCase().includes("bearer") || !userId) {
    return NextResponse.json({ error: "Invalid auth token" }, { status: 401 });
  }

  const body = await req.json();
  const { content, important = false } = body;

  if (!content || content.length < 10) {
    return NextResponse.json(
      { error: "Content must be at least 10 characters long" },
      { status: 400 },
    );
  }

  await addNote(content, important, Number(userId.id));
  revalidatePath("/notes");
  return NextResponse.json({ success: true }, { status: 201 });
}

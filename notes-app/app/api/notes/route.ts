// Next Server
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

// Auth
import { auth } from "@/app/auth";

// Services
import { getNotes, addNote } from "../../services/notes";

export const GET = async () => {
  const notes = await getNotes(false);
  return NextResponse.json(notes);
}

export const POST = async (req: NextRequest) => {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { content, important = false } = body;

  if (!content || content.length < 10) {
    return NextResponse.json(
      { error: "Content must be at least 10 characters long" },
      { status: 400 },
    );
  }

  await addNote(content, important);
  revalidatePath("/notes");
  return NextResponse.json({ success: true }, { status: 201 });
}

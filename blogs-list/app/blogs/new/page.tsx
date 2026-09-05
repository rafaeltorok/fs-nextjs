import { redirect } from "next/navigation";
import { auth } from "@/app/auth";
import NewBlogForm from "./NewBlogForm";

export default async function NewBlogPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <NewBlogForm />
  );
}

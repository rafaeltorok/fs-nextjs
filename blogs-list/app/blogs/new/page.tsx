import { createBlog } from "@/app/actions/blogs";
import { auth } from "@/app/auth";
import { redirect } from "next/navigation";
import "../../formRow.css";

// CSS styles
import "../../newBlogForm.css";

// Renders each input row on the form
function renderRow(
  label: string,
  type: string,
  name: string,
  required: boolean,
) {
  return (
    <div className="form-row">
      <label>{label}</label>
      {required ? (
        <input type={type} name={name} required />
      ) : (
        <input type={type} name={name} />
      )}
    </div>
  );
}

// Server component
export default async function NewBlog() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <div>
      <h2>Add new blog</h2>
      <form action={createBlog}>
        {renderRow("Title", "text", "title", true)}
        {renderRow("Author", "text", "author", true)}
        {renderRow("URL", "text", "url", true)}
        {renderRow("Year", "number", "year", true)}

        <button type="submit">Add</button>
      </form>
    </div>
  );
}

import { createBlog } from "@/app/actions/blogs";

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
    <div className="new-blog-form-row">
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
  return (
    <div>
      <h2>Add new blog</h2>
      <form action={createBlog} className="new-blog-form">
        {renderRow("Title", "text", "title", true)}
        {renderRow("Author", "text", "author", true)}
        {renderRow("URL", "text", "url", true)}
        {renderRow("Year", "number", "year", true)}

        <button type="submit">Add</button>
      </form>
    </div>
  );
}

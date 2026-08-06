import { createBlog } from "@/app/actions/blogs";

export default function NewBlog() {
  // Renders each input row on the form
  function renderRow(
    label: string,
    type: string,
    name: string,
    required: boolean
  ) {
    return (
      <div>
        <label>
          {label}
          {required ? (
            <input
              type={type}
              name={name}
              required
            />
          ) : (
            <input
              type={type}
              name={name}
            />
          )}
        </label>
      </div>
    );
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

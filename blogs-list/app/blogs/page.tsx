import { getBlogs } from "../services/blogs";

export default function Blogs() {
  const blogs = getBlogs();

  // Helper function to render each table row
  function renderRow(header: string, data: string) {
    return (
      <tr>
        <th>{header}</th>
        <td>{data}</td>
      </tr>
    );
  }

  return (
    <div>
      <h2>Blogs</h2>
      <ul>
        {blogs.map((b) => (
          <table key={b.id}>
            <thead>
              <tr>
                <th colSpan={2}>{b.title}</th>
              </tr>
            </thead>
            <tbody>
              {renderRow("Author", b.author)}
              {renderRow("URL", b.url)}
              {renderRow("Likes", String(b.likes))}
              {renderRow("Year", String(b.year))}
            </tbody>
          </table>
        ))}
      </ul>
    </div>
  );
}

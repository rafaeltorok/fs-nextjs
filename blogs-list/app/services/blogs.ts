const blogs = [
  {
    id: 1,
    title: "My first blog",
    author: "Myself",
    url: "https://example.com",
    likes: 0,
    year: 2026,
  },
  {
    id: 2,
    title: "The Gamer's cave",
    author: "Gamer Guy",
    url: "https://gamers-cave.com",
    likes: 100,
    year: 2009,
  },
]

function generateId() {
  return Math.max(...blogs.map((b) => b.id)) + 1
}

export function getBlogs() {
  return blogs
}

export function addBlog(
  title: string,
  author: string,
  url: string,
  year: string,
) {
  blogs.push({
    id: generateId(),
    title,
    author,
    url,
    year: Number(year),
    likes: 0,
  })
}

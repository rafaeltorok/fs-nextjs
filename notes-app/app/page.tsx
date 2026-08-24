export default function Home() {
  console.log("hello next.js");

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Notes App</h2>
        An example app for{" "}
        <a
          href="https://courses.mooc.fi/org/uh-cs/courses/full-stack-open-nextjs"
          className="text-blue-600 hover:underline"
        >
          Full Stack Open Next.js
        </a>
      </div>
      <div>
        See{" "}
        <a
          href="https://github.com/fullstack-hy2020/nextjs-notes"
          className="text-blue-600 hover:underline"
        >
          https://github.com/fullstack-hy2020/nextjs-notes
        </a>{" "}
        for the source code
      </div>
    </div>
  );
}

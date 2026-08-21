"use client";

import { createBlog } from "@/app/actions/blogs";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

// CSS styles
import "../../formRow.css";
import { useActionState, useEffect } from "react";

// Renders each input row on the form
function renderRow(
  label: string,
  type: string,
  name: string,
  required: boolean,
  defaultValue: string,
) {
  return (
    <div className="form-row">
      <label>{label}</label>
      {required ? (
        <input type={type} name={name} defaultValue={defaultValue} required />
      ) : (
        <input type={type} name={name} defaultValue={defaultValue} />
      )}
    </div>
  );
}

// Server component
export default function NewBlog() {
  const router = useRouter();
  const { data: session } = useSession();
  const initialState = {
    errors: { title: "", author: "", url: "", year: "" },
    values: { title: "", author: "", url: "", year: "" },
  };
  const [state, formAction] = useActionState(createBlog, initialState);

  useEffect(() => {
    if (!session) {
      router.push("/login");
    }
  }, [session, router]);

  return (
    <div>
      <h2>Add new blog</h2>
      <form action={formAction}>
        {renderRow("Title", "text", "title", true, state.values?.title)}
        {state.errors?.title && <span className="notification">{state.errors.title}</span>}
        
        {renderRow("Author", "text", "author", true, state.values?.author)}
        {state.errors?.author && <span className="notification">{state.errors.author}</span>}
        
        {renderRow("URL", "text", "url", true, state.values?.url)}
        {state.errors?.url && <span className="notification">{state.errors.url}</span>}
        
        {renderRow("Year", "number", "year", true, state.values?.year)}
        {state.errors?.year && <span className="notification">{state.errors.year}</span>}

        <br />
        <br />

        <button type="submit">Add</button>
      </form>
    </div>
  );
}

"use client";

import { createBlog } from "@/app/actions/blogs";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { useNotification } from "@/app/context/NotificationContext";

// CSS styles
import "../../formRow.css";

// Renders each input row on the form
function renderRow(
  label: string,
  type: string,
  name: string,
  required: boolean,
  defaultValue: string | undefined,
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
    notifications: {
      errors: { title: "", author: "", url: "", year: "" },
      success: false,
    },
    values: { title: "", author: "", url: "", year: "" },
  };
  const [state, formAction] = useActionState(createBlog, initialState);
  const { showNotification } = useNotification();

  useEffect(() => {
    if (state.notifications.success) {
      showNotification("New blog has been added!");
      router.push("/blogs");
    }
  }, [state, showNotification, router]);

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
        {state.notifications?.errors?.title && <span className="notification">{state.notifications.errors.title}</span>}
        
        {renderRow("Author", "text", "author", true, state.values?.author)}
        {state.notifications?.errors?.author && <span className="notification">{state.notifications.errors.author}</span>}
        
        {renderRow("URL", "text", "url", true, state.values?.url)}
        {state.notifications?.errors?.url && <span className="notification">{state.notifications.errors.url}</span>}
        
        {renderRow("Year", "number", "year", true, state.values?.year)}
        {state.notifications?.errors?.year && <span className="notification">{state.notifications.errors.year}</span>}

        <br />
        <br />

        <button type="submit">Add</button>
      </form>
    </div>
  );
}

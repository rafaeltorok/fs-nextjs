"use client";

import { useSession, signOut } from "next-auth/react";
import NavLink from "./NavLink";

export default function NavBar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-gray-800 text-white px-6 py-3 flex items-center gap-4 overflow-auto">
      <NavLink href="/">home</NavLink>
      <NavLink href="/blogs">blogs</NavLink>
      <NavLink href="/users">users</NavLink>

      <div className="ml-auto flex items-center gap-4">
        {session ? (
          <>
            <NavLink href="/me">me</NavLink>
            <NavLink href="/blogs/new">add new</NavLink>
            <em className="text-gray-300">
              {session.user?.name} logged in
            </em>{" "}
            <button
              onClick={() => signOut()}
              className="bg-gray-900 hover:bg-gray-600 px-3 py-1 rounded text-sm"
            >
              logout
            </button>
          </>
        ) : (
          <>
            <NavLink href="/login">login</NavLink>
            {" | "}
            <NavLink href="/register">register</NavLink>
          </>
        )}
      </div>
    </nav>
  );
}

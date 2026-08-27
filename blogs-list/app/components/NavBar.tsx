"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import NavLink from "./NavLink";

export default function NavBar() {
  const { data: session } = useSession();
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);

  return (
    <>
      <nav className="bg-gray-800 text-white px-6 py-3 flex items-center gap-4 overflow-auto">
        <section className="MOBILE-MENU flex lg:hidden w-full">
          <div
            className="HAMBURGER-ICON space-y-2"
            onClick={() => setIsNavOpen((prev) => !prev)}
          >
            <span className="block h-0.5 w-8 bg-gray-500"></span>
            <span className="block h-0.5 w-8 bg-gray-500"></span>
            <span className="block h-0.5 w-8 bg-gray-500"></span>
          </div>

          <div className={isNavOpen ? "showMenuNav" : "hideMenuNav"}>
            <div
              className="CROSS-ICON absolute top-0 right-0 px-8 py-8"
              onClick={() => setIsNavOpen(false)} // change isNavOpen state to false to close the menu
            >
              <svg
                className="h-8 w-8 text-gray-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </div>
            
            <div
              className="MENU-LINK-MOBILE-OPEN flex flex-col items-center justify-between min-h-[250px]"
              onClick={() => setIsNavOpen(false)}
            >
              <NavLink href="/">Home</NavLink>
              <NavLink href="/blogs">Blogs</NavLink>
              <NavLink href="/users">Users</NavLink>

              {session ? (
                <>
                  <NavLink href="/me">Me</NavLink>
                  <NavLink href="/blogs/new">Add new</NavLink>

                  <button
                    onClick={() => signOut()}
                    className="bg-gray-900 hover:bg-gray-600 px-8 py-1 rounded text-l"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <NavLink href="/login">Login</NavLink>
                  <NavLink href="/register">Register</NavLink>
                </>
              )}
            </div>
          </div>

          {session &&
            <>
              <em className="text-gray-300 ml-auto">
                {session.user?.name} logged in
              </em>
            </>
          }
        </section>

        <div className="DESKTOP-MENU hidden lg:flex items-center w-full">
          <div className="space-x-8">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/blogs">Blogs</NavLink>
            <NavLink href="/users">Users</NavLink>
          </div>

          <div className="ml-auto space-x-5">
            {session ? (
              <>
                <NavLink href="/me">Me</NavLink>
                <NavLink href="/blogs/new">Add new</NavLink>
                <em className="text-gray-300">
                  {session.user?.name} logged in
                </em>{" "}
                <button
                  onClick={() => signOut()}
                  className="bg-gray-900 hover:bg-gray-600 px-3 py-1 rounded text-sm font-bold"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink href="/login">Login</NavLink>
                <NavLink href="/register">Register</NavLink>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

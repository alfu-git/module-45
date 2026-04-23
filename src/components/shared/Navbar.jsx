"use client";
import React from "react";
import { Link } from "@heroui/react";
import { signOut, useSession } from "@/lib/auth-client";

const Navbar = () => {
  const { data, isPending } = useSession();

  if (isPending) {
    return <p>Loading Session Data,,,,</p>;
  }

  const user = data?.user;

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-separator  backdrop-blur-lg">
      <header className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <p className="font-bold">Better-Auth</p>
        </div>

        <ul className="flex items-center gap-4">
          <li>
            <Link href="/">Home</Link>
          </li>

          <li>
            <Link href="/dashboard">Dashboard</Link>
          </li>

          <li>
            <Link href="/about">About</Link>
          </li>
        </ul>

        <div>
          {user ? (
            <>
              <p>Welcome {user.name}</p>
              <Link onClick={() => signOut()}>Sign Out</Link>
            </>
          ) : (
            <>
              <Link href="/auth/sign-in">Sign In</Link>
            </>
          )}
        </div>
      </header>
    </nav>
  );
};

export default Navbar;

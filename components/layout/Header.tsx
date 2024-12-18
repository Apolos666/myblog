"use client";

import { ThemeToggle } from "@/components/ThemeToggle";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { BookDown, BookmarkIcon, FileText } from "lucide-react";
import Link from "next/link";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b shadow-sm h-16 flex items-center">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href={"/"}>
          <h1 className="text-2xl font-bold text-foreground">
            My Tech Blog
          </h1>
        </Link>
        <div className="flex justify-between space-x-4">
          <ThemeToggle />
          <SignedIn>
            <UserButton>
              <UserButton.MenuItems>
                <UserButton.Link
                  label="Tạo bài viết"
                  labelIcon={<BookDown size={16} />}
                  href="/author/new-post"
                />
                <UserButton.Link
                  label="Collections của tôi"
                  labelIcon={<BookmarkIcon size={16} />}
                  href="/user/collections"
                />
                <UserButton.Link
                  label="Bài viết của tôi"
                  labelIcon={<FileText size={16} />}
                  href="/author/my-posts"
                />
              </UserButton.MenuItems>
            </UserButton>
          </SignedIn>
          <SignedOut>
            <SignInButton>
              <button className="bg-primary text-primary-foreground font-semibold py-2 px-4 rounded hover:bg-primary/90 transition duration-200">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </header>
  );
}

import { ThemeToggle } from "@/components/ThemeToggle";

export function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Tech Blog</h1>
        <ThemeToggle />
      </div>
    </header>
  );
}

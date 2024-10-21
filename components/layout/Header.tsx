import { ThemeToggle } from "@/components/ThemeToggle";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b shadow-sm h-16 flex items-center">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Tech Blog</h1>
        <ThemeToggle />
      </div>
    </header>
  );
}

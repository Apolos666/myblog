import { redirect } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getUserCollectionsWithPosts } from "./actions";
import { CollectionsList } from "./(components)/CollectionsList";
import { auth } from "@clerk/nextjs/server";

export default async function CollectionsPage() {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const collections = await getUserCollectionsWithPosts(userId);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8 mt-16">
        <h1 className="text-3xl font-bold mb-8">Bộ sưu tập của tôi</h1>
        <CollectionsList collections={collections} />
      </main>
      <Footer />
    </div>
  );
}

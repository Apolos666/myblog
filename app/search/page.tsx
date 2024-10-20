"use client";

import { useState } from "react";
import { SearchBar } from "@/components/search/SearchBar";
import { SearchResults } from "@/components/search/SearchResults";
import { TagFilter } from "@/components/search/TagFilter";

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Search Blog Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-3 space-y-4">
          <SearchBar onSearch={handleSearch} />
          <SearchResults searchTerm={searchTerm} selectedTags={selectedTags} />
        </div>
        <div>
          <TagFilter onTagsChange={setSelectedTags} />
        </div>
      </div>
    </main>
  );
}

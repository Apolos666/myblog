"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

interface SavedPost {
  _id: string;
  title: string;
  excerpt: string;
  coverImageUrl: string;
  createdAt: Date;
}

interface CollectionWithPosts {
  id: string;
  name: string;
  description?: string;
  posts: SavedPost[];
}

interface CollectionsListProps {
  collections: CollectionWithPosts[];
}

export function CollectionsList({ collections }: CollectionsListProps) {
  const [expandedCollections, setExpandedCollections] = useState<Set<string>>(
    new Set()
  );

  const toggleCollection = (collectionId: string) => {
    const newExpanded = new Set(expandedCollections);
    if (newExpanded.has(collectionId)) {
      newExpanded.delete(collectionId);
    } else {
      newExpanded.add(collectionId);
    }
    setExpandedCollections(newExpanded);
  };

  return (
    <div className="space-y-6">
      {collections.map((collection) => (
        <Card key={collection.id}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-2xl font-bold">
              {collection.name}
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toggleCollection(collection.id)}
            >
              {expandedCollections.has(collection.id) ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          </CardHeader>
          <CardContent>
            {collection.description && (
              <p className="text-muted-foreground mb-4">
                {collection.description}
              </p>
            )}
            {expandedCollections.has(collection.id) && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {collection.posts.map((post) => (
                  <Link
                    key={post._id}
                    href={`/blog/${post._id}`}
                    className="group"
                  >
                    <div className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                      <div className="relative h-48 w-full">
                        <Image
                          src={post.coverImageUrl}
                          alt={post.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold group-hover:text-primary transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                          {post.excerpt}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

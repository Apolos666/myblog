"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tag } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import { Checkbox } from "../ui/checkbox";

interface TagFilterProps {
  onTagsChange: (selectedTags: string[]) => void;
}

const allTags = [
  "Web Development",
  "Mobile Development",
  "Data Science",
  "Machine Learning",
  "DevOps",
  "Cybersecurity",
  "Blockchain",
  "Cloud Computing",
  "Internet of Things",
  "Artificial Intelligence",
];

export function TagFilter({ onTagsChange }: TagFilterProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) => {
      const newTags = prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag];
      onTagsChange(newTags);
      return newTags;
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Tag className="mr-2" />
          Filter by Tags
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          {allTags.map((tag) => (
            <div key={tag} className="flex items-center space-x-2 mb-2">
              <Checkbox
                id={tag}
                checked={selectedTags.includes(tag)}
                onCheckedChange={() => handleTagToggle(tag)}
              />
              <label
                htmlFor={tag}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {tag}
              </label>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

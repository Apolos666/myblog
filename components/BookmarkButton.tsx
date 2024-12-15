"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Bookmark, Plus, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  addBookmark,
  createCollection,
  getUserCollections,
  getBookmarkDetails,
  removeBookmarkFromCollection,
} from "@/app/blog/[slug]/actions";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface BookmarkButtonProps {
  postId: string;
  className?: string;
}

interface BookmarkDetail {
  bookmarkId: string;
  collectionId: string;
  collectionName: string;
}

export function BookmarkButton({ postId, className }: BookmarkButtonProps) {
  const { user } = useUser();
  const { toast } = useToast();
  const [collections, setCollections] = useState<
    { id: string; name: string }[]
  >([]);
  const [newCollectionName, setNewCollectionName] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [bookmarkDetails, setBookmarkDetails] = useState<BookmarkDetail[]>([]);

  useEffect(() => {
    async function fetchData() {
      if (user) {
        try {
          const [userCollections, details] = await Promise.all([
            getUserCollections(user.id),
            getBookmarkDetails(user.id, postId),
          ]);
          console.log("Fetched collections:", userCollections);
          console.log("Fetched bookmark details:", details);
          setCollections(userCollections);
          setBookmarkDetails(details);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    }
    fetchData();
  }, [user, postId]);

  const handleBookmark = async (collectionId: string) => {
    if (user) {
      try {
        await addBookmark(user.id, postId, collectionId);
        const details = await getBookmarkDetails(user.id, postId);
        setBookmarkDetails(details);
        toast({
          title: "Đã lưu",
          description: "Bài viết đã được thêm vào bộ sưu tập",
        });
      } catch (error) {
        console.error("Error adding bookmark:", error);
        toast({
          title: "Lỗi",
          description: "Không thể lưu bài viết. Vui lòng thử lại",
          variant: "destructive",
        });
      }
    }
  };

  const handleRemoveBookmark = async (bookmarkId: string) => {
    if (user) {
      try {
        await removeBookmarkFromCollection(bookmarkId);
        setBookmarkDetails((prev) =>
          prev.filter((detail) => detail.bookmarkId !== bookmarkId)
        );
        toast({
          title: "Đã xóa",
          description: "Bài viết đã được xóa khỏi bộ sưu tập",
        });
      } catch (error) {
        toast({
          title: "Lỗi",
          description: "Không thể xóa bài viết. Vui lòng thử lại",
          variant: "destructive",
        });
      }
    }
  };

  const handleCreateCollection = async () => {
    if (user && newCollectionName) {
      try {
        const newCollection = await createCollection(
          user.id,
          newCollectionName
        );
        setCollections((prev) => [...prev, newCollection]);
        setNewCollectionName("");
        toast({
          title: "Đã tạo",
          description: "Bộ sưu tập mới đã được tạo thành công",
        });
      } catch (error) {
        toast({
          title: "Lỗi",
          description: "Không thể tạo bộ sưu tập. Vui lòng thử lại",
          variant: "destructive",
        });
      }
    }
  };

  const isInCollection = (collectionId: string) => {
    console.log('Checking collection:', collectionId);
    console.log('Current bookmarkDetails:', bookmarkDetails);
    const exists = bookmarkDetails.some(detail => detail.collectionId === collectionId);
    console.log('Exists:', exists);
    return exists;
  };

  const getBookmarkId = (collectionId: string) => {
    const detail = bookmarkDetails.find(detail => detail.collectionId === collectionId);
    return detail?.bookmarkId;
  };

  return (
    <div className="flex items-center">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button
            variant={bookmarkDetails.length > 0 ? "default" : "outline"}
            size="icon"
            className={cn(className)}
            onClick={(e) => {
              e.preventDefault();
              setIsDialogOpen(true);
            }}
          >
            <Bookmark className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Lưu bài viết vào bộ sưu tập</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {collections.map((collection) => {
              const inCollection = isInCollection(collection.id);
              const bookmarkId = getBookmarkId(collection.id);

              return (
                <div key={collection.id} className="flex items-center gap-2">
                  <Button
                    onClick={() => !inCollection && handleBookmark(collection.id)}
                    variant={inCollection ? "secondary" : "outline"}
                    className={cn(
                      "flex-1 justify-start",
                      inCollection && "font-medium"
                    )}
                  >
                    {inCollection ? (
                      <div className="flex items-center gap-2">
                        <Bookmark className="h-4 w-4" />
                        {collection.name}
                      </div>
                    ) : (
                      collection.name
                    )}
                  </Button>
                  {inCollection && bookmarkId && (
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveBookmark(bookmarkId);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              );
            })}
            <div className="flex items-center space-x-2">
              <Input
                value={newCollectionName}
                onChange={(e) => setNewCollectionName(e.target.value)}
                placeholder="Tên bộ sưu tập mới"
              />
              <Button onClick={handleCreateCollection}>
                <Plus className="h-4 w-4 mr-2" />
                Tạo mới
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

'use client'

import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import { useAuth } from '@clerk/nextjs'
import { deleteComment } from '../actions'
import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface DeleteCommentButtonProps {
  commentId: string
  commentUserId: string
  postId: string
  onCommentDeleted: () => void
}

export function DeleteCommentButton({ commentId, commentUserId, postId, onCommentDeleted }: DeleteCommentButtonProps) {
  const { userId } = useAuth()
  const [isDeleting, setIsDeleting] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  if (userId !== commentUserId) return null

  async function handleDelete() {
    try {
      setIsDeleting(true)
      const result = await deleteComment(postId, commentId)
      if (!result.success) {
        throw new Error('Failed to delete comment')
      }
      setIsOpen(false)
      onCommentDeleted()
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
        >
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">Delete comment</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Xác nhận xóa bình luận</DialogTitle>
          <DialogDescription>
            Bạn có chắc chắn muốn xóa bình luận này không? Hành động này không thể hoàn tác.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Hủy
          </Button>
          <Button 
            variant="destructive" 
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? 'Đang xóa...' : 'Xóa bình luận'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 
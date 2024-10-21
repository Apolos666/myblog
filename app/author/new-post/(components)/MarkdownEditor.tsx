import { useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Bold,
  Italic,
  Link,
  Image,
  Code,
  ListOrdered,
  List,
  Heading1,
  Heading2,
  Heading3,
  Quote,
} from "lucide-react";

interface MarkdownEditorProps {
  content: string;
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export function MarkdownEditor({
  content,
  handleInputChange,
}: MarkdownEditorProps) {
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const insertMarkdown = useCallback(
    (prefix: string, suffix = "", placeholder = "") => {
      if (!contentRef.current) return;

      const { selectionStart, selectionEnd, value } = contentRef.current;
      const selectedText = value.substring(selectionStart, selectionEnd);

      const textToInsert = (selectedText || placeholder).replace(/\\n/g, "\n");

      let newText = "";
      if (prefix === "1. " || prefix === "- ") {
        const lines = textToInsert.split("\n");
        newText = lines
          .map((line) => {
            const trimmedLine = line.trim();
            const indentation = line.match(/^\s*/)?.[0] || "";
            if (prefix === "1. ") {
              return `${indentation}1. ${trimmedLine}`;
            } else {
              return `${indentation}- ${trimmedLine}`;
            }
          })
          .join("\n");
      } else {
        newText = prefix + textToInsert + suffix;
      }

      const updatedText =
        value.substring(0, selectionStart) +
        newText +
        value.substring(selectionEnd);

      handleInputChange({
        target: { name: "content", value: updatedText },
      } as React.ChangeEvent<HTMLTextAreaElement>);

      setTimeout(() => {
        if (!contentRef.current) return;
        const newCursorPosition = selectionStart + newText.length;
        contentRef.current.selectionStart = contentRef.current.selectionEnd =
          newCursorPosition;
        contentRef.current.focus();
      }, 0);
    },
    [handleInputChange]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Tab") {
        e.preventDefault();
        const { selectionStart, selectionEnd, value } = e.currentTarget;
        const newValue =
          value.substring(0, selectionStart) +
          "  " +
          value.substring(selectionEnd);

        handleInputChange({
          target: { name: "content", value: newValue },
        } as React.ChangeEvent<HTMLTextAreaElement>);

        setTimeout(() => {
          if (!contentRef.current) return;
          contentRef.current.selectionStart = contentRef.current.selectionEnd =
            selectionStart + 2;
        }, 0);
      }
    },
    [handleInputChange]
  );

  const MarkdownButton = ({
    icon,
    tooltip,
    prefix,
    suffix = "",
    placeholder,
  }: {
    icon: React.ReactNode;
    tooltip: string;
    prefix: string;
    suffix?: string;
    placeholder: string;
  }) => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => insertMarkdown(prefix, suffix, placeholder)}
          >
            {icon}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-2">
        <MarkdownButton
          icon={<Bold className="h-4 w-4" />}
          tooltip="Đậm"
          prefix="**"
          suffix="**"
          placeholder="văn bản đậm"
        />
        <MarkdownButton
          icon={<Italic className="h-4 w-4" />}
          tooltip="Nghiêng"
          prefix="_"
          suffix="_"
          placeholder="văn bản nghiêng"
        />
        <MarkdownButton
          icon={<Link className="h-4 w-4" />}
          tooltip="Liên kết"
          prefix="["
          suffix="](https://example.com)"
          placeholder="văn bản liên kết"
        />
        <MarkdownButton
          // eslint-disable-next-line jsx-a11y/alt-text
          icon={<Image className="h-4 w-4" />}
          tooltip="Hình ảnh"
          prefix="![Mô tả hình ảnh]("
          suffix=")"
          placeholder="https://github.com/shadcn.png"
        />
        <MarkdownButton
          icon={<Code className="h-4 w-4" />}
          tooltip="Mã inline"
          prefix="`"
          suffix="`"
          placeholder="code"
        />
        <MarkdownButton
          icon={<ListOrdered className="h-4 w-4" />}
          tooltip="Danh sách có thứ tự"
          prefix="1. "
          placeholder={`Mục danh sách 1
Mục con 1
Mục con 2
Mục danh sách 2`}
        />
        <MarkdownButton
          icon={<List className="h-4 w-4" />}
          tooltip="Danh sách không thứ tự"
          prefix="- "
          placeholder={`Mục danh sách 1
Mục con 1
Mục con 2
Mục danh sách 2`}
        />
        <MarkdownButton
          icon={<Heading1 className="h-4 w-4" />}
          tooltip="Tiêu đề 1"
          prefix="# "
          placeholder="Tiêu đề lớn"
        />
        <MarkdownButton
          icon={<Heading2 className="h-4 w-4" />}
          tooltip="Tiêu đề 2"
          prefix="## "
          placeholder="Tiêu đề vừa"
        />
        <MarkdownButton
          icon={<Heading3 className="h-4 w-4" />}
          tooltip="Tiêu đề 3"
          prefix="### "
          placeholder="Tiêu đề nhỏ"
        />
        <MarkdownButton
          icon={<Quote className="h-4 w-4" />}
          tooltip="Trích dẫn"
          prefix="> "
          placeholder="Nội dung trích dẫn"
        />
      </div>
      <Textarea
        id="content"
        name="content"
        value={content}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Viết nội dung bài viết ở đây (Hỗ trợ Markdown)"
        rows={15}
        required
        ref={contentRef}
      />
    </>
  );
}

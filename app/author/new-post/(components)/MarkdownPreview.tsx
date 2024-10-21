import { Card, CardContent } from "@/components/ui/card";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

interface MarkdownPreviewProps {
  content: string;
}

export function MarkdownPreview({ content }: MarkdownPreviewProps) {
  return (
    <Card className="min-h-[400px] overflow-auto">
      <CardContent className="prose dark:prose-invert max-w-none p-6">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          components={{
            code({ inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              const language = match ? match[1] : "";
              return !inline ? (
                <SyntaxHighlighter
                  {...props}
                  style={tomorrow}
                  language={language}
                  PreTag="div"
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
            p: ({ children }) => <p className="mb-2">{children}</p>,
            ol: ({ ...props }) => (
              <ol className="list-decimal pl-5 mb-2 space-y-0" {...props} />
            ),
            ul: (props) => (
              <ul className="list-disc pl-5 mb-2 space-y-0" {...props} />
            ),
            li: ({ children, ...props }) => (
              <li className="mb-2" {...props}>
                <span>{children}</span>
              </li>
            ),
          }}
        >
          {content}
        </ReactMarkdown>
      </CardContent>
    </Card>
  );
}

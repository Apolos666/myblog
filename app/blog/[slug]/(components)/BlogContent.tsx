"use client";

import { useEffect } from "react";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";
import slugify from "slugify";

interface BlogContentProps {
  content: string;
}

export function BlogContent({ content }: BlogContentProps) {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const id = hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

  const handleAnchorClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    event.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", `#${id}`);
    }
  };

  const createHeading = (level: "h1" | "h2" | "h3") => {
    const HeadingComponent = ({ children }: { children: React.ReactNode }) => {
      const text = Array.isArray(children)
        ? children.join("")
        : (children as string);
      const id = slugify(text, { lower: true });
      const HeadingTag = level;
      return (
        <HeadingTag id={id} className="group flex items-center">
          <a
            href={`#${id}`}
            className="anchor mr-2 opacity-0 group-hover:opacity-100"
            onClick={(e) => handleAnchorClick(e, id)}
          >
            #
          </a>
          {children}
        </HeadingTag>
      );
    };

    HeadingComponent.displayName = `Heading${level.toUpperCase()}`;

    return HeadingComponent;
  };

  return (
    <Markdown
      components={{
        h1: createHeading("h1"),
        h2: createHeading("h2"),
        h3: createHeading("h3"),
        code({ inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          return !inline && match ? (
            <SyntaxHighlighter
              {...props}
              language={match[1]}
              PreTag="div"
              style={tomorrow}
            >
              {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
      }}
      className="prose max-w-none dark:prose-invert"
    >
      {content}
    </Markdown>
  );
}

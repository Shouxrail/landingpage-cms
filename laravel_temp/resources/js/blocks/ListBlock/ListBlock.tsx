import { lazy, Suspense, useState } from "react";
import { Link } from "@inertiajs/react";
const BlockRenderer = lazy(() => import("@/components/BlockRenderer"));

export const ListBlock = ({ data }: {
  data: {
    items?: {
      title: string;
      /** Legacy plain-text content (backward compat) */
      content?: string;
      /** Rich block children rendered inside the expanded panel */
      contentBlocks?: any[];
      defaultOpen?: string;
      url?: string;
      urlText?: string;
    }[];
    bgColor?: string;
    textColor?: string;
    titleSize?: string;
    titleWeight?: string;
    textContentSize?: string;
    borderColor?: string;
    spacing?: string;
    listStyle?: string;
    marginLeft?: number;
  }
}) => {
  const items = data.items || [];
  const spacing = data.spacing || "gap-4";
  const bgColor = data.bgColor && data.bgColor !== "transparent" ? data.bgColor : undefined;

  // Seed the initially-open item from defaultOpen flags
  const initialOpen = items.findIndex(item => item.defaultOpen === "true");
  const [openIndex, setOpenIndex] = useState<number | null>(initialOpen >= 0 ? initialOpen : null);

  const handleToggle = (index: number) => {
    setOpenIndex(prev => (prev === index ? null : index));
  };

  return (
    <ul className={`flex flex-col ${spacing} ${data.listStyle || 'list-disc'}`} style={{ color: data.textColor || 'inherit', marginLeft: `${data.marginLeft ?? 32}px` }}>
      {items.map((item, index) => {
        const hasContent = (item.contentBlocks && item.contentBlocks.length > 0) || !!item.content;
        const isOpen = openIndex === index;
        return (
          <li key={index} className={`${data.titleSize} ${data.titleWeight} ${spacing}`}> {/* This handles the bullet naturally */}
            <div className="inline-block w-full"> {/* Keeps the details component behaving nicely */}
              <details
                className="group transition-all duration-300 overflow-hidden border"
                style={{
                  backgroundColor: bgColor,
                  borderColor: data.borderColor || 'rgba(255,255,255,0.1)',
                  display: 'inline-block',
                  verticalAlign: "top",
                }}
                open={isOpen}
                onToggle={(e) => {
                  // onToggle fires on both open and close; only act when becoming open
                  if ((e.currentTarget as HTMLDetailsElement).open) {
                    handleToggle(index);
                  } else if (isOpen) {
                    setOpenIndex(null);
                  }
                }}
              >
                <summary className={`flex items-center list-none select-none ${hasContent ? "hover:bg-white/5 cursor-pointer" : ""}`}>
                  <div>
                    <span>{item.title}</span>
                    {item.url && (
                      <span className="opacity-70 font-normal">
                        <Link href={item.url} target="blank" className="text-[#00BF9C] hover:underline">
                          {item.urlText ?? item.url}
                        </Link>
                      </span>
                    )}
                  </div>
                  {hasContent && (
                    <span className={`transition-transform duration-300 ml-2 ${isOpen ? '-rotate-180' : ''}`}>
                      <svg width="21" height="10" viewBox="0 0 21 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.016 0L10.008 10.008L0 0H20.016Z" fill="#00BF9C" />
                      </svg>
                    </span>
                  )}
                </summary>
                {/* Render nested blocks (new) */}
                {item.contentBlocks && item.contentBlocks.length > 0 && (
                  <div className={`${data.textContentSize} pr-5 pt-0`}>
                    <Suspense fallback={null}>
                      <BlockRenderer blocks={item.contentBlocks} />
                    </Suspense>
                  </div>
                )}
                {/* Legacy plain-text fallback */}
                {(!item.contentBlocks || item.contentBlocks.length === 0) && item.content && (
                  <div className={`${data.textContentSize} pr-5 pt-0 opacity-70 whitespace-pre-line`}>
                    {item.content}
                  </div>
                )}
              </details>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default ListBlock;

import { Link } from "@inertiajs/react";

export const ListBlock = ({ data }: {
  data: {
    items?: { title: string; content: string; defaultOpen?: string; url?: string; urlText?: string; }[];
    bgColor?: string;
    textColor?: string;
    titleSize?: string;
    textContentSize?: string;
    borderColor?: string;
    spacing?: string;
    listStyle?: string;
  }
}) => {
  const items = data.items || [];
  const spacing = data.spacing || "gap-4";
  const bgColor = data.bgColor && data.bgColor !== "transparent" ? data.bgColor : undefined;

  return (
    <ul className={`ml-8 flex flex-col ${spacing} ${data.listStyle || 'list-disc'}`} style={{ color: data.textColor || 'inherit' }}>
      {items.map((item, index) => (
        <li key={index} className={`${data.titleSize} ${spacing}`}> {/* This handles the bullet naturally */}
          <div className="inline-block w-full"> {/* Keeps the details component behaving nicely */}
            <details
              className="group transition-all duration-300 overflow-hidden border"
              style={{
                backgroundColor: bgColor,
                borderColor: data.borderColor || 'rgba(255,255,255,0.1)',
                display: 'inline-block',
                verticalAlign: "top",
              }}
              open={item.defaultOpen === "true"}
            >
              <summary className={`flex items-center list-none select-none ${item.content !== null && item.content !== "" ? "hover:bg-white/5 cursor-pointer" : ""}`}>
                <div className="flex-1">
                  <span>{item.title}</span>
                  {item.url && (
                    <span className="opacity-70 font-normal">
                      <Link href={item.url} target="blank" className="text-[#00BF9C] hover:underline ml-1">
                        {item.urlText ?? item.url}
                      </Link>
                    </span>
                  )}
                </div>
                {item.content !== null && item.content !== "" && (
                  <span className="transition-transform duration-300 group-open:-rotate-180 ml-2">
                    <svg fill="none" height="20" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="20"><path d="M6 9l6 6 6-6"></path></svg>
                  </span>
                )}
              </summary>
              {item.content !== null && item.content !== "" && (
                <div className={`${data.textContentSize} p-5 pt-0 opacity-70 whitespace-pre-line`}>
                  {item.content}
                </div>
              )}
            </details>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ListBlock;

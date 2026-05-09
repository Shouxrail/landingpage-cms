const URL_REGEX = /(https?:\/\/[^\s]+)/g;

interface CustomLink {
  text: string;
  url: string;
  newTab?: boolean;
  underline?: boolean;
  marginLeft?: number;
  marginRight?: number;
  fontWeight?: string;
  fontItalic?: boolean;
}

/**
 * Splits text by URLs and custom link texts, returning an array of
 * plain strings and React anchor elements.
 */
function parseLinks(text: string, customLinks: CustomLink[] = []): React.ReactNode[] {
  // Build a combined regex: custom link texts | auto-detected URLs
  const escapedTexts = customLinks
    .filter(l => l.text)
    .map(l => l.text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));

  const combinedPattern = [
    ...escapedTexts,
    'https?://[^\\s]+'
  ].join('|');

  const regex = new RegExp(`(${combinedPattern})`, 'g');
  const parts = text.split(regex);

  return parts.map((part, i) => {
    // Check against custom links first
    const custom = customLinks.find(l => l.text === part);
    if (custom) {
      return (
        <a
          key={i}
          href={custom.url}
          target={custom.newTab !== false ? '_blank' : '_self'}
          rel="noopener noreferrer"
          className={`${custom.underline !== false ? 'underline underline-offset-2' : 'no-underline'} opacity-80 hover:opacity-100 transition-opacity`}
          style={{ color: 'inherit' }}
        >
          {part}
        </a>
      );
    }

    // Auto-detected http/https URL
    if (/^https?:\/\//.test(part)) {
      return (
        <a
          key={i}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 opacity-80 hover:opacity-100 transition-opacity break-all"
          style={{ color: 'inherit' }}
        >
          {part}
        </a>
      );
    }

    return part;
  });
}

export const TextBlockComponent = ({ data }: { data: any }) => {
  const fontSize = data.fontSize || "text-base";
  const color = data.color || "inherit";
  const align = data.align || "text-left";
  const lineHeight = data.lineHeight || "leading-relaxed";
  const marginTop = data.marginTop !== undefined ? `${data.marginTop}px` : "0px";
  const marginBottom = data.marginBottom !== undefined ? `${data.marginBottom}px` : "8px";
  const letterSpacing = data.letterSpacing !== undefined ? `${data.letterSpacing}em` : "0em";
  const content = data.content || "Your text here...";
  const customLinks: CustomLink[] = data.links || [];

  return (
    <p
      className={`${fontSize} ${align} ${lineHeight} ${data.fontWeight}`}
      style={{
        color: color === "inherit" ? undefined : color,
        marginTop,
        marginBottom,
        letterSpacing,
        whiteSpace: "pre-line",
        marginLeft: `${data.marginLeft || 0}px`,
        marginRight: `${data.marginRight || 0}px`,
        fontStyle: data.fontItalic ? "italic" : "normal",
      }}
    >
      {parseLinks(content, customLinks)}
    </p>
  );
};

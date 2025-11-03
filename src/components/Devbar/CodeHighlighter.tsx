import { Copy } from 'lucide-react';
import { useState, type ReactNode } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import {
  atomDark,
  oneLight,
} from 'react-syntax-highlighter/dist/esm/styles/prism';

import { useTheme } from '@/components/ThemeProvider';
import { Button } from '@/components/ui';
import { renderToString } from 'react-dom/server';

type CodeHighlighterProps = {
  children: ReactNode;
  highlightedLines?: number[];
  language?: string;
  title?: string;
};

// Renders a code block with syntax highlighting.
const CodeHighlighter = ({
  children,
  highlightedLines = [],
  language = 'jsx',
  title,
}: CodeHighlighterProps) => {
  const { theme } = useTheme();
  const [copied, setCopied] = useState(false);
  const childrenStr = renderToString(children);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(childrenStr);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const syntaxHighlitghterStyle = {
    theme: theme === 'dark' ? atomDark : oneLight,
    fontSize: 12,
  };

  return (
    <div className='syntax-highlight relative'>
      <div className='flex items-center justify-between'>
        {title && <div className='text-muted-foreground'>{title}</div>}
        <Button
          onClick={handleCopy}
          title='Copy code'
          variant='secondary'
          size='icon'
        >
          <Copy
            size={16}
            className={copied ? 'text-green-500' : 'text-zinc-400'}
          />
        </Button>
      </div>
      <SyntaxHighlighter
        language={language}
        style={theme === 'dark' ? atomDark : oneLight}
        customStyle={{ fontSize: '12px' }}
        wrapLines
        showLineNumbers
        lineProps={(lineNumber: number) => {
          let style = { display: 'block', backgroundColor: '' };
          if (highlightedLines.includes(lineNumber)) {
            style.backgroundColor =
              theme === 'dark'
                ? '#404040' // zink[700]
                : '#e4e4e7'; // zinc[200]
          }
          return { style };
        }}
        lineNumberStyle={{ display: 'none' }}
      >
        {childrenStr}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeHighlighter;

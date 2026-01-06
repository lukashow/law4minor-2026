import { useCallback, useEffect, useState, useRef } from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import { TRANSFORMERS } from '@lexical/markdown';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table';
import { ListItemNode, ListNode } from '@lexical/list';
import { CodeHighlightNode, CodeNode } from '@lexical/code';
import { AutoLinkNode, LinkNode, $createLinkNode } from '@lexical/link';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import {
  $getSelection,
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
  UNDO_COMMAND,
  REDO_COMMAND,
  $createTextNode,
} from 'lexical';
import type { EditorState, LexicalEditor } from 'lexical';
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
} from '@lexical/list';
import { $createHeadingNode, $createQuoteNode } from '@lexical/rich-text';
import { $setBlocksType } from '@lexical/selection';
import { $createParagraphNode, $getRoot } from 'lexical';

// Toolbar Component
function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [isCode, setIsCode] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      setIsBold(selection.hasFormat('bold'));
      setIsItalic(selection.hasFormat('italic'));
      setIsUnderline(selection.hasFormat('underline'));
      setIsStrikethrough(selection.hasFormat('strikethrough'));
      setIsCode(selection.hasFormat('code'));
    }
  }, []);

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        updateToolbar();
      });
    });
  }, [editor, updateToolbar]);

  const formatHeading = (headingSize: 'h1' | 'h2' | 'h3') => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createHeadingNode(headingSize));
      }
    });
  };

  const formatParagraph = () => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createParagraphNode());
      }
    });
  };

  const formatQuote = () => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createQuoteNode());
      }
    });
  };

  const insertLink = () => {
    const url = prompt('Enter the URL:');
    if (url) {
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          const linkNode = $createLinkNode(url);
          selection.insertNodes([linkNode]);
        }
      });
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('http://localhost:3001/api/media/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Upload failed');

      const media = await response.json();
      const url = `http://localhost:3001${media.url}`;

      // Insert image as paragraph with image
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          const paragraphNode = $createParagraphNode();
          // For now, insert markdown-style image since we don't have ImageNode
          const textNode = $createTextNode(`![${file.name}](${url})`);
          paragraphNode.append(textNode);
          selection.insertNodes([paragraphNode]);
        }
      });
    } catch (err) {
      console.error('Image upload failed:', err);
      alert('Failed to upload image');
    }

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const btnClass = (active: boolean) =>
    `p-2 rounded hover:bg-gray-200 transition-colors ${active ? 'bg-gray-200 text-blue-600' : 'text-gray-600'}`;

  return (
    <div className="toolbar flex flex-wrap items-center gap-1 p-2 border-b border-gray-200 bg-gray-50">
      {/* Undo/Redo */}
      <button
        type="button"
        onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}
        className={btnClass(false)}
        title="Undo"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
        </svg>
      </button>
      <button
        type="button"
        onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}
        className={btnClass(false)}
        title="Redo"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 10h-10a8 8 0 00-8 8v2M21 10l-6 6m6-6l-6-6" />
        </svg>
      </button>

      <div className="w-px h-6 bg-gray-300 mx-1" />

      {/* Headings */}
      <select
        onChange={(e) => {
          const value = e.target.value;
          if (value === 'p') formatParagraph();
          else if (value === 'h1') formatHeading('h1');
          else if (value === 'h2') formatHeading('h2');
          else if (value === 'h3') formatHeading('h3');
          else if (value === 'quote') formatQuote();
        }}
        className="px-2 py-1 text-sm border border-gray-200 rounded bg-white focus:outline-none focus:border-blue-500"
      >
        <option value="p">Paragraph</option>
        <option value="h1">Heading 1</option>
        <option value="h2">Heading 2</option>
        <option value="h3">Heading 3</option>
        <option value="quote">Quote</option>
      </select>

      <div className="w-px h-6 bg-gray-300 mx-1" />

      {/* Text formatting */}
      <button
        type="button"
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')}
        className={btnClass(isBold)}
        title="Bold (Ctrl+B)"
      >
        <span className="font-bold text-sm">B</span>
      </button>
      <button
        type="button"
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')}
        className={btnClass(isItalic)}
        title="Italic (Ctrl+I)"
      >
        <span className="italic text-sm">I</span>
      </button>
      <button
        type="button"
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline')}
        className={btnClass(isUnderline)}
        title="Underline (Ctrl+U)"
      >
        <span className="underline text-sm">U</span>
      </button>
      <button
        type="button"
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough')}
        className={btnClass(isStrikethrough)}
        title="Strikethrough"
      >
        <span className="line-through text-sm">S</span>
      </button>
      <button
        type="button"
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'code')}
        className={btnClass(isCode)}
        title="Inline Code"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      </button>

      <div className="w-px h-6 bg-gray-300 mx-1" />

      {/* Lists */}
      <button
        type="button"
        onClick={() => editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)}
        className={btnClass(false)}
        title="Bullet List"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      <button
        type="button"
        onClick={() => editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined)}
        className={btnClass(false)}
        title="Numbered List"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
        </svg>
      </button>

      <div className="w-px h-6 bg-gray-300 mx-1" />

      {/* Link */}
      <button
        type="button"
        onClick={insertLink}
        className={btnClass(false)}
        title="Insert Link"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
      </button>

      {/* Image Upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className={btnClass(false)}
        title="Insert Image"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </button>
    </div>
  );
}

const theme = {
  paragraph: 'mb-4 text-gray-800 leading-relaxed',
  heading: {
    h1: 'text-3xl font-bold mb-4 text-gray-900',
    h2: 'text-2xl font-bold mb-3 text-gray-900',
    h3: 'text-xl font-bold mb-2 text-gray-900',
  },
  list: {
    ul: 'list-disc ml-5 mb-4 space-y-1',
    ol: 'list-decimal ml-5 mb-4 space-y-1',
    listitem: 'ml-2',
  },
  quote: 'border-l-4 border-gray-300 pl-4 italic mb-4 text-gray-600',
  text: {
    bold: 'font-bold',
    italic: 'italic',
    underline: 'underline',
    strikethrough: 'line-through',
    code: 'bg-gray-100 px-1 py-0.5 rounded font-mono text-sm',
  },
  code: 'bg-gray-100 p-4 rounded-lg font-mono text-sm mb-4 block',
  link: 'text-blue-600 underline hover:text-blue-800',
};

function onError(error: Error) {
  console.error('Lexical Error:', error);
}

type LexicalEditorProps = {
  onChange?: (editorState: EditorState, editor: LexicalEditor) => void;
  initialContent?: any; // Lexical editor state JSON
  placeholder?: string;
};

// Plugin to load initial content
function InitialContentPlugin({ initialContent }: { initialContent?: any }) {
  const [editor] = useLexicalComposerContext();
  const hasLoadedRef = useRef(false);

  useEffect(() => {
    if (initialContent && !hasLoadedRef.current) {
      hasLoadedRef.current = true;
      
      // Handle different content formats
      try {
        let editorState;
        if (typeof initialContent === 'string') {
          editorState = editor.parseEditorState(initialContent);
        } else if (initialContent.root) {
          editorState = editor.parseEditorState(JSON.stringify(initialContent));
        }
        
        if (editorState) {
          editor.setEditorState(editorState);
        }
      } catch (e) {
        console.error('Failed to load initial content:', e);
      }
    }
  }, [editor, initialContent]);

  return null;
}

export default function LexicalEditorComponent({
  onChange,
  initialContent,
  placeholder = 'Start writing your content...',
}: LexicalEditorProps) {
  const initialConfig = {
    namespace: 'ArticleEditor',
    theme,
    onError,
    nodes: [
      HeadingNode,
      QuoteNode,
      ListNode,
      ListItemNode,
      CodeNode,
      CodeHighlightNode,
      TableNode,
      TableCellNode,
      TableRowNode,
      AutoLinkNode,
      LinkNode,
    ],
  };

  const handleChange = useCallback(
    (editorState: EditorState, editor: LexicalEditor) => {
      if (onChange) {
        onChange(editorState, editor);
      }
    },
    [onChange]
  );

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="editor-container border border-gray-300 rounded-lg overflow-hidden bg-white shadow-sm">
        <ToolbarPlugin />
        <div className="relative">
          <RichTextPlugin
            contentEditable={
              <ContentEditable className="editor-input p-4 min-h-[400px] focus:outline-none prose prose-gray max-w-none" />
            }
            placeholder={
              <div className="editor-placeholder absolute top-4 left-4 text-gray-400 pointer-events-none">
                {placeholder}
              </div>
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <ListPlugin />
          <LinkPlugin />
          <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
          <OnChangePlugin onChange={handleChange} />
          <InitialContentPlugin initialContent={initialContent} />
        </div>
      </div>
    </LexicalComposer>
  );
}

// Export helper to serialize editor state to JSON
export function serializeEditorState(editorState: EditorState): string {
  return JSON.stringify(editorState.toJSON());
}

// Export helper to get plain text from editor state
export function getPlainTextFromEditorState(editorState: EditorState): string {
  let text = '';
  editorState.read(() => {
    text = $getRoot().getTextContent();
  });
  return text;
}

import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EditorJS from '@editorjs/editorjs';
import type { OutputData } from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Paragraph from '@editorjs/paragraph';
import Quote from '@editorjs/quote';

export function PageEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const editorRef = useRef<EditorJS | null>(null);
  const editorHolderRef = useRef<HTMLDivElement>(null);
  const [isEditorReady, setIsEditorReady] = useState(false);
  
  const [pageData, setPageData] = useState({
    title: '',
    slug: '',
    status: 'Draft',
    template: 'Default',
    content: null as OutputData | null,
  });

  const isNew = !id || id === 'new';

  const initEditor = useCallback(() => {
    if (editorRef.current || !editorHolderRef.current) return;

    const editor = new EditorJS({
      holder: editorHolderRef.current,
      placeholder: 'Start writing your content here...',
      tools: {
        header: {
          class: Header as unknown as EditorJS.ToolConstructable,
          config: {
            levels: [2, 3, 4],
            defaultLevel: 2,
          },
        },
        list: {
          class: List as unknown as EditorJS.ToolConstructable,
          inlineToolbar: true,
        },
        paragraph: {
          class: Paragraph as unknown as EditorJS.ToolConstructable,
          inlineToolbar: true,
        },
        quote: {
          class: Quote as unknown as EditorJS.ToolConstructable,
          inlineToolbar: true,
        },
      },
      onReady: () => {
        setIsEditorReady(true);
      },
    });

    editorRef.current = editor;
  }, []);

  useEffect(() => {
    initEditor();

    return () => {
      if (editorRef.current) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, [initEditor]);

  const handleSave = async () => {
    if (editorRef.current) {
      const content = await editorRef.current.save();
      console.log('Saved content:', { ...pageData, content });
      alert('Page saved successfully!');
      navigate('/admin/pages');
    }
  };

  const handlePublish = async () => {
    if (editorRef.current) {
      const content = await editorRef.current.save();
      console.log('Published content:', { ...pageData, content, status: 'Published' });
      alert('Page published successfully!');
      navigate('/admin/pages');
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      {/* Header */}
      <div className="bg-white rounded-t-xl border-b px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-lg font-semibold text-gray-800">
            {isNew ? 'New Page' : 'Edit Page'}
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleSave}
            className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Save Draft
          </button>
          <button
            onClick={handlePublish}
            className="btn btn-primary"
          >
            Publish
          </button>
        </div>
      </div>

      {/* Editor Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Main Content */}
        <div className="flex-1 bg-white overflow-auto p-6">
          <input
            type="text"
            placeholder="Page Title"
            value={pageData.title}
            onChange={(e) => setPageData({ ...pageData, title: e.target.value })}
            className="w-full text-3xl font-serif font-bold text-gray-800 placeholder-gray-300 border-none outline-none mb-6"
          />
          
          <div 
            ref={editorHolderRef} 
            className="prose prose-lg max-w-none min-h-[300px]"
          />
          
          {!isEditorReady && (
            <div className="text-gray-400 text-sm">Loading editor...</div>
          )}
        </div>

        {/* Sidebar */}
        <div className="w-80 bg-[#F9FAFB] border-l border-gray-200 overflow-auto">
          <div className="p-6 space-y-6">
            {/* Status */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Status</h3>
              <select
                value={pageData.status}
                onChange={(e) => setPageData({ ...pageData, status: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[var(--color-accent)]"
              >
                <option value="Draft">Draft</option>
                <option value="Published">Published</option>
              </select>
            </div>

            {/* Slug */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Permalink</h3>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">/</span>
                <input
                  type="text"
                  value={pageData.slug}
                  onChange={(e) => setPageData({ ...pageData, slug: e.target.value })}
                  placeholder="page-slug"
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[var(--color-accent)]"
                />
              </div>
            </div>

            {/* Template */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Template</h3>
              <select
                value={pageData.template}
                onChange={(e) => setPageData({ ...pageData, template: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[var(--color-accent)]"
              >
                <option value="Default">Default</option>
                <option value="Full Width">Full Width</option>
                <option value="Sidebar">With Sidebar</option>
              </select>
            </div>

            {/* Featured Image */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Featured Image</h3>
              <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center cursor-pointer hover:border-[var(--color-accent)] transition-colors">
                <svg className="w-8 h-8 mx-auto text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-sm text-gray-500">Click to upload</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

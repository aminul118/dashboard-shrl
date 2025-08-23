/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/common/ReactQuillJS.tsx
import { useEffect, useMemo, useRef } from 'react';
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css'; // Quill theme CSS
import './quilStyle.css'; // your custom CSS (optional)

export interface ReactQuillJSProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  readOnly?: boolean;
  className?: string;
  height?: number | string; // e.g., 300 or "300px"
  toolbar?: any; // custom toolbar config (optional)
}

export default function ReactQuillJS({
  value,
  onChange,
  placeholder = 'Write something…',
  readOnly = false,
  className = '',
  height = 300,
  toolbar,
}: ReactQuillJSProps) {
  // Memoize modules so Quill doesn't re-init
  const modules = useMemo(
    () => ({
      toolbar: toolbar ?? [
        [{ header: [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['blockquote', 'code-block'],
        ['link', 'image'],
        [{ align: [] }, { color: [] }, { background: [] }],
        ['clean'],
      ],
      clipboard: { matchVisual: false },
    }),
    [toolbar],
  );

  const formats = useMemo(
    () => [
      'header',
      'bold',
      'italic',
      'underline',
      'strike',
      'list',
      'bullet',
      'blockquote',
      'code-block',
      'link',
      'image',
      'align',
      'color',
      'background',
    ],
    [],
  );

  const { quill, quillRef } = useQuill({
    theme: 'snow',
    modules,
    formats,
    placeholder,
    readOnly,
  });

  // Track last HTML we set to avoid loops
  const lastHtmlRef = useRef<string>('');

  // Initialize/Sync external value -> editor (only when it actually changed)
  useEffect(() => {
    if (!quill) return;

    const current = quill.root.innerHTML || '';
    const external = value || '';

    // If the external value differs from what the editor currently has
    if (external !== current) {
      // setContents via clipboard to accept HTML
      quill.clipboard.dangerouslyPasteHTML(external);
      lastHtmlRef.current = external;
    }
  }, [quill, value]);

  // Push editor changes -> external onChange (debounced)
  useEffect(() => {
    if (!quill) return;

    let debounceTimer: any;

    const handler = () => {
      const html = quill.root.innerHTML || '';
      // Avoid firing onChange if nothing changed compared to last set
      if (html !== lastHtmlRef.current) {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          lastHtmlRef.current = html;
          onChange(html);
        }, 120); // small debounce to reduce chatter
      }
    };

    quill.on('text-change', handler);
    return () => {
      clearTimeout(debounceTimer);
      quill.off('text-change', handler);
    };
  }, [quill, onChange]);

  return (
    <div
      className={className}
      style={{
        border: '1px solid rgba(0,0,0,0.1)',
        borderRadius: 8,
        overflow: 'hidden',
      }}
    >
      <div ref={quillRef} style={{ minHeight: height }} />
    </div>
  );
}

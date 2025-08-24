/* eslint-disable @typescript-eslint/no-explicit-any */
// components/ReactQuil.tsx
import React, { useEffect, useState } from 'react';
import 'quill/dist/quill.snow.css';
import './quilStyle.css';

interface QuilJsProps {
  value: string;
  onChange: (value: string) => void;
  border?: string;
  height?: number;
}

const ReactQuil: React.FC<QuilJsProps> = ({ value, onChange, height = 700, border = 'none' }) => {
  const [quillRef, setQuillRef] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    let quillInstance: any;

    if (quillRef) {
      import('quill').then((QuillModule) => {
        const Quill = QuillModule.default;

        quillInstance = new Quill(quillRef, {
          theme: 'snow',
        });

        // Set initial value
        if (value !== quillInstance.root.innerHTML) {
          quillInstance.clipboard.dangerouslyPasteHTML(value);
        }

        // Handle changes
        const handleChange = () => {
          const html = quillInstance.root.innerHTML;
          if (html !== value) onChange(html);
        };

        quillInstance.on('text-change', handleChange);

        // Cleanup
        return () => {
          quillInstance.off('text-change', handleChange);
        };
      });
    }
  }, [quillRef, value, onChange]);

  return <div ref={setQuillRef} className="dark:bg-black" style={{ height, border }} />;
};

export default ReactQuil;

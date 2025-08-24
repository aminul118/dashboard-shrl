/* eslint-disable @typescript-eslint/no-explicit-any */
// components/Quil2.tsx
import React, { useEffect, useState } from 'react';
import 'quill/dist/quill.snow.css';

interface QuilJsProps {
  value: string;
  onChange: (value: string) => void;
  height?: number;
}

const Quil2: React.FC<QuilJsProps> = ({ value, onChange, height = 700 }) => {
  const [quillRef, setQuillRef] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    let quillInstance: any;

    if (quillRef) {
      // Dynamically import Quill to avoid require errors in production
      import('quill').then((QuillModule) => {
        const Quill = QuillModule.default;
        quillInstance = new Quill(quillRef, {
          theme: 'snow',
        });

        // Set initial value
        quillInstance.clipboard.dangerouslyPasteHTML(value);

        // Listen for changes
        quillInstance.on('text-change', () => {
          onChange(quillInstance.root.innerHTML);
        });
      });
    }

    // Cleanup on unmount
    return () => {
      if (quillInstance) quillInstance.off('text-change');
    };
  }, [quillRef]);

  return (
    <div
      ref={setQuillRef}
      className="bg-slate-700"
      style={{ height, color: 'white', border: 'none' }}
    />
  );
};

export default Quil2;

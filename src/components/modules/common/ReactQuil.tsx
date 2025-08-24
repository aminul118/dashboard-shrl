import { useEffect } from 'react';
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';
import './quilStyle.css';

interface QuilJsProps {
  value: string;
  onChange: (value: string) => void;
  border?: string;
  height?: number;
}

const ReactQuil = ({ value, onChange, height = 700, border = 'none' }: QuilJsProps) => {
  const { quill, quillRef } = useQuill();

  useEffect(() => {
    if (!quill) return;

    // Only set initial content if different
    if (value !== quill.root.innerHTML) {
      quill.clipboard.dangerouslyPasteHTML(value);
    }

    const handleChange = () => {
      const html = quill.root.innerHTML;
      if (html !== value) {
        onChange(html);
      }
    };

    quill.on('text-change', handleChange);

    return () => {
      quill.off('text-change', handleChange);
    };
  }, [quill, value, onChange]);

  return <div ref={quillRef} className="dark:bg-black" style={{ height, border }} />;
};

export default ReactQuil;

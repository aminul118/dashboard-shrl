import { useEffect } from 'react';
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';
import './quilStyle.css';

interface QuilJsProps {
  value: string;
  onChange: (value: string) => void;
  height?: number;
}

const ReactQuil = ({ value, onChange, height = 700 }: QuilJsProps) => {
  const { quill, quillRef } = useQuill();

  // Initialize editor with initial value and setup listener
  useEffect(() => {
    if (!quill) return;

    quill.clipboard.dangerouslyPasteHTML(value); // Set initial value

    const handleChange = () => {
      onChange(quill.root.innerHTML);
    };

    quill.on('text-change', handleChange);

    // Cleanup listener on unmount or when quill changes
    return () => {
      quill.off('text-change', handleChange);
    };
  }, [quill]);

  // Update editor if parent value changes
  useEffect(() => {
    if (!quill) return;
    if (value !== quill.root.innerHTML) {
      quill.clipboard.dangerouslyPasteHTML(value);
    }
  }, [value, quill]);

  return (
    <div ref={quillRef} className="bg-black " style={{ height, color: 'white', border: 'none' }} />
  );
};

export default ReactQuil;

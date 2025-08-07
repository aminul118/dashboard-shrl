// components/modules/common/ReactQuil.tsx

import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import "./quilStyle.css";
import { useEffect } from "react";

interface ReactQuilProps {
  value: string;
  onChange: (value: string) => void;
}

const ReactQuil = ({ value, onChange }: ReactQuilProps) => {
  const { quill, quillRef } = useQuill();

  useEffect(() => {
    if (quill) {
      quill.clipboard.dangerouslyPasteHTML(value || "");
      quill.on("text-change", () => {
        onChange(quill.root.innerHTML);
      });
    }
  }, [quill]);

  return <div ref={quillRef} className="border" />;
};

export default ReactQuil;

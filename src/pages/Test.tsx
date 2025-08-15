// Test.tsx
import ReactQuil from '@/components/modules/common/ReactQuil';
import { useState } from 'react';

const Test = () => {
  const [value, setValue] = useState<string>(''); // ✅ start with empty string

  return (
    <div>
      <ReactQuil value={value} onChange={setValue} />

      {/* Just for testing - display HTML output */}
      <div className="mt-4 p-2 border">
        <h3>Editor Output:</h3>
        <div dangerouslySetInnerHTML={{ __html: value }} />
      </div>

      {/* Or log to console */}
      <button onClick={() => console.log('Quill HTML:', value)} className="mt-2 p-2 border rounded">
        Log Value
      </button>
    </div>
  );
};

export default Test;

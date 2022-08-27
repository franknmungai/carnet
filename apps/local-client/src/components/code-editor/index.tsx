import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import './code-editor.css';

interface Props {
  initialValue: string;
  onChange: (val: string) => void;
}

const CodeEditor: React.FC<Props> = ({ initialValue, onChange }) => {
  return (
    <CodeMirror
      value={initialValue}
      extensions={[python()]}
      onChange={onChange}
    />
  );
};
export default CodeEditor;

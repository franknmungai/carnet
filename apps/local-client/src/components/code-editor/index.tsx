import React, { useMemo } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { javascript } from '@codemirror/lang-javascript';
import './code-editor.css';

interface Props {
  initialValue: string;
  language: 'js' | 'py';
  onChange: (val: string) => void;
}

const CodeEditor: React.FC<Props> = ({ initialValue, onChange, language }) => {
  const extensions = useMemo(() => {
    if (language === 'py') {
      return [python()];
    }

    return [javascript({ jsx: true })];
  }, [language]);
  return (
    <CodeMirror
      value={initialValue + '\n'}
      extensions={extensions}
      onChange={onChange}
    />
  );
};
export default CodeEditor;

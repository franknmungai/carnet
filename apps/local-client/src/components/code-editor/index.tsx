import React, { useCallback, useEffect, useRef, useState } from 'react';
import MonacoEditor, { OnMount } from '@monaco-editor/react';
import CodeMirror from '@uiw/react-codemirror';
import { python } from "@codemirror/lang-python";
import './code-editor.css';

interface Props {
  initialValue: string;
  onChange: (val: string) => void;
}
const CodeEditor: React.FC<Props> = ({ initialValue, onChange }) => {
  const editorRef = useRef<any>();
  const [codeEditorValue, setCodeEditorValue] = useState<string>(initialValue);
  const [editorHeight, setEditorHeight] = useState(150);

  const onEditorMount: OnMount = (editor) => {
    editorRef.current = editor;
  };

  const onChangeHandler = (val: string) => {
    onChange(val);
    setCodeEditorValue(val);
  };

  useEffect(() => {
    const numberOfLines = Array.from(codeEditorValue).reduce((acc, curr) => {
      if (curr === '\n') {
        return (acc += 1);
      }
      return acc;
    }, 0);

    const height = numberOfLines * 24;
    setEditorHeight(height < 50 ? 50 : height);
  }, [codeEditorValue]);

  return (
    <div className='code-editor-wrapper '>
      <MonacoEditor
      height={editorHeight}
      width="100%"
      language="python"
      value={initialValue}
      onMount={onEditorMount}
      onChange={onChangeHandler}
      options={{
        wordWrap: 'on',
        minimap: { enabled: false },
        showUnused: false,
        folding: false,
        lineNumbersMinChars: 3,
        fontSize: 16,
        scrollBeyondLastLine: false,
        automaticLayout: true,
        tabSize: 2,
        scrollbar: {
          vertical: 'hidden',
        },
      }}
      theme="vs-dark"
    />
    </div>
  );
};

export default CodeEditor;



export function CodeEditor2() {
  const onChange = useCallback((value, viewUpdate) => {
    console.log('value: ', value);
  }, []);
  return (
    <CodeMirror
      value="print('hello world!');"
      extensions={[python()]}
      onChange={onChange}
    />
  );
}
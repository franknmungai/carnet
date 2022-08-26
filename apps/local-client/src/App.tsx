import CodeEditor from './components/code-editor';

function App() {
  return (
    <div className="App">
      <h1>Carnet</h1>
      <CodeEditor onChange={() => {}} initialValue="" />
    </div>
  );
}

export default App;

import AddCell from './components/add-cell';
import CodeCell from './components/code-cell';

function App() {
  return (
    <div className="App">
      <h1>Carnet</h1>
      <CodeCell language="py" />
      <AddCell />
    </div>
  );
}

export default App;

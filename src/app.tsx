import React, {useState} from 'react';

function CommandInput() {
  const [command, setCommand] = useState('');
  const [output, setOutput] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setOutput(null);
    try {
      // @ts-ignore
      const result = await window.electronAPI.runCommand(command);
      setOutput(result);
    } catch (err: any) {
      setOutput(err.message || 'Error running command');
    }
    setLoading(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          value={command}
          onChange={e => setCommand(e.target.value)}
          placeholder="Enter shell command"
          style={{ width: 300 }}
        />
        <button type="submit" disabled={loading || !command.trim()}>
          Run
        </button>
      </form>
      <pre style={{ background: '#eee', padding: 10, marginTop: 10, minHeight: 50 }}>
        {loading ? 'Running...' : output}
      </pre>
    </div>
  );
}

function App() {
  return (
    <div>
      <h2>Hello from Reactteee!</h2>
      <CommandInput />
    </div>
  );
}

export default App;

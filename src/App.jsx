import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0)

  return (
    <main className="grid place-items-center min-h-screen max-h-screen h-screen">
      <h1 className="text-4xl font-bold">Hello World</h1>
    </main>
  );
}

export default App;

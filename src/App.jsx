import ChatsList from "@/components/ChatsList";
import UsersDropdown from "@/components/UsersDropdown";
import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <main
      className="grid place-items-stretch min-h-screen max-h-screen h-screen grid-cols-[300px_auto] bg-gray-100 p-5 relative"
      style={{
        backgroundImage: `url(/dot.svg)`,
        backgroundRepeat: "repeat",
        backgroundSize: "30px",
      }}
    >
      <aside className="bg-white/10 backdrop-blur-[1px] ring-1 ring-gray-700/10 shadow-sm rounded-md overflow-hidden">
        <ChatsList className="h-full" />
      </aside>
      <section></section>
      <UsersDropdown className="fixed top-5 right-5" />
    </main>
  );
}

export default App;

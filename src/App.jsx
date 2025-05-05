import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import "./index.css";
import ChatButton from "./components/ChatButton";
import ChatWindow from "./components/ChatWindow";

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  function toggleChat() {
    setIsChatOpen((prev) => !prev);
  }

  return (
    <div className="relative min-h-screen bg-gray-100">
      <ChatButton
        className="furia-chat-button"
        onClick={toggleChat}
        isChatOpen={isChatOpen}
      />
      {isChatOpen && <ChatWindow />}
    </div>
  );
}

export default App;

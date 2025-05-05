function ChatButton({ onClick, isChatOpen }) {
  let buttonContent;

  if (isChatOpen) {
    buttonContent = <span className="text-2x1">&times;</span>;
  } else {
    buttonContent = <span>Chat</span>;
  }

  return (
    <button
      onClick={onClick}
      className="fixed bottom-4 right-4 p-4 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition"
    >
      {buttonContent}
    </button>
  );
}

export default ChatButton;

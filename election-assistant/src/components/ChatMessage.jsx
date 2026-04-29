import PropTypes from "prop-types";

function renderMarkdown(text) {
  return text.split("\n").map((line, i) => {
    const processed = line.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    if (line.startsWith("- ")) {
      return (
        <li key={i} className="ml-4 list-disc text-sm" dangerouslySetInnerHTML={{ __html: processed.slice(2) }} />
      );
    }
    if (/^\d+\.\s/.test(line)) {
      return (
        <li key={i} className="ml-4 list-decimal text-sm" dangerouslySetInnerHTML={{ __html: processed.replace(/^\d+\.\s/, "") }} />
      );
    }
    if (line.trim() === "") return <br key={i} />;
    return <p key={i} className="text-sm" dangerouslySetInnerHTML={{ __html: processed }} />;
  });
}

export default function ChatMessage({ message, theme }) {
  const isBot = message.sender === "bot";
  const isDark = theme === 'dark';

  return (
    <div className={`flex ${isBot ? "justify-start" : "justify-end"} mb-3 animate-fade-in`}>
      {isBot && (
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-civic-blue to-civic-purple flex items-center justify-center text-white text-xs font-bold shrink-0 mr-2 mt-1 shadow-md">
          VS
        </div>
      )}
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 shadow-sm border transition-colors ${
          isBot
            ? isDark
              ? 'bg-surface-secondary border-border-color text-text-primary rounded-tl-sm'
              : 'bg-white text-gray-800 border-gray-100 rounded-tl-sm'
            : 'bg-gradient-to-br from-civic-blue to-civic-purple text-white rounded-tr-sm border-transparent'
        }`}
      >
        <div className="space-y-1 leading-relaxed">
          {renderMarkdown(message.text)}
        </div>
      </div>
    </div>
  );
}

ChatMessage.propTypes = {
  message: PropTypes.shape({
    id: PropTypes.number.isRequired,
    sender: PropTypes.oneOf(["bot", "user"]).isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
  theme: PropTypes.oneOf(['dark', 'light']),
};

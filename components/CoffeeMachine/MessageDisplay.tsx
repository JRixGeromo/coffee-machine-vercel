'use client';

interface MessageDisplayProps {
  message: string;
  onClose: () => void;
}

export function MessageDisplay({ message, onClose }: MessageDisplayProps) {
  if (!message) return null;

  const getMessageType = () => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('success') || lowerMessage.includes('filled') || lowerMessage.includes('made successfully')) {
      return 'success';
    } else if (lowerMessage.includes('error') || lowerMessage.includes('not enough') || lowerMessage.includes('overflow') || lowerMessage.includes('failed')) {
      return 'error';
    } else {
      return 'info';
    }
  };

  const messageType = getMessageType();

  return (
    <div className="coffee-card">
      <div className={`message-${messageType} flex items-center justify-between`}>
        <p className="font-medium">{message}</p>
        <button
          onClick={onClose}
          className="ml-4 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

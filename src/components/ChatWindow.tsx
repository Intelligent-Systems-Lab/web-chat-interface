import { Box, Typography } from '@mui/material';
import ChatInput from './ChatInput';

interface ChatWindowProps {
  sessionId: string | null;
}

function ChatWindow({ sessionId }: ChatWindowProps) {
  const handleSendMessage = (message: string) => {
    console.log('訊息已發送:', message); // 處理發送訊息的邏輯
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      flex="1"
      bgcolor="#212121"
      color="white"
      height="100%"
      width="100%"
    >
      {/* Chat content area */}
      <Box flex="1" p={2} overflow="auto">
        {sessionId ? (
          <Typography>顯示對話內容（Session: {sessionId}）</Typography>
        ) : (
          <Typography color="gray">請選擇一個對話</Typography>
        )}
      </Box>

      {/* Chat input area */}
      <ChatInput onSendMessage={handleSendMessage} />
    </Box>
  );
}

export default ChatWindow;
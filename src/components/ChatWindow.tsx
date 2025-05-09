import { Box, Typography } from '@mui/material';
import ChatInput from './ChatInput';

interface ChatWindowProps {
  sessionId: string | null;
  messages: { id: number; sender: string; text: string }[];
  onSendMessage: (message: string) => void;
}

const marginPercent = '20%'

function ChatWindow({ sessionId, messages, onSendMessage }: ChatWindowProps) {
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
          messages.map((msg) => (
            <Box
              key={msg.id}
              display="flex"
              justifyContent={msg.sender === 'user' ? 'flex-end' : 'flex-start'}
              mb={2}
            >
              <Box
                bgcolor={msg.sender === 'user' ? '#4caf50' : '#616161'}
                color="white"
                px={2}
                py={1}
                borderRadius="8px"
                maxWidth="35%"
                alignSelf={msg.sender === 'user' ? 'flex-end' : 'flex-start'}
                marginLeft={msg.sender === 'user' ? 'auto' : marginPercent}
                marginRight={msg.sender === 'user' ? marginPercent : 'auto'}
                sx={{
                  wordWrap: 'break-word',
                  overflowWrap: 'break-word',
                  whiteSpace: 'pre-wrap',
                }}
              >
                <Typography variant="body1">{msg.text}</Typography>
              </Box>
            </Box>
          ))
        ) : (
          <Typography color="gray">請選擇一個對話</Typography>
        )}
      </Box>

      {/* Chat input area */}
      <ChatInput onSendMessage={onSendMessage} />
    </Box>
  );
}

export default ChatWindow;
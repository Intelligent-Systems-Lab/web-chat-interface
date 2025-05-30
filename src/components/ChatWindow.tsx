import { Box, Typography } from '@mui/material';
import ChatInput from './ChatInput';
import HomeImg from './HomeImg';

interface ChatWindowProps {
  sessionId: string | null;
  messages: { id: number; sender: string; text: string }[];
  onSendMessage: (message: string) => void;
  sessionIsOpen: boolean;
  sessionSettingIsOpen: boolean;
}

function ChatWindow({ sessionId, messages, onSendMessage, sessionIsOpen, sessionSettingIsOpen }: ChatWindowProps) {
  const marginPercent = (msgSender: string) => {
    if (msgSender === 'user') {
      return sessionSettingIsOpen ? '5%' : '15%';
    } else {
      return sessionIsOpen ? '5%' : '15%';
    }
  };
  
  const isJson = (str: string) => {
    try {
      const parsed = JSON.parse(str);
      // 確保解析後的結果是物件或陣列
      return typeof parsed === 'object' && parsed !== null;
    } catch {
      return false;
    }
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
                marginLeft={msg.sender === 'user' ? 'auto' : marginPercent(msg.sender)}
                marginRight={msg.sender === 'user' ? marginPercent(msg.sender) : 'auto'}
                sx={{
                  wordWrap: 'break-word',
                  overflowWrap: 'break-word',
                  whiteSpace: 'pre-wrap',
                  transition: 'margin 0.3s ease-in-out',
                }}
              >
                {isJson(msg.text) ? (
                  <Box
                    component="pre"
                    sx={{
                      margin: 0,
                      fontFamily: 'monospace',
                      maxHeight: '200px', 
                      overflowY: 'auto', 
                      backgroundColor: '#333', 
                      padding: '8px',
                      borderRadius: '4px',
                    }}
                  >
                    {JSON.stringify(JSON.parse(msg.text), null, 2)}
                  </Box>
                ) : (
                  <Typography variant="body1">{msg.text}</Typography>
                )}
              </Box>
            </Box>
          ))
        ) : (
          <HomeImg />
        )}
      </Box>

      {sessionId && <ChatInput onSendMessage={onSendMessage} />}
    </Box>
  );
}

export default ChatWindow;
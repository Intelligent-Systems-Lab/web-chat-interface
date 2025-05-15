import { Box, Typography } from '@mui/material';
import ChatInput from './ChatInput';

const marginPercent = '20%';

interface ChatWindowProps {
  sessionId: string | null;
  messages: { id: number; sender: string; text: string }[];
  onSendMessage: (message: string) => void;
  mode: string; // 新增 mode 屬性
}

function ChatWindow({ sessionId, messages, onSendMessage, mode }: ChatWindowProps) {
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
                marginLeft={msg.sender === 'user' ? 'auto' : marginPercent}
                marginRight={msg.sender === 'user' ? marginPercent : 'auto'}
                sx={{
                  wordWrap: 'break-word',
                  overflowWrap: 'break-word',
                  whiteSpace: 'pre-wrap',
                }}
              >
                {isJson(msg.text) ? (
                  <Box
                    component="pre"
                    sx={{
                      margin: 0,
                      fontFamily: 'monospace',
                      maxHeight: '200px', // 設置最大高度
                      overflowY: 'auto', // 垂直滾動條
                      backgroundColor: '#333', // 可選：設置背景色以區分 JSON 區域
                      padding: '8px', // 可選：增加內邊距
                      borderRadius: '4px', // 可選：增加圓角
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
          <Typography color="gray">請選擇一個對話</Typography>
        )}
      </Box>

      <ChatInput onSendMessage={onSendMessage} mode={mode} /> {/* 傳遞 mode */}
    </Box>
  );
}

export default ChatWindow;
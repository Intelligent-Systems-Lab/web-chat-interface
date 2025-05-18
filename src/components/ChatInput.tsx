import { Box, TextField, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useState } from 'react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

function ChatInput({ onSendMessage }: ChatInputProps) {
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (message.trim()) {
      onSendMessage(message)
      setMessage(''); // 清空輸入框
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSendMessage(); // 按下 Enter 時發送訊息
    }
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      p={2}
      bgcolor="#121212"
      sx={{
        borderRadius: '16px',
        height: '5%',
        width: '100%',
        maxWidth: '800px',
        margin: '0 auto',
        marginBottom: '20px',
      }}
    >
      <TextField
        variant="outlined"
        placeholder="輸入訊息"
        fullWidth
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        sx={{
          color: 'white',
          backgroundColor: '#444',
          borderRadius: '8px',
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              border: 'none',
            },
            '&:hover fieldset': {
              border: 'none',
            },
            '&.Mui-focused fieldset': {
              border: 'none',
            },
          },
          '& .MuiInputBase-input': {
            color: 'white',
          },
        }}
      />
      <Button
        variant="contained"
        color="primary"
        disableRipple
        onClick={handleSendMessage}
        sx={{
          marginLeft: '8px',
          height: '100%',
          width: '50px',
          minWidth: '0px',
          minHeight: '0px',
          borderRadius: '20%',
          backgroundColor: 'white',
          color: 'black',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          '&:hover': {
            backgroundColor: '#A2A6A7',
          },
        }}
      >
        <SendIcon />
      </Button>
    </Box>
  );
}

export default ChatInput;
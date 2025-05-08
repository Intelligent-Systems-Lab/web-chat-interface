import { Box, Typography, TextField, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

interface ChatWindowProps {
  sessionId: string | null;
}

function ChatWindow({ sessionId }: ChatWindowProps) {
    const handleSendMessage = () => {
      // 在這裡處理發送訊息的邏輯
      console.log('訊息已發送');
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        handleSendMessage(); // 按下 Enter 時發送訊息
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
        width="100%"        // 新增，設定聊天窗口的寬度
      >
        {/* Chat content area */}
        <Box flex="1" p={2} overflow="auto" >
          {sessionId ? (
            <Typography>顯示對話內容（Session: {sessionId}）</Typography>
          ) : (
            <Typography color="gray">請選擇一個對話</Typography>
          )}
        </Box>
  
        {/* Input area */}
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          p={2}
          bgcolor="#121212"
          sx={{
            borderRadius: '16px', // 圓弧邊角
            height: '5%',       // 固定高度
            width: '100%',         // 設定寬度為 90%（可調整）
            maxWidth: '800px',    // 最大寬度為 800px
            margin: '0 auto',     // 水平置中
            marginBottom: '20px', // 底部邊距
          }}
        >
          <TextField
            variant="outlined"
            placeholder="輸入訊息"
            fullWidth
            onKeyDown={handleKeyDown} // 監聽鍵盤事件
            sx={{
              color: 'white', // 文字顏色
              backgroundColor: '#444', // 輸入框背景顏色
              borderRadius: '8px', // 圓弧邊角
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  border: 'none', // 預設邊框顏色
                },
                '&:hover fieldset': {
                  border: 'none', // 滑鼠懸停時的邊框顏色
                },
                '&.Mui-focused fieldset': {
                  border: 'none', // 移除藍色，設定為自定義顏色
                },
              },
              '& .MuiInputBase-input': {
                color: 'white', // 確保輸入文字顏色為白色
              },
            }}  
          />
          <Button
            variant="contained"
            color="primary"
            disableRipple 
            onClick={handleSendMessage} // 點擊按鈕發送訊息
            sx={{
              marginLeft: '8px',
              height: '100%',         // 固定按鈕高度
              width: '50px',          // 設定按鈕寬度與高度相等，形成圓形
              minWidth: '0px',        // 移除最小寬度限制
              minHeight: '0px',       // 移除最小高度限制
              borderRadius: '20%', 
              backgroundColor: 'white', // 按鈕背景顏色改為白色
              color: 'black',         // 按鈕文字顏色改為黑色
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
      </Box>
    );
  }
export default ChatWindow;
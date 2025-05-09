import { useState } from 'react';
import SessionSidebar from './components/SessionSideBar';
import SessionSetting from './components/SessionSetting';
import ChatWindow from './components/ChatWindow';
import { Box } from '@mui/material';

function ChatPage() {
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [sessionIsOpen, setSessionIsOpen] = useState(true);
  const [sessionMessages, setSessionMessages] = useState<Record<string, { id: number; sender: string; text: string }[]>>({});
  const [sessionSettingIsOpen, setSettingSessionIsOpen] = useState(true);

  const handleSessionSidebar = () => {
    setSessionIsOpen(!sessionIsOpen);
  };

  const handleSessionSetting = () => {
    setSettingSessionIsOpen(!sessionSettingIsOpen);
  };

  const handleSendMessage = (message: string) => {
    if (!activeSessionId) return;

    setSessionMessages((prevMessages) => ({
      ...prevMessages,
      [activeSessionId]: [
        ...(prevMessages[activeSessionId] || []),
        { id: (prevMessages[activeSessionId]?.length || 0) + 1, sender: 'user', text: message },
      ],
    }));

    // 模擬機器人回應
    setTimeout(() => {
      setSessionMessages((prevMessages) => ({
        ...prevMessages,
        [activeSessionId]: [
          ...(prevMessages[activeSessionId] || []),
          { id: (prevMessages[activeSessionId]?.length || 0) + 1, sender: 'bot', text: '請調整右上方設定後再開始對話' },
        ],
      }));
    }, 200); // 延遲 0.2 秒
  };

  const sidebarWidth = sessionIsOpen ? 300 : 0;
  const settingWidth = sessionSettingIsOpen ? 300 : 0;

  return (
    <Box display="flex" height="100vh">
      <Box
        width={sidebarWidth}
        bgcolor='#212121'
        sx={{ transition: 'width 0.3s' }} // 平滑過渡效果
      >
        <SessionSidebar
          activeSessionId={activeSessionId}
          onSelectSession={setActiveSessionId}
          isOpen={sessionIsOpen}
          onToggleSidebar={handleSessionSidebar} // 傳遞控制函式
        />
      </Box>

      <Box 
        flex="1" 
        sx={{ 
          transition: 'margin 0.3s', 
          border: 'none',
        }}
      > 
        <ChatWindow
          sessionId={activeSessionId}
          messages={activeSessionId ? sessionMessages[activeSessionId] || [] : []}
          onSendMessage={handleSendMessage}
        />
      </Box>

      <Box
        width={settingWidth}
        bgcolor='#212121'
        sx={{ transition: 'width 0.3s' }} // 平滑過渡效果
      >
        <SessionSetting
          isOpen={sessionSettingIsOpen}
          onToggleSidebar={handleSessionSetting} // 傳遞控制函式
        />
      </Box>

    </Box>
  );
}

export default ChatPage;
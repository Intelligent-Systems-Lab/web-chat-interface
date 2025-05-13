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
  const [sessionModes, setSessionModes] = useState<Record<string, string>>({}); // 新增狀態來保存每個 session 的 mode
  const [sessionParams, setSessionParams] = useState<Record<string, Record<string, any>>>({}); // 新增狀態來保存參數

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
    const currentMode = sessionModes[activeSessionId] || 'openai'; // 獲取當前 session 的 mode
    const currentParams = sessionParams[activeSessionId] || {};
    const botResponse = `模式: ${currentMode}, 參數: ${JSON.stringify(currentParams)}`;

    setTimeout(() => {
      setSessionMessages((prevMessages) => ({
        ...prevMessages,
        [activeSessionId]: [
          ...(prevMessages[activeSessionId] || []),
          { id: (prevMessages[activeSessionId]?.length || 0) + 1, sender: 'bot', text: botResponse },
        ],
      }));
    }, 200); // 延遲 0.2 秒
  };

  const handleModeChange = (mode: string) => {
    if (!activeSessionId) return;

    setSessionModes((prevModes) => ({
      ...prevModes,
      [activeSessionId]: mode,
    }));
  };

  const handleParamsChange = (params: Record<string, any>) => {
    if (!activeSessionId) return;

    setSessionParams((prevParams) => ({
      ...prevParams,
      [activeSessionId]: params,
    }));
  };

  const sidebarWidth = sessionIsOpen ? 300 : 0;
  const settingWidth = sessionSettingIsOpen ? 500 : 0;

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
          mode={activeSessionId ? sessionModes[activeSessionId] || 'openai' : 'openai'} // 傳遞 mode
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
          mode={activeSessionId ? sessionModes[activeSessionId] || 'openai' : 'openai'} // 傳遞當前 session 的 mode
          onModeChange={handleModeChange} // 傳遞 mode 更新函式
          onParamsChange={handleParamsChange} // 傳遞參數更新函式
          params={activeSessionId ? sessionParams[activeSessionId] || {} : {}} // 傳遞當前參數
        />
      </Box>

    </Box>
  );
}

export default ChatPage;
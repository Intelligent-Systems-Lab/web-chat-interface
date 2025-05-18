import { useState } from 'react';
import SessionSidebar, {sessionSideBarWidth} from './components/SessionSideBar';
import SessionSetting, { sessionSettingWidth } from './components/SessionSetting';
import ChatWindow from './components/ChatWindow';
import { sendMessage } from './utils/sendMessage';
import { Box } from '@mui/material';

function ChatPage() {
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [sessionIsOpen, setSessionIsOpen] = useState(true);
  const [sessionMessages, setSessionMessages] = useState<Record<string, { id: number; sender: string; text: string }[]>>({});
  const [sessionSettingIsOpen, setSettingSessionIsOpen] = useState(true);
  const [sessionModes, setSessionModes] = useState<Record<string, string>>({});
  const [sessionParams, setSessionParams] = useState<Record<string, Record<string, any>>>({});

  const handleSessionSidebar = () => {
    setSessionIsOpen(!sessionIsOpen);
  };

  const handleSessionSetting = () => {
    setSettingSessionIsOpen(!sessionSettingIsOpen);
  };

  const handleSendMessage = async (message: string) => {
  if (!activeSessionId) return;

    setSessionMessages((prevMessages) => ({
      ...prevMessages,
      [activeSessionId]: [
        ...(prevMessages[activeSessionId] || []),
        { id: (prevMessages[activeSessionId]?.length || 0) + 1, sender: 'user', text: message },
      ],
    }));

    const currentMode = sessionModes[activeSessionId] || 'openai';
    const currentParams = sessionParams[activeSessionId] || {};
    const botResponse = await sendMessage({
      mode: currentMode,
      params: currentParams,
      message,
    });

    setSessionMessages((prevMessages) => ({
      ...prevMessages,
      [activeSessionId]: [
        ...(prevMessages[activeSessionId] || []),
        { id: (prevMessages[activeSessionId]?.length || 0) + 1, sender: 'bot', text: botResponse },
      ],
    }));
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
      [activeSessionId]: {
        ...prevParams[activeSessionId],
        ...params,
      },
    }));

    // 如果 params 中包含新的 sessionId，更新 activeSessionId
    if (params.sessionId) {
      setActiveSessionId(params.sessionId);
    }
  };

  const sidebarWidth = sessionIsOpen ? sessionSideBarWidth : 0;
  const settingWidth = sessionSettingIsOpen ? sessionSettingWidth : 0;
  
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
          onToggleSidebar={handleSessionSetting}
          mode={activeSessionId ? sessionModes[activeSessionId] || 'openai' : 'openai'}
          onModeChange={handleModeChange}
          onParamsChange={handleParamsChange}
          params={activeSessionId ? sessionParams[activeSessionId] || {} : {}}
          sessionId={activeSessionId || ''} // 傳遞 sessionId
          sessionName={activeSessionId ? `Session ${activeSessionId}` : 'Default Session'} // 傳遞 sessionName
        />
      </Box>

    </Box>
  );
}

export default ChatPage;
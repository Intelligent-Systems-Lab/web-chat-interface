import { useState, useEffect } from 'react';
import SessionSidebar, {sessionSideBarWidth} from './components/SessionSideBar';
import SessionSetting, { sessionSettingWidth } from './components/SessionSetting';
import ChatWindow from './components/ChatWindow';
import { sendMessage } from './utils/sendMessage';
import { Box } from '@mui/material';
import api from './api/axios';

export interface ChatSession {
  id: string;
  title: string;
  mode: string;
  params: Record<string, any>;
};

function ChatPage() {
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [sessionIsOpen, setSessionIsOpen] = useState(true);
  const [sessionMessages, setSessionMessages] = useState<Record<string, { id: number; sender: string; text: string }[]>>({});
  const [sessionSettingIsOpen, setSettingSessionIsOpen] = useState(true);
  const [testChatSessions, setTestChatSessions] = useState<ChatSession[]>([]);

  useEffect(() => {
    const fetchChatSessions = async () => {
      try {
        const response = await api.get('/session-settings');
        setTestChatSessions(response.data);
      } catch (error) {
        console.error('載入 session-settings 時發生錯誤:', error);
      }
    };

    fetchChatSessions();
  }, []);

  const handleSessionSidebar = () => {
    setSessionIsOpen(!sessionIsOpen);
  };

  const handleSessionSetting = () => {
    setSettingSessionIsOpen(!sessionSettingIsOpen);
  };

  const handleAddSession = () => {
    const newSession = {
      id: crypto.randomUUID(),
      title: `新對話`,
    };
    setTestChatSessions((prevSessions) => [
      ...prevSessions,
      { id: newSession.id, title: newSession.title, mode: '', params: {} },
    ]);
    setActiveSessionId(newSession.id); 
  };

  const handleEditSession = (id: string, newTitle: string) => {
    setTestChatSessions((prevSessions) =>
      prevSessions.map((session) =>
        session.id === id ? { ...session, title: newTitle } : session
      )
    );
  };

  const handleDeleteSession = async (id: string) => {
    try {
      await api.delete(`/session-settings/${id}`);
      
      setTestChatSessions((prevSessions) => prevSessions.filter((session) => session.id !== id));
      if (activeSessionId === id) {
        setActiveSessionId(null); 
      }
    } catch (error) {
      console.error('刪除 session 時發生錯誤:', error);
    }
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

    const currentSession = testChatSessions.find((session) => session.id === activeSessionId);
    const currentMode = currentSession?.mode || '';
    const currentParams = currentSession?.params || {};
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

    setTestChatSessions((prevSessions) =>
      prevSessions.map((session) =>
        session.id === activeSessionId ? { ...session, mode } : session
      )
    );
  };

  const handleParamsChange = (params: Record<string, any>) => {
    if (!activeSessionId) return;
    setTestChatSessions((prevSessions) =>
      prevSessions.map((session) =>
        session.id === activeSessionId ? { ...session, params } : session
      )
    );
  };

  const sidebarWidth = sessionIsOpen ? sessionSideBarWidth : 0;
  const settingWidth = sessionSettingIsOpen ? sessionSettingWidth : 0;
  
  return (
    <Box display="flex" height="100vh">
      <Box
        width={sidebarWidth}
        bgcolor='#212121'
        sx={{ transition: 'width 0.3s' }}
      >
        <SessionSidebar
          activeSessionId={activeSessionId}
          onSelectSession={setActiveSessionId}
          isOpen={sessionIsOpen}
          onToggleSidebar={handleSessionSidebar}
          chatSessions={testChatSessions}
          onAddSession={handleAddSession}
          onEditSession={handleEditSession}
          onDeleteSession={handleDeleteSession}
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
        sx={{ transition: 'width 0.3s' }} 
      >
        <SessionSetting
          isOpen={sessionSettingIsOpen}
          onToggleSidebar={handleSessionSetting}
          onModeChange={handleModeChange}
          onParamsChange={handleParamsChange}
          sessionId={activeSessionId || ''}
          setActiveSessionId={setActiveSessionId}
          testChatSessions={testChatSessions}
          setTestChatSessions={setTestChatSessions}
        />
      </Box>

    </Box>
  );
}

export default ChatPage;
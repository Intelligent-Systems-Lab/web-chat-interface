import { useState, useEffect } from 'react';
import SessionSidebar, {sessionSideBarWidth} from './components/SessionSideBar';
import SessionSetting, { sessionSettingWidth } from './components/SessionSetting';
import ChatWindow from './components/ChatWindow';
import { sendMessage } from './utils/sendMessage';
import { Box } from '@mui/material';

interface ChatSession {
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
  const [sessionModes, setSessionModes] = useState<Record<string, string>>({});
  const [sessionParams, setSessionParams] = useState<Record<string, Record<string, any>>>({});
  const [chatSessions, setChatSessions] = useState<{ id: string; title: string }[]>([]);
  const [testChatSessions, setTestChatSessions] = useState<ChatSession[]>([]);

  useEffect(() => {
    console.log('-----------------------------')
    console.log('chatSessions:', chatSessions);
    console.log('sessionParams:', sessionParams);
    console.log('sessionModes:', sessionModes);
    console.log('testChatSessions:', testChatSessions);
  }, [chatSessions, sessionParams, sessionModes]);

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
    //del
    setChatSessions((prevSessions) => [...prevSessions, newSession]);
    
    setTestChatSessions((prevSessions) => [
      ...prevSessions,
      { id: newSession.id, title: newSession.title, mode: '', params: {} },
    ]);
    setActiveSessionId(newSession.id); 
  };

  const handleEditSession = (id: string, newTitle: string) => {
    //del
    setChatSessions((prevSessions) =>
      prevSessions.map((session) =>
        session.id === id ? { ...session, title: newTitle } : session
      )
    );

    setTestChatSessions((prevSessions) =>
      prevSessions.map((session) =>
        session.id === id ? { ...session, title: newTitle } : session
      )
    );
  };

  const handleDeleteSession = (id: string) => {
    //del
    setChatSessions((prevSessions) => prevSessions.filter((session) => session.id !== id));

    setTestChatSessions((prevSessions) => prevSessions.filter((session) => session.id !== id));
    if (activeSessionId === id) {
      setActiveSessionId(null); 
    }
    //TODO: api 刪除
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
        sx={{ transition: 'width 0.3s' }}
      >
        <SessionSidebar
          activeSessionId={activeSessionId}
          onSelectSession={setActiveSessionId}
          isOpen={sessionIsOpen}
          onToggleSidebar={handleSessionSidebar}
          chatSessions={chatSessions} // 改成 testChatSessions
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
          mode={activeSessionId ? sessionModes[activeSessionId] || 'openai' : 'openai'}
          onModeChange={handleModeChange}
          onParamsChange={handleParamsChange}
          params={activeSessionId ? sessionParams[activeSessionId] || {} : {}}
          sessionId={activeSessionId || ''} 
          sessionName={
            activeSessionId 
              ? chatSessions.find((session) => session.id === activeSessionId)?.title || `Session ${activeSessionId}` 
              : 'Default Session'}
          setChatSessions={setChatSessions}
          setActiveSessionId={setActiveSessionId}
          setSessionParams={setSessionParams}
          setSessionModes={setSessionModes}
        />
      </Box>

    </Box>
  );
}

export default ChatPage;
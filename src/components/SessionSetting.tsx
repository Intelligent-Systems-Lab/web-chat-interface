import { useState, useEffect } from 'react';
import { Drawer, List, Box, IconButton, Button } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import BotModeSelector from './session_setting/BotModeSelect';
import ModeContent from './session_setting/ModeContent';
import api from '../api/axios';
import type { ChatSession } from '../App'

export const sessionSettingWidth = 500;

interface SettingProps {
  isOpen: boolean;
  onToggleSidebar: () => void;
  onModeChange: (mode: string) => void;
  onParamsChange: (params: Record<string, any>) => void;
  sessionId: string; 
  setActiveSessionId: (session_id:string) => void;testChatSessions: ChatSession[];
  setTestChatSessions: React.Dispatch<React.SetStateAction<ChatSession[]>>;
}

function SessionSetting({
    isOpen, 
    onToggleSidebar, 
    onModeChange, 
    onParamsChange, 
    sessionId,
    setActiveSessionId,
    testChatSessions,
    setTestChatSessions
  }: SettingProps) {
  
  const sessionData = testChatSessions.find((session) => session.id === sessionId);
  const [localTitle, setLocalTitle] = useState<string>(sessionData?.title || '新對話');
  const [localMode, setLocalMode] = useState<string>(sessionData?.mode || '');
  const [localParams, setLocalParams] = useState<Record<string, any>>(sessionData?.params || {});

  useEffect(() => {
    const updatedSessionData = testChatSessions.find((session) => session.id === sessionId);
    setLocalTitle(updatedSessionData?.title || '新對話');
    setLocalMode(updatedSessionData?.mode || '');
    setLocalParams(updatedSessionData?.params || {});
  }, [sessionId, testChatSessions]);

  const replaceSessionId = (oldId: string, newId: string) => {
    if (oldId === newId) {
      return;
    }
    setTestChatSessions((prevSessions) => {
      const session = prevSessions.find(s => s.id === oldId);
      if (session) {
        session.id = newId;
      }
      return [...prevSessions];
    });
  };

  const handleSaveSettings = async () => {

    onModeChange(localMode);
    onParamsChange(localParams);

    try {
      const payload = {
        id: sessionId,
        mode: localMode,
        title: localTitle,
        params: localParams,
      };
      const response = await api.post('/session-settings', payload);
      replaceSessionId(sessionId, response.data.id);
      setActiveSessionId(response.data.id);
      alert(`設定已保存！當前模式為: ${localMode}`);
    } catch (error) {
      console.error('保存設定時發生錯誤:', error);
      alert('保存設定失敗，請稍後再試。');
    }
  };

  const handleModeChange = (newMode: string) => {
    setLocalMode(newMode);
    const oldData = testChatSessions.find((session) => session.id === sessionId);
    if (newMode === oldData?.mode) {
      setLocalParams(oldData.params);
    } else {
      setLocalParams({});
    }
  };
    
  return (
    <>
      <Drawer
        variant="persistent"
        anchor="right"
        open={isOpen}
        sx={{
          width: sessionSettingWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: sessionSettingWidth,
            boxSizing: 'border-box',
            backgroundColor: '#393B3B',
            transition: 'transform 0.5s ease',
            transform: isOpen ? 'translateX(0)' : `translateX(-${sessionSettingWidth}px)`,
          },
        }}
      >
        <Box
          sx={{
            height: '60px',
            borderBottom: '0.5px solid #737576',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: '0 8px',
          }}
        >
          <IconButton
            onClick={onToggleSidebar}
            disableRipple
            sx={{
              color: '#FFFFFF',
              borderRadius: '8px',
              '&:hover': { backgroundColor: '#505252' },
            }}
          >
            <SettingsIcon />
          </IconButton>
        </Box>
        <Box
          sx={{
            padding: '16px',
            borderBottom: '0.5px solid #737576',
          }}
        >
          {/* 傳遞本地狀態的更新函式 */}
          <BotModeSelector onModeChange={handleModeChange} mode={localMode} />
        </Box>
        <ModeContent
          mode={localMode}
          onParamsChange={setLocalParams}
          params={localParams}
        />
        <Box
          sx={{
            padding: '16px',
            display: 'flex',
            justifyContent: 'center',
            borderTop: '0.5px solid #737576',
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveSettings}
            sx={{
              backgroundColor: '#505252',
              '&:hover': {
                backgroundColor: '#737576',
              },
            }}
          >
            保存設定
          </Button>
        </Box>
        <List></List>
      </Drawer>
      {!isOpen && (
        <IconButton
          onClick={onToggleSidebar}
          disableRipple
          sx={{
            position: 'fixed',
            top: '16px',
            right: '16px',
            color: '#FFFFFF',
            backgroundColor: '#393B3B',
            borderRadius: '8px',
            '&:hover': {
              backgroundColor: '#505252',
            },
          }}
        >
          <SettingsIcon />
        </IconButton>
      )}
    </>
  );
}

export default SessionSetting;
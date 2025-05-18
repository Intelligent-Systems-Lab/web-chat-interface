import { useState, useEffect } from 'react';
import { Drawer, List, Box, IconButton, Button } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import BotModeSelector from './session_setting/BotModeSelect';
import ModeContent from './session_setting/ModeContent';
import api from '../api/axios';

export const sessionSettingWidth = 500;

interface SettingProps {
  isOpen: boolean;
  onToggleSidebar: () => void;
  mode: string;
  onModeChange: (mode: string) => void;
  onParamsChange: (params: Record<string, any>) => void;
  params: Record<string, any>;
  sessionId: string; 
  sessionName: string; 
}

function SessionSetting({ isOpen, onToggleSidebar, mode, onModeChange, onParamsChange, params, sessionId, sessionName }: SettingProps) {
  
  const [localMode, setLocalMode] = useState<string>(mode);
  const [localParams, setLocalParams] = useState<Record<string, any>>(params);

  useEffect(() => {
    setLocalMode(mode);
    setLocalParams(params);
  }, [mode, params]);
  
  const handleSaveSettings = async () => {
    console.log('session id:', sessionId);
    console.log('session name:', sessionName);

    onModeChange(localMode);
    onParamsChange(localParams);

    try {
      const payload = {
        mode: localMode,
        name: sessionName,
        params: localParams,
      };
      const response = await api.post('/session-settings', payload);
      console.log('設定已保存:', response.data);

      alert(`設定已保存！當前模式為: ${localMode}`);
    } catch (error) {
      console.error('保存設定時發生錯誤:', error);
      alert('保存設定失敗，請稍後再試。');
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
          <BotModeSelector onModeChange={setLocalMode} mode={localMode} />
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
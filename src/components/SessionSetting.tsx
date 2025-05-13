import { useState, useEffect } from 'react';
import { Drawer, List, Box, IconButton, Button } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import BotModeSelector from './session_setting/BotModeSelect';
import ModeContent from './session_setting/ModeContent';

const drawerWidth = 500;

interface SettingProps {
  isOpen: boolean;
  onToggleSidebar: () => void;
  mode: string; // 接收當前 session 的 mode
  onModeChange: (mode: string) => void; // 更新 mode 的函式
  onParamsChange: (params: Record<string, any>) => void; // 新增參數更新函式
  params: Record<string, any>; // 接收當前參數
}

function SessionSetting({ isOpen, onToggleSidebar, mode, onModeChange, onParamsChange, params }: SettingProps) {
  
  const [localMode, setLocalMode] = useState<string>(mode);
  const [localParams, setLocalParams] = useState<Record<string, any>>(params);

  // 當父元件的 mode 或 params 改變時，同步更新本地狀態
  useEffect(() => {
    setLocalMode(mode);
    setLocalParams(params);
  }, [mode, params]);
  
  const handleSaveSettings = () => {
    onModeChange(localMode);
    onParamsChange(localParams);
    alert(`設定已保存！當前模式為: ${localMode}`);
  };
  
  return (
    <>
      <Drawer
        variant="persistent"
        anchor="right"
        open={isOpen}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#393B3B',
            transition: 'transform 0.5s ease',
            transform: isOpen ? 'translateX(0)' : `translateX(-${drawerWidth}px)`,
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
          onParamsChange={setLocalParams} // 傳遞本地狀態的更新函式
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
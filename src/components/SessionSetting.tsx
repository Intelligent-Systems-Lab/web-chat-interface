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
}

function SessionSetting({ isOpen, onToggleSidebar, mode, onModeChange }: SettingProps) {
  const handleSaveSettings = () => {
    console.log('保存設定:', mode); // 這裡可以替換為實際的保存邏輯
    alert(`設定已保存！當前模式為: ${mode}`);
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
          <BotModeSelector onModeChange={onModeChange} />
        </Box>
        <ModeContent mode={mode} />
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
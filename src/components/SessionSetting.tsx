import { Drawer, List, Box, IconButton } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';

const drawerWidth = 300;

interface SettingProps {
    isOpen: boolean; // 新增 isOpen 作為 props
    onToggleSidebar: () => void; // 用來控制 Sidebar 開關
}

function SessionSetting({ isOpen, onToggleSidebar }: SettingProps) {

  return (
    <>
      {/* Sidebar */}
      <Drawer
        variant="persistent" // 使用 persistent 以便控制開關
        anchor="right"
        open={isOpen} // 根據 props 控制是否展開
        sx={{
          width: drawerWidth, // 固定寬度
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#393B3B',
            transition: 'transform 0.5s ease', // 調整滑動動畫的持續時間
            transform: isOpen ? 'translateX(0)' : `translateX(-${drawerWidth}px)`, // 控制滑動
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
              '&:hover': {backgroundColor: '#505252',}, 
            }}>
            <SettingsIcon/>
          </IconButton>

        </Box>

        <List>
        </List>

      </Drawer>
      {/* 主畫面上的按鈕 */}
      {!isOpen && (
        <IconButton
          onClick={onToggleSidebar}
          disableRipple 
          sx={{
            position: 'fixed', // 固定位置
            top: '16px', // 距離頂部 16px
            right: '16px', // 距離左側 16px
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
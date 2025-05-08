import { Drawer, List, ListItem, Box, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu'; // 引入 MenuIcon
import SessionItem from './SessionItem';
import EditSquareIcon from '@mui/icons-material/EditSquare';
import { useState } from 'react';

const drawerWidth = 300;

interface SidebarProps {
    activeSessionId: string | null;
    onSelectSession: (id: string) => void;
    isOpen: boolean; // 新增 isOpen 作為 props
    onToggleSidebar: () => void; // 用來控制 Sidebar 開關
}

function Sidebar({ activeSessionId, onSelectSession, isOpen, onToggleSidebar }: SidebarProps) {
  const [sessions, setSessions] = useState<{ id: string; title: string }[]>([]);
  
  const handleAddSession = () => {
    const newSession = {
      id: (sessions.length + 1).toString(), // 動態生成 ID
      title: `對話 ${sessions.length + 1}`, // 動態生成標題
    };
    setSessions([...sessions, newSession]); // 更新 sessions 狀態
  };

  return (
    <>
      {/* Sidebar */}
      <Drawer
        variant="persistent" // 使用 persistent 以便控制開關
        anchor="left"
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
            justifyContent: 'space-between',
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
            <MenuIcon />
          </IconButton>

          {/* 新增按鈕 */}
          <IconButton
            onClick={handleAddSession}
            disableRipple
            sx={{
              color: '#FFFFFF',
              borderRadius: '8px',
              '&:hover': { backgroundColor: '#505252' },
            }}
          >
            <EditSquareIcon />
          </IconButton>

        </Box>

        <List>
            {sessions.map((s) => (
                <ListItem
                    key={s.id}
                    disablePadding // 移除內邊距
                    sx={{
                        '&:hover': {
                        backgroundColor: '#505252', // 滑過時的背景色
                        },
                    }}
                >
                    <SessionItem
                        sessionId={s.id}
                        title={s.title}
                        active={s.id === activeSessionId}
                        onClick={onSelectSession}
                    />
                </ListItem>
            ))}
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
            left: '16px', // 距離左側 16px
            color: '#FFFFFF',
            backgroundColor: '#393B3B',
            borderRadius: '8px', 
            '&:hover': {
              backgroundColor: '#505252',
            },
          }}
        >
          <MenuIcon />
        </IconButton>
      )}
    </>
  );
}

export default Sidebar;
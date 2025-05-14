import { Drawer, List, ListItem, Box, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu'; // 引入 MenuIcon
import DeleteIcon from '@mui/icons-material/Delete'; // 引入刪除圖示
import EditIcon from '@mui/icons-material/Edit'; // 引入編輯圖示
import SessionItem from './SessionItem';
import DeleteSession from './DeleteSession'; // 引入刪除對話的組件
import EditSquareIcon from '@mui/icons-material/EditSquare';
import { useState, useEffect } from 'react';

export const sessionSideBarWidth = 300;

interface SidebarProps {
    activeSessionId: string | null;
    onSelectSession: (id: string) => void;
    isOpen: boolean; // 新增 isOpen 作為 props
    onToggleSidebar: () => void; // 用來控制 Sidebar 開關
}

function SessionSidebar({ activeSessionId, onSelectSession, isOpen, onToggleSidebar }: SidebarProps) {
  const [chatSessions, setSessions] = useState<{ id: string; title: string }[]>([]);
  const [editingSessionId, setEditingSessionId] = useState<string | null>(null); // 用來追蹤正在編輯的 session
  const [newTitle, setNewTitle] = useState<string>(''); // 用來暫存新的標題
  const [deleteSessionId, setDeleteSessionId] = useState<string | null>(null); // 用來追蹤要刪除的 session ID
  const [isDialogOpen, setDialogOpen] = useState(false); // 控制 Dialog 開關

  // 初始化時從 localStorage 讀取 sessions
  useEffect(() => {
    const savedSessions = localStorage.getItem('chatSessions');
    if (savedSessions) {
      try {
        setSessions(JSON.parse(savedSessions)); // 確保 JSON 格式正確
      } catch (error) {
        console.error('Failed to parse chatSessions from localStorage:', error);
      }
    }
  }, []);

  // 每次 sessions 更新時，同步到 localStorage
  useEffect(() => {
    console.log('Updating localStorage with sessions:', chatSessions);
    localStorage.setItem('chatSessions', JSON.stringify(chatSessions));
  }, [chatSessions]);

  const handleAddSession = () => {
    const newSession = {
      id: (chatSessions.length + 1).toString(), // 動態生成 ID
      title: `對話 ${chatSessions.length + 1}`, // 動態生成標題
    };
    setSessions([...chatSessions, newSession]); // 更新 sessions 狀態
  };

  const handleEditSession = (id: string) => {
    const session = chatSessions.find((s) => s.id === id);
    if (session) {
      setEditingSessionId(id); // 設置正在編輯的 session ID
      setNewTitle(session.title); // 初始化新的標題
    }
  };

  const handleSaveSessionTitle = () => {
    setSessions((prevSessions) =>
      prevSessions.map((session) =>
        session.id === editingSessionId ? { ...session, title: newTitle } : session
      )
    );
    setEditingSessionId(null); // 清除編輯狀態
    setNewTitle(''); // 清空暫存的標題
  };

  const handleDeleteSession = (id: string) => {
    setDeleteSessionId(id); // 設置要刪除的 session ID
    setDialogOpen(true); // 打開確認視窗
  };

  const confirmDeleteSession = () => {
    if (deleteSessionId) {
      const updatedSessions = chatSessions.filter((session) => session.id !== deleteSessionId);
      setSessions(updatedSessions);
    }
    setDialogOpen(false); // 關閉確認視窗
    setDeleteSessionId(null); // 清除刪除的 session ID
  };

  const cancelDeleteSession = () => {
    setDialogOpen(false); // 關閉確認視窗
    setDeleteSessionId(null); // 清除刪除的 session ID
  };

  return (
    <>
      {/* Sidebar */}
      <Drawer
        variant="persistent" // 使用 persistent 以便控制開關
        anchor="left"
        open={isOpen} // 根據 props 控制是否展開
        sx={{
          width: sessionSideBarWidth, // 固定寬度
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: sessionSideBarWidth,
            boxSizing: 'border-box',
            backgroundColor: '#393B3B',
            transition: 'transform 0.5s ease', // 調整滑動動畫的持續時間
            transform: isOpen ? 'translateX(0)' : `translateX(-${sessionSideBarWidth}px)`, // 控制滑動
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
            {chatSessions.map((s) => (
                <ListItem
                    key={s.id}
                    disablePadding // 移除內邊距
                    sx={{
                        '&:hover': {
                        backgroundColor: '#505252', // 滑過時的背景色
                        },
                    }}
                >
                    {editingSessionId === s.id ? (
                      // 顯示編輯輸入框
                      <input
                        type="text"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        onBlur={handleSaveSessionTitle} // 當輸入框失去焦點時保存
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            handleSaveSessionTitle(); // 按下 Enter 鍵時保存
                          }
                        }}
                        style={{
                          flex: 1,
                          padding: '8px',
                          borderRadius: '4px',
                          border: '1px solid #ccc',
                        }}
                      />
                    ) : (
                      <SessionItem
                          sessionId={s.id}
                          title={s.title}
                          active={s.id === activeSessionId}
                          onClick={onSelectSession}
                      />
                    )}
                    <IconButton
                      onClick={() => handleEditSession(s.id)} // 編輯按鈕的點擊事件
                      disableRipple
                      sx={{
                        color: '#FFFFFF',
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                        onClick={() => handleDeleteSession(s.id)} // 刪除按鈕的點擊事件
                        disableRipple
                        sx={{
                          color: '#FFFFFF',
                        }}
                    >
                        <DeleteIcon />
                    </IconButton>
                </ListItem>
            ))}
        </List>
      </Drawer>
      {/* 確認刪除的 Dialog */}
      <DeleteSession
        isOpen={isDialogOpen}
        onClose={cancelDeleteSession}
        onConfirm={confirmDeleteSession}
      />

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

export default SessionSidebar;
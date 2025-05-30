import { Drawer, List, ListItem, Box, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SessionItem from './SessionItem';
import EditSquareIcon from '@mui/icons-material/EditSquare';
import { useState } from 'react';

export const sessionSideBarWidth = 300;

interface SidebarProps {
  activeSessionId: string | null;
  onSelectSession: (id: string) => void;
  isOpen: boolean;
  onToggleSidebar: () => void;
  chatSessions: { id: string; title: string }[];
  onAddSession: () => void;
  onEditSession: (id: string, newTitle: string) => void;
  onDeleteSession: (id: string) => void;
}

function SessionSidebar({
  activeSessionId,
  onSelectSession,
  isOpen,
  onToggleSidebar,
  chatSessions,
  onAddSession,
  onEditSession,
  onDeleteSession,
}: SidebarProps) {
  const [editingSessionId, setEditingSessionId] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState<string>('');

  const handleSaveSessionTitle = () => {
    if (editingSessionId) {
      onEditSession(editingSessionId, newTitle);
      setEditingSessionId(null);
    }
  };

  return (
    <>
      <Drawer
        variant="persistent"
        anchor="left"
        open={isOpen}
        sx={{
          width: sessionSideBarWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: sessionSideBarWidth,
            boxSizing: 'border-box',
            backgroundColor: '#393B3B',
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
              '&:hover': { backgroundColor: '#505252' },
            }}
          >
            <MenuIcon />
          </IconButton>

          <IconButton
            onClick={onAddSession}
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

        <List sx={{ flexGrow: 1 }}>
          {chatSessions.map((s) => (
            <ListItem
              key={s.id}
              disablePadding
              sx={{
                '&:hover': {
                  backgroundColor: '#505252',
                },
              }}
            >
              {editingSessionId === s.id ? (
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  onBlur={handleSaveSessionTitle}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSaveSessionTitle();
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
                onClick={() => {
                  setEditingSessionId(s.id);
                  setNewTitle(s.title);
                }}
                disableRipple
                sx={{
                  color: '#FFFFFF',
                }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                onClick={() => onDeleteSession(s.id)}
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
        {/* 新增文字區塊 */}
        <Box
          sx={{
            padding: '16px',
            textAlign: 'center',
            color: '#FFFFFF',
            fontSize: '14px',
            borderTop: '0.5px solid #737576',
          }}
        >
          目前測試開發中，有可能會不穩定
          v1.0.0
        </Box>
      </Drawer>
      {!isOpen && (
        <IconButton
          onClick={onToggleSidebar}
          disableRipple
          sx={{
            position: 'fixed',
            top: '16px',
            left: '16px',
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
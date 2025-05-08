import { useState } from 'react';
import Sidebar from './components/SideBar';
import ChatWindow from './components/ChatWindow';
import { Box } from '@mui/material';

function ChatPage() {
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(true);
  const handleToggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const sidebarWidth = isOpen ? 300 : 0; // Drawer 寬度

  return (
    <Box display="flex" height="100vh">
      <Box
        width={sidebarWidth}
        bgcolor="gray"
        sx={{ transition: 'width 0.3s' }} // 平滑過渡效果
      >
        <Sidebar
          activeSessionId={activeSessionId}
          onSelectSession={setActiveSessionId}
          isOpen={isOpen}
          onToggleSidebar={handleToggleSidebar} // 傳遞控制函式
        />
      </Box>
      <Box flex="1" sx={{ transition: 'margin-left 0.3s', border: 'none' }}> {/* ChatWindow 動態調整 */}
        <ChatWindow sessionId={activeSessionId} />
      </Box>
    </Box>
  );
}

export default ChatPage;
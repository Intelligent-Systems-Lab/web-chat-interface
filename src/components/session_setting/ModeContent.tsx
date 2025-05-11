import { Box } from '@mui/material';
import OpenAIModeContent from './session_mode/OpenAIModeContent';
import ManualModeContent from './session_mode/ManualModeContent';

interface ModeContentProps {
  mode: string;
}

function ModeContent({ mode }: ModeContentProps) {
  const renderContent = () => {
    switch (mode) {
      case 'openai':
        return <OpenAIModeContent />;
      case 'manual':
        return <ManualModeContent />;
      default:
        return (
          <Box sx={{ color: '#FFFFFF' }}>
            請選擇一個模式
          </Box>
        );
    }
  };

  return (
    <Box
      sx={{
        padding: '16px',
        borderBottom: '0.5px solid #737576',
      }}
    >
      {renderContent()}
    </Box>
  );
}

export default ModeContent;
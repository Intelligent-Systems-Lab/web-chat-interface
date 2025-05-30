import { Box } from '@mui/material';
import OpenAIModeContent from './session_mode/OpenAIModeContent';
import CustomizeModeContent from './session_mode/CustomizeModeContent';
import OllamaModeContent from './session_mode/OllamaModeContent';

interface ModeContentProps {
  mode: string;
  onParamsChange: (params: Record<string, any>) => void;
  params: Record<string, any>;
  sessionId: string;
}

function ModeContent({ mode, onParamsChange, params, sessionId }: ModeContentProps) {
  const renderContent = () => {
    switch (mode) {
      case 'openai':
        return <OpenAIModeContent onParamsChange={onParamsChange} params={params} sessionId={sessionId}/>;
      case 'ollama':
        return <OllamaModeContent onParamsChange={onParamsChange} params={params} sessionId={sessionId}/>;
      case 'customize':
        return <CustomizeModeContent onParamsChange={onParamsChange} params={params} sessionId={sessionId}/>;
      
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
import { Box } from '@mui/material';
import OpenAIModeContent from './session_mode/OpenAIModeContent';
import CustomizeModeContent from './session_mode/CustomizeModeContent';

interface ModeContentProps {
  mode: string;
  onParamsChange: (params: Record<string, any>) => void;
  params: Record<string, any>;
}

function ModeContent({ mode, onParamsChange, params }: ModeContentProps) {
  const renderContent = () => {
    switch (mode) {
      case 'openai':
        return <OpenAIModeContent onParamsChange={onParamsChange} params={params}/>;
      case 'customize':
        return <CustomizeModeContent onParamsChange={onParamsChange} params={params}/>;
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
import { Box, Typography, TextField } from '@mui/material';
import { useState, useEffect } from 'react';

interface OpenAIModeContentProps {
  onParamsChange: (params: Record<string, any>) => void;
  params: Record<string, any>;
}

function OpenAIModeContent({ onParamsChange, params }: OpenAIModeContentProps) {
  const [temperature, setTemperature] = useState(params.temperature || 0.7);

  useEffect(() => {
    onParamsChange({ ...params, temperature });
  }, [temperature]);

  return (
    <Box>
      <Typography sx={{ color: '#FFFFFF', marginBottom: '8px' }}>
        OpenAI 模式的內容
      </Typography>
      <TextField
        label="Temperature"
        type="number"
        value={temperature}
        onChange={(e) => setTemperature(parseFloat(e.target.value))}
        sx={{
          color: '#FFFFFF',
          '.MuiInputBase-input': { color: '#FFFFFF' },
          '.MuiInputLabel-root': { color: '#FFFFFF' },
          '.MuiOutlinedInput-notchedOutline': { borderColor: '#737576' },
        }}
      />
    </Box>
  );
}

export default OpenAIModeContent;
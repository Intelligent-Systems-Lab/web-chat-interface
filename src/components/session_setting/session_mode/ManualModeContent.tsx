import { Box, Typography, TextField } from '@mui/material';
import { useState, useEffect } from 'react';

interface ManualModeContentProps {
  onParamsChange: (params: Record<string, any>) => void;
  params: Record<string, any>;
}

function ManualModeContent({ onParamsChange, params }: ManualModeContentProps) {
  const [temperature, setTemperature] = useState(params.temperature || 0.7);
  
  useEffect(() => {
    onParamsChange({ ...params, temperature });
  }, [temperature]);

  return (
    <Box>
      <Typography sx={{ color: '#FFFFFF', marginBottom: '8px' }}>
        Manual 模式的內容
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

export default ManualModeContent;
import { Box, Typography, TextField } from '@mui/material';
import { useState, useEffect } from 'react';

interface OpenAIModeContentProps {
  onParamsChange: (params: Record<string, any>) => void;
  params: Record<string, any>;
}

function OpenAIModeContent({ onParamsChange, params }: OpenAIModeContentProps) {
  const [apiKey, setApiKey] = useState(params.apiKey || '');
  const [model, setModel] = useState(params.model || 'gpt-4o-mini');
  const [prompt, setPrompt] = useState(params.prompt || '');

  useEffect(() => {
    onParamsChange({ ...params, apiKey, model, prompt });
  }, [apiKey, model, prompt]);

  return (
    <Box>
      <Typography sx={{ color: '#FFFFFF', marginBottom: '8px' }}>
        請輸入 OpenAI API 金鑰
      </Typography>
      <TextField
        label="OpenAI API Key"
        type="password"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
        sx={{
          color: '#FFFFFF',
          '.MuiInputBase-input': { color: '#FFFFFF' },
          '.MuiInputLabel-root': { color: '#FFFFFF' },
          '.MuiOutlinedInput-notchedOutline': { borderColor: '#737576' },
        }}
        fullWidth
        autoComplete="off"
      />
      <TextField
        label="Model"
        value={model}
        onChange={(e) => setModel(e.target.value)}
        sx={{
          color: '#FFFFFF',
          '.MuiInputBase-input': { color: '#FFFFFF' },
          '.MuiInputLabel-root': { color: '#FFFFFF' },
          '.MuiOutlinedInput-notchedOutline': { borderColor: '#737576' },
        }}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Prompt (可選)"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        sx={{
          color: '#FFFFFF',
          '.MuiInputBase-input': { color: '#FFFFFF' },
          '.MuiInputLabel-root': { color: '#FFFFFF' },
          '.MuiOutlinedInput-notchedOutline': { borderColor: '#737576' },
        }}
        fullWidth
        margin="normal"
        multiline
        rows={4}
      />
    </Box>
  );
}

export default OpenAIModeContent;
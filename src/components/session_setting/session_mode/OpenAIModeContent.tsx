import { Box, Typography, TextField } from '@mui/material';
import { useState, useEffect } from 'react';

interface OpenAIModeContentProps {
  onParamsChange: (params: Record<string, any>) => void;
  params: Record<string, any>;
  sessionId: string;
}

function OpenAIModeContent({ onParamsChange, params, sessionId }: OpenAIModeContentProps) {
  const [localId, setLocalId] = useState(sessionId || '');
  const [apiKey, setApiKey] = useState(params.apiKey || '');
  const [model, setModel] = useState(params.model || 'gpt-4o-mini');
  const [prompt, setPrompt] = useState(params.prompt || '');

  useEffect(() => {
    onParamsChange({ ...params, apiKey, model, prompt });
  }, [apiKey, model, prompt]);

  // 這段 useEffect 用來處理切換到不同 session 但是 mode 相同時，切換的 setting 不會正確顯示的 bug
  // 希望有大神能處理這個
  useEffect(() => {
    if (sessionId !== localId) {
      setApiKey(params.apiKey || '');
      setModel(params.model || 'gpt-4o-mini');
      setPrompt(params.prompt || '');
      setLocalId(sessionId);
    }
  }, [params]);

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
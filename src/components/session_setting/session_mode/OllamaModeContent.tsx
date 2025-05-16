import { Box, Typography, TextField } from '@mui/material';
import { useState, useEffect } from 'react';

interface OllamaContentProps {
  onParamsChange: (params: Record<string, any>) => void;
  params: Record<string, any>;
}

function OllamaModeContent({ onParamsChange, params }: OllamaContentProps) {
  const [url, setUrl] = useState(params.url || '');
  const [model, setModel] = useState(params.model || '');
  const [prompt, setPrompt] = useState(params.prompt || '');

  useEffect(() => {
    onParamsChange({ ...params, url, model, prompt });
  }, [url, model, prompt]);

  return (
    <Box>
      <Typography sx={{ color: '#FFFFFF', marginBottom: '8px' }}>
        請輸入 Ollama 的參數
      </Typography>
      <TextField
        label="URL"
        type="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
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

export default OllamaModeContent;
import { Box, Typography, TextField, MenuItem, Select, InputLabel, FormControl, IconButton, Grid } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { useState, useEffect } from 'react';

interface KeyValue {
  key: string;
  value: string;
}

interface CustomizeModeContentProps {
  onParamsChange: (params: Record<string, any>) => void;
  params: Record<string, any>;
}

function CustomizeModeContent({ onParamsChange, params }: CustomizeModeContentProps) {
  const [method, setMethod] = useState(params.method || 'GET');
  const [url, setUrl] = useState(params.url || '');
  const [apiKey, setApiKey] = useState(params.apiKey || '');
  const [customBody, setCustomBody] = useState<KeyValue[]>(
    params.customBody
      ? Object.entries(params.customBody).map(([key, value]) => ({ key, value: String(value) }))
      : [{ key: '', value: '' }]
  );

  useEffect(() => {
    // 將 customBody 陣列轉成物件
    const bodyObj = customBody.reduce((acc, { key, value }) => {
      if (key) acc[key] = value;
      return acc;
    }, {} as Record<string, string>);
    onParamsChange({
      ...params,
      method,
      url,
      apiKey,
      customBody: JSON.stringify(bodyObj),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [method, url, apiKey, customBody]);

  const handleCustomBodyChange = (idx: number, field: 'key' | 'value', val: string) => {
    setCustomBody((prev) =>
      prev.map((item, i) => (i === idx ? { ...item, [field]: val } : item))
    );
  };

  const handleAddRow = () => {
    setCustomBody((prev) => [...prev, { key: '', value: '' }]);
  };

  const handleRemoveRow = (idx: number) => {
    setCustomBody((prev) => prev.filter((_, i) => i !== idx));
  };

  return (
    <Box>
      <Typography sx={{ color: '#FFFFFF', marginBottom: '8px' }}>
        Customize 模式的內容
      </Typography>
      <FormControl fullWidth margin="normal">
        <InputLabel sx={{ color: '#FFFFFF' }}>API 方法</InputLabel>
        <Select
          value={method}
          label="API 方法"
          onChange={(e) => setMethod(e.target.value)}
          sx={{
            color: '#FFFFFF',
            '.MuiOutlinedInput-notchedOutline': { borderColor: '#737576' },
            '.MuiSvgIcon-root': { color: '#FFFFFF' },
          }}
        >
          <MenuItem value="GET">GET</MenuItem>
          <MenuItem value="POST">POST</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="目標 URL"
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
        label="Bearer Token（可選）"
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
        margin="normal"
      />
      <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 1, marginBottom: 1 }}>
        <Typography sx={{ color: '#FFFFFF' }}>
          自訂 Body（可選）
        </Typography>
        <IconButton onClick={handleAddRow} size="small" sx={{ color: '#FFFFFF', display: 'flex' }}>
          <AddCircleOutlineIcon />
        </IconButton>
      </Box>
      {customBody.map((item, idx) => (
        <Grid container spacing={0.8} alignItems="center" key={idx} sx={{ marginBottom: 1 }}>
          <Grid component="div">
            <TextField
              label="Key"
              value={item.key}
              onChange={(e) => handleCustomBodyChange(idx, 'key', e.target.value)}
              sx={{
                color: '#FFFFFF',
                '.MuiInputBase-input': { color: '#FFFFFF' },
                '.MuiInputLabel-root': { color: '#FFFFFF' },
                '.MuiOutlinedInput-notchedOutline': { borderColor: '#737576' },
              }}
              fullWidth
              size="small"
            />
          </Grid>
          <Grid>
            <TextField
              label="Value"
              value={item.value}
              onChange={(e) => handleCustomBodyChange(idx, 'value', e.target.value)}
              sx={{
                color: '#FFFFFF',
                '.MuiInputBase-input': { color: '#FFFFFF' },
                '.MuiInputLabel-root': { color: '#FFFFFF' },
                '.MuiOutlinedInput-notchedOutline': { borderColor: '#737576' },
              }}
              fullWidth
              size="small"
            />
          </Grid>
          <Grid>
            <IconButton
              onClick={() => handleRemoveRow(idx)}
              size="small"
              sx={{ color: '#FFFFFF' }}
              disabled={customBody.length === 0}
            >
              <RemoveCircleOutlineIcon />
            </IconButton>
          </Grid>
        </Grid>
      ))}
    </Box>
  );
}

export default CustomizeModeContent;
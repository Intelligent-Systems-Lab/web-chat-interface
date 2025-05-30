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
  sessionId: string;
}

function CustomizeModeContent({ onParamsChange, params, sessionId }: CustomizeModeContentProps) {
  const [localId, setLocalId] = useState(sessionId || '');
  const [method, setMethod] = useState(params.method || 'GET');
  const [url, setUrl] = useState(params.url || '');
  const [apiKey, setApiKey] = useState(params.apiKey || '');
  const [queryParams, setQueryParams] = useState<KeyValue[]>(
    params.query_params
      ? Object.entries(params.query_params).map(([key, value]) => ({ key, value: String(value) }))
      : [{ key: '', value: '' }]
  );
  const [customBody, setCustomBody] = useState<KeyValue[]>(
    params.body
      ? Object.entries(params.body).map(([key, value]) => ({ key, value: typeof value === 'object' ? JSON.stringify(value) : String(value), }))
      : [{ key: '', value: '' }]
  );
  const [responseFields, setResponseFields] = useState<string[]>(params.responseFields || ['']);

  useEffect(() => {
    const queryParamsObj = queryParams.reduce((acc, { key, value }) => {
      if (key) acc[key] = tryParseValue(value);
      return acc;
    }, {} as Record<string, string>);

    const bodyObj = customBody.reduce((acc, { key, value }) => {
      if (key) acc[key] = tryParseValue(value);
      return acc;
    }, {} as Record<string, string>);

    const filteredResponseFields = responseFields.filter((field) => field.trim() !== '');

    onParamsChange({
      ...params,
      method,
      url,
      apiKey,
      query_params: queryParamsObj,
      body: bodyObj,
      responseFields: filteredResponseFields,
    });
  }, [method, url, apiKey, queryParams, customBody, responseFields]);

  // 這段 useEffect 用來處理切換到不同 session 但是 mode 相同時，切換的 setting 不會正確顯示的 bug
  // 希望有大神能處理這個
  useEffect(() => {
      if (sessionId !== localId) {
        setMethod(params.method || 'GET');
        setUrl(params.url || '');
        setApiKey(params.apiKey || '');
        setQueryParams(
          params.query_params
            ? Object.entries(params.query_params).map(([key, value]) => ({ key, value: String(value) }))
            : [{ key: '', value: '' }]
        );
        setCustomBody(
          params.body
            ? Object.entries(params.body).map(([key, value]) => ({
                key,
                value: typeof value === 'object' ? JSON.stringify(value) : String(value),
              }))
            : [{ key: '', value: '' }]
        );
        setResponseFields(params.responseFields || ['']);
        setLocalId(sessionId);
      }
    }, [params]);

  const handleQueryParamsChange = (idx: number, field: 'key' | 'value', val: string) => {
    setQueryParams((prev) =>
      prev.map((item, i) => {
        if (i === idx) {
          const parsedValue = field === 'value' ? val : val;
          return { ...item, [field]: parsedValue };
        }
        return item;
      })
    );
  };

  const handleCustomBodyChange = (idx: number, field: 'key' | 'value', val: string) => {
    setCustomBody((prev) =>
      prev.map((item, i) => {
        if (i === idx) {
          const parsedValue = field === 'value' ? val : val;
          return { ...item, [field]: parsedValue };
        }
        return item;
      })
    );
  };

  const tryParseValue = (val: string): any => {
    try {
      return JSON.parse(val);
    } catch {
      return val;
    }
  };

  const handleAddQueryParamRow = () => {
    setQueryParams((prev) => [...prev, { key: '', value: '' }]);
  };

  const handleRemoveQueryParamRow = (idx: number) => {
    setQueryParams((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleAddBodyRow = () => {
    setCustomBody((prev) => [...prev, { key: '', value: '' }]);
  };

  const handleRemoveBodyRow = (idx: number) => {
    setCustomBody((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleResponseFieldsChange = (idx: number, val: string) => {
    setResponseFields((prev) =>
      prev.map((item, i) => (i === idx ? val : item))
    );
  };

  const handleAddResponseField = () => {
    setResponseFields((prev) => [...prev, '']);
  };

  const handleRemoveResponseField = (idx: number) => {
    setResponseFields((prev) => prev.filter((_, i) => i !== idx));
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
      {method === 'GET' && (
        <>
          <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 1, marginBottom: 1 }}>
            <Typography sx={{ color: '#FFFFFF' }}>
              Query Params（可選）
            </Typography>
            <IconButton onClick={handleAddQueryParamRow} size="small" sx={{ color: '#FFFFFF', display: 'flex' }}>
              <AddCircleOutlineIcon />
            </IconButton>
          </Box>
          {queryParams.map((item, idx) => (
            <Grid container spacing={0.8} alignItems="center" key={idx} sx={{ marginBottom: 1 }}>
              <Grid>
                <TextField
                  label="Key"
                  value={item.key}
                  onChange={(e) => handleQueryParamsChange(idx, 'key', e.target.value)}
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
                  onChange={(e) => handleQueryParamsChange(idx, 'value', e.target.value)}
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
                  onClick={() => handleRemoveQueryParamRow(idx)}
                  size="small"
                  sx={{ color: '#FFFFFF' }}
                  disabled={queryParams.length === 0}
                >
                  <RemoveCircleOutlineIcon />
                </IconButton>
              </Grid>
            </Grid>
          ))}
        </>
      )}
      {method === 'POST' && (
        <>
          <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 1, marginBottom: 1 }}>
            <Typography sx={{ color: '#FFFFFF' }}>
              Body（可選）
            </Typography>
            <IconButton onClick={handleAddBodyRow} size="small" sx={{ color: '#FFFFFF', display: 'flex' }}>
              <AddCircleOutlineIcon />
            </IconButton>
          </Box>
          {customBody.map((item, idx) => (
            <Grid container spacing={0.8} alignItems="center" key={idx} sx={{ marginBottom: 1 }}>
              <Grid>
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
                  onClick={() => handleRemoveBodyRow(idx)}
                  size="small"
                  sx={{ color: '#FFFFFF' }}
                  disabled={customBody.length === 0}
                >
                  <RemoveCircleOutlineIcon />
                </IconButton>
              </Grid>
            </Grid>
          ))}
        </>
      )}
    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 1, marginBottom: 1 }}>
        <Typography sx={{ color: '#FFFFFF' }}>
          Response Fields（可選）
        </Typography>
        <IconButton onClick={handleAddResponseField} size="small" sx={{ color: '#FFFFFF', display: 'flex' }}>
          <AddCircleOutlineIcon />
        </IconButton>
      </Box>
      {responseFields.map((field, idx) => (
        <Grid container spacing={0.8} alignItems="center" key={idx} sx={{ marginBottom: 1 }}>
          <Grid>
            <TextField
              label={`Field ${idx + 1}`}
              value={field}
              onChange={(e) => handleResponseFieldsChange(idx, e.target.value)}
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
              onClick={() => handleRemoveResponseField(idx)}
              size="small"
              sx={{ color: '#FFFFFF' }}
              disabled={responseFields.length === 0}
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
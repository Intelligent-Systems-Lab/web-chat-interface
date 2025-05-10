import { Box, Typography, TextField } from '@mui/material';

function ManualModeContent() {
  return (
    <Box>
      <Typography sx={{ color: '#FFFFFF', marginBottom: '8px' }}>
        Manual 模式的內容
      </Typography>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="輸入 Manual 模式的參數"
        sx={{
          backgroundColor: '#505252',
          borderRadius: '4px',
          input: { color: '#FFFFFF' },
        }}
      />
    </Box>
  );
}

export default ManualModeContent;
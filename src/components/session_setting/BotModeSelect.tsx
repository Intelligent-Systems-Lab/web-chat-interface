import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';

interface BotModeSelectorProps {
  mode: string;
  onModeChange: (mode: string) => void;
}

function BotModeSelector({ mode, onModeChange }: BotModeSelectorProps) {
  const handleModeChange = (event: SelectChangeEvent<string>) => {
    const newMode = event.target.value;
    onModeChange(newMode);
  };

  return (
    <div>
      <Typography 
        variant="h6" 
        sx={{ color: '#FFFFFF', marginBottom: '8px' }}
      >
        機器人設定
      </Typography>
      <FormControl fullWidth>
        <InputLabel sx={{ color: '#FFFFFF' }}>模式</InputLabel>
        <Select
          value={mode}
          onChange={handleModeChange}
          sx={{
            color: '#FFFFFF',
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: '#737576',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#FFFFFF',
            },
            '.MuiSvgIcon-root': {
              color: '#FFFFFF',
            },
          }}
        >
          <MenuItem value="openai">OpenAI</MenuItem>
          <MenuItem value="customize">Customize</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

export default BotModeSelector;
import { Box, Typography, Divider } from '@mui/material';

const typographyStyles = {
  title: { sx: { marginBottom: '16px', fontSize: '35px' } },
  sectionTitle: { sx: { marginBottom: '8px', fontSize: '25px' } },
  body: { sx: { marginBottom: '16px', fontSize: '16px' } },
  description: { sx: { marginBottom: '8px', fontSize: '16px' } },
};

const codeBoxStyles = {
  backgroundColor: '#444',
  padding: '15px',
  borderRadius: '4px',
  fontSize: '15px',
  fontFamily: 'monospace',
};

const dividerStyles = {
  margin: '16px 0',
  backgroundColor: '#555',
  height: '1px',
};

function OllamaGuide() {
  return (
    <Box sx={{ padding: '16px' }}>
      <Typography variant="h4" {...typographyStyles.title}>Ollama 操作指南</Typography>
      <Typography variant="body1" {...typographyStyles.body}>
        以下是使用 Ollama 模式時需要設定的參數及範例：
      </Typography>
      <Divider sx={dividerStyles} />
      <Box sx={{ marginBottom: '16px' }}>
        <Typography variant="h6" {...typographyStyles.sectionTitle}>URL</Typography>
        <Typography variant="body2" {...typographyStyles.description}>
          您的 Ollama 伺服器 URL，用於連接到您的服務。
        </Typography>
        <Box sx={codeBoxStyles}>
          http://localhost:8000
        </Box>
        <Typography
          variant="body2"
          sx={{ ...typographyStyles.description.sx, marginTop: '8px' }}
        >
          注意使用自訂義 url 時，請確保您的 Ollama 伺服器已經啟動並且可以訪問。<br />
          並且注意 https, DNS, CROS 以及防火牆等問題，可以從主控台檢查錯誤訊息。
        </Typography>
        <Box sx={{ ...codeBoxStyles, marginTop: '8px' }}>
          http://hc5.isl.lab.nycu.edu.tw:11434/
        </Box>
      </Box>
      <Divider sx={dividerStyles} />
      <Box sx={{ marginBottom: '16px' }}>
        <Typography variant="h6" {...typographyStyles.sectionTitle}>Model</Typography>
        <Typography variant="body2" {...typographyStyles.description}>
          要使用的 Ollama 模型名稱。
        </Typography>
        <Box sx={codeBoxStyles}>
          qwen2.5:14b
        </Box>
      </Box>
      <Divider sx={dividerStyles} />
      <Box sx={{ marginBottom: '16px' }}>
        <Typography variant="h6" {...typographyStyles.sectionTitle}>Prompt (Optional)</Typography>
        <Typography variant="body2" {...typographyStyles.description}>
          提示內容。
        </Typography>
        <Box sx={codeBoxStyles}>
          在每個回答後面都加上 AYAYA
        </Box>
        <Typography
          variant="body2"
          sx={{ ...typographyStyles.description.sx, marginTop: '8px' }}
        >
          你可以在 Prompt 內輸入 <span style={{ color: '#FC5555', fontSize: '16px' }}>訊息</span>，這個關鍵字會將你在聊天室中輸入的訊息直接帶入這個欄位。
        </Typography>
        <Box sx={codeBoxStyles}>
          請幫我生成一段關於<span style={{ color: '#FC5555', fontSize: '16px' }}>訊息</span>的介紹
        </Box>
      </Box>
    </Box>
  );
}

export default OllamaGuide;
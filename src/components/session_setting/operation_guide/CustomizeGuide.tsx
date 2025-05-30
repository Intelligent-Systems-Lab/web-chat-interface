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

function CustomizeGuide() {
  return (
    <Box sx={{ padding: '16px' }}>
      <Typography variant="h4" {...typographyStyles.title}>Customize API 操作指南</Typography>
      <Typography variant="body1" {...typographyStyles.body}>
        以下是使用 Customize 模式時需要設定的參數及範例：
      </Typography>
      <Divider sx={dividerStyles} />
      <Box sx={{ marginBottom: '16px' }}>
        <Typography variant="h6" {...typographyStyles.sectionTitle}>Method</Typography>
        <Typography variant="body2" {...typographyStyles.description}>
          HTTP 方法，支援 GET 和 POST。
        </Typography>
        <Box sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <Box sx={{ ...codeBoxStyles, flex: 1 }}>
                {`GET`}
            </Box>
            <Box sx={{ ...codeBoxStyles, flex: 1 }}>
                {`POST`}
            </Box>
        </Box>
      </Box>
      <Divider sx={dividerStyles} />
      <Box sx={{ marginBottom: '16px' }}>
        <Typography variant="h6" {...typographyStyles.sectionTitle}>URL</Typography>
        <Typography variant="body2" {...typographyStyles.description}>
          API 的目標 URL，用於指定請求的目的地。
        </Typography>
        <Box sx={codeBoxStyles}>
          http://localhost:8001/
        </Box>
        <Typography
            variant="body2"
            sx={{ ...typographyStyles.description.sx, marginTop: '8px' }}
        >
            注意使用自訂義 url 時，請確保您的目標伺服器已經啟動並且可以訪問。<br />
            並且注意 https, DNS, CROS 以及防火牆等問題，可以從主控台檢查錯誤訊息。
        </Typography>
        <Box sx={{ ...codeBoxStyles, marginTop: '8px' }}>
            http://hc5.isl.lab.nycu.edu.tw:11434/
        </Box>
      </Box>
      <Divider sx={dividerStyles} />
      <Box sx={{ marginBottom: '16px' }}>
        <Typography variant="h6" {...typographyStyles.sectionTitle}>Bearer Token (Optional)</Typography>
        <Typography variant="body2" {...typographyStyles.description}>
            用於身份驗證的 Bearer Token (如果你的伺服器需要身分驗證)。
        </Typography>
        <Box sx={codeBoxStyles}>
          xxxxxxxxxxxxxxxxx
        </Box>
      </Box>
      <Divider sx={dividerStyles} />
      <Box sx={{ marginBottom: '16px' }}>
        <Typography variant="h6" {...typographyStyles.sectionTitle}>Query Params (Optional)</Typography>
        <Typography variant="body2" {...typographyStyles.description}>
          GET 方法的查詢參數，格式為 Key-Value。 <br />
          如果 value 內容是陣列或是 Json，請確保格式正確。 <br />
          你可以輸入 <span style={{ color: '#FC5555', fontSize: '16px' }}>訊息</span>，這個關鍵字會將你在聊天室中輸入的訊息直接帶入這個欄位。
        </Typography>
        <Box sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <Box sx={{ ...codeBoxStyles, flex: 1 }}>
                {`model`}
            </Box>
            <Box sx={{ ...codeBoxStyles, flex: 1 }}>
                {`gpt-4o-mini`}
            </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
            <Box sx={{ ...codeBoxStyles, flex: 1 }}>
                {`messages`}
            </Box>
            <Box sx={{ ...codeBoxStyles, flex: 1 }}>
                {`[{"role":"user","content":"`}<span style={{ color: '#FC5555', fontSize: '16px' }}>訊息</span>{`"}]`}
            </Box>
        </Box>
      </Box>
      <Divider sx={dividerStyles} />
      <Box sx={{ marginBottom: '16px' }}>
        <Typography variant="h6" {...typographyStyles.sectionTitle}>Body (Optional)</Typography>
        <Typography variant="body2" {...typographyStyles.description}>
          POST 方法的查詢參數，格式為 Key-Value。 <br />
          如果 value 內容是陣列或是 Json，請確保格式正確。 <br />
          你可以輸入 <span style={{ color: '#FC5555', fontSize: '16px' }}>訊息</span>，這個關鍵字會將你在聊天室中輸入的訊息直接帶入這個欄位。
        </Typography>
        <Box sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <Box sx={{ ...codeBoxStyles, flex: 1 }}>
                {`model`}
            </Box>
            <Box sx={{ ...codeBoxStyles, flex: 1 }}>
                {`gpt-4o-mini`}
            </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
            <Box sx={{ ...codeBoxStyles, flex: 1 }}>
                {`messages`}
            </Box>
            <Box sx={{ ...codeBoxStyles, flex: 1 }}>
                {`[{"role":"user","content":"`}<span style={{ color: '#FC5555', fontSize: '16px' }}>訊息</span>{`"}]`}
            </Box>
        </Box>
      </Box>
      <Divider sx={dividerStyles} />
      <Box sx={{ marginBottom: '16px' }}>
        <Typography variant="h6" {...typographyStyles.sectionTitle}>Response Fields (Optional)</Typography>
        <Typography variant="body2" {...typographyStyles.description}>
          可以指定需要的回應欄位，支援巢狀搜索。 <br />
          如果多於一個欄位，會組合成 Json 顯示。
        </Typography>
        <Box sx={codeBoxStyles}>
          choices
        </Box>
        <Box sx={{ ...codeBoxStyles, marginTop: '8px' }}>
            choices[0].message.content
        </Box>
      </Box>
    </Box>
  );
}

export default CustomizeGuide;
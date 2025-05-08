import Box from '@mui/material/Box';

interface SessionItemProps {
  sessionId: string;
  title: string;
  active: boolean;
  onClick: (sessionId: string) => void;
}

function SessionItem({ sessionId, title, active, onClick }: SessionItemProps) {
  return (
    <Box
      sx={{
        padding: '12px 16px',
        paddingLeft: '16px',
        width: '100%',
        cursor: 'pointer',
        backgroundColor: active ? '#4B4B4B' : 'transparent',
        fontWeight: active ? 'bold' : 'normal',
        color: 'white',
        '&:hover': {
          backgroundColor: '#444',
        },
      }}
      onClick={() => onClick(sessionId)}
    >
      {title}
    </Box>
  );
}

export default SessionItem;
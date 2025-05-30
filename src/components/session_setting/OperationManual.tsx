import { Dialog, DialogContent, List, ListItem, ListItemText, ListItemButton, Divider, Typography } from '@mui/material';
import { JSX, useState } from 'react';
import OpenAIGuide from './operation_guide/OpenAIGuide';
import OllamaGuide from './operation_guide/OllamaGuide';
import CustomizeGuide from './operation_guide/CustomizeGuide';
import './operation_guide/OperationManual.css';

interface OperationManualProps {
  open: boolean;
  onClose: () => void;
}

function OperationManual({ open, onClose }: OperationManualProps) {
  const pageKeys = ['OpenAI', 'Ollama', 'Customize'] as const;
  type PageKey = typeof pageKeys[number];
  const [selectedPage, setSelectedPage] = useState<PageKey>('OpenAI');

  const pages: Record<PageKey, JSX.Element> = {
    OpenAI: <OpenAIGuide />,
    Ollama: <OllamaGuide />,
    Customize: <CustomizeGuide />,
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            width: '75%',
            height: '80%',
            maxWidth: 'none',
            maxHeight: 'none',
            backgroundColor: '#333',
            color: '#fff',
            display: 'flex',
          },
        },
      }}
    >
      <DialogContent sx={{ display: 'flex', flexDirection: 'row', padding: 0 }}>
        {/* 左側選單 */}
        <List
          className="scrollable"
          sx={{
            width: '20%',
            backgroundColor: '#333',
            color: '#fff',
            padding: 0,
            borderRight: '1px solid #555',
          }}
        >
          {/* 操作手冊標題 */}
          <ListItem
            disablePadding
            sx={{
              backgroundColor: '#333',
              padding: '16px',
              borderBottom: '1px solid #555',
            }}
          >
            <ListItemText
                primary={
                    <Typography sx={{ fontSize: '110%', fontWeight: 'bold', color: '#fff' }}>
                        操作手冊
                    </Typography>
                } 
            />
          </ListItem>
          <Divider sx={{ backgroundColor: '#555' }} />
          {/* 文件選單 */}
          {pageKeys.map((page) => (
            <ListItem
              key={page}
              disablePadding
              sx={{
                backgroundColor: selectedPage === page ? '#555' : 'inherit',
              }}
            >
              <ListItemButton
                onClick={() => setSelectedPage(page)}
                disableRipple
                sx={{
                  '&:hover': {
                    backgroundColor: '#555',
                  },
                  color: '#fff',
                }}
                selected={selectedPage === page}
              >
                <ListItemText
                  primary={page}
                  sx={{
                    fontSize: '16px',
                    fontWeight: 'bold',
                    textAlign: 'left',
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        {/* 右側內容 */}
        <div
          className="scrollable"
          style={{
            width: '80%',
            padding: '16px',
          }}
        >
          {pages[selectedPage]}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default OperationManual;
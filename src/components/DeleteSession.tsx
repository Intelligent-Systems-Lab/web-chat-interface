import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

interface DeleteSessionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

function DeleteSessionDialog({ isOpen, onClose, onConfirm }: DeleteSessionDialogProps) {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>刪除確認</DialogTitle>
      <DialogContent>
        <DialogContentText>你確定要刪除這個對話嗎？</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          取消
        </Button>
        <Button onClick={onConfirm} color="error">
          確定
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteSessionDialog;
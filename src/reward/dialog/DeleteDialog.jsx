import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

const DeleteDialog = ({ open, onClose, handleDeleteRow }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>삭제 확인</DialogTitle>
      <DialogContent>
        <DialogContentText>정말로 이 항목을 삭제하시겠습니까?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          취소
        </Button>
        <Button onClick={handleDeleteRow} color="secondary">
          삭제
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;

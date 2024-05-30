// modal/EditRewardModal.jsx
import React from 'react';
import { Modal, TextField, Box, Grid, Button } from '@mui/material';
const EditRewardModal = ({ open, onClose, editRow, handleEditChange, handleEditSave }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}
      >
        <h2>리워드 수정</h2>
        <TextField
          size='small'
          label="업체명"
          name="company_name"
          value={editRow?.company_name || ''}
          onChange={handleEditChange}
          fullWidth
          margin="normal"
        />
        <TextField
          size='small'
          label="셋팅 키워드"
          name="setting_keyword"
          value={editRow?.setting_keyword || ''}
          onChange={handleEditChange}
          fullWidth
          margin="normal"
        />
        <TextField
          size='small'
          label="최종 키워드"
          name="final_keyword"
          value={editRow?.final_keyword || ''}
          onChange={handleEditChange}
          fullWidth
          margin="normal"
        />
        <TextField
          size='small'
          label="플레이스 코드"
          name="place_code"
          type="number"
          value={editRow?.place_code || ''}
          onChange={handleEditChange}
          fullWidth
          margin="normal"
        />
        <TextField
          size='small'
          label="작업량(변경시 익일 0시 반영)"
          name="work_volume"
          type="number"
          value={editRow?.work_volume || ''}
          onChange={handleEditChange}
          fullWidth
          margin="normal"
        />
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
        <Button variant="contained" color="inherit" style={{ marginRight: '8px' }} onClick={onClose}>
            취소
          </Button>
          <Button variant="contained" color="success" onClick={handleEditSave}>
            저장
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default EditRewardModal;

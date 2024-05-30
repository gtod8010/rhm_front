import React, { useState, useEffect } from 'react';
import { Modal, Box, Button, TextField, InputLabel } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const ExtendRewardModal = ({ open, onClose, reward, setReward, onSave }) => {

  useEffect(()=>{
    console.log(reward)
  },[reward])

 const handleDateChange = (newDate) => {
  setReward(prev => ({ ...prev, end_date: dayjs(newDate) }));
  };

  const handleExtendSave = () => {
    onSave();
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <h2>리워드 기간 연장</h2>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="새 종료일"
            value={reward? dayjs(reward.end_date) : dayjs()}
            onChange={handleDateChange}
            sx={{ width: '100%' }}
            renderInput={(params) => (
              <TextField {...params} fullWidth margin="normal" />
            )}
          />
        </LocalizationProvider>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "16px",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            style={{ marginRight: "8px" }}
            onClick={onClose}
          >
            취소
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={handleExtendSave}
          >
            연장
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default ExtendRewardModal;

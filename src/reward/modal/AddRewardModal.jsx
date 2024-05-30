import React from 'react';
import { Modal, TextField, Box, Grid, Button } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

const AddRewardModal = ({ open, onClose, newReward, setNewReward, handleChange, handleDateChange, handleSave }) => {
  const today = dayjs();
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
        <h2>리워드 추가</h2>
        <TextField
          size='small'
          label="업체명"
          name="company_name"
          value={newReward.company_name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          size='small'
          label="셋팅 키워드"
          name="setting_keyword"
          value={newReward.setting_keyword}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          size='small'
          label="최종 키워드"
          name="final_keyword"
          value={newReward.final_keyword}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          size='small'
          label="플레이스 코드"
          name="place_code"
          type="number"
          value={newReward.place_code}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          size='small'
          label="작업량"
          name="work_volume"
          type="number"
          value={newReward.work_volume}
          onChange={handleChange}
          fullWidth
          margin="normal"
          sx={{paddingBottom : 2}}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <DatePicker
                label="작업 시작일자"
                minDate={today}
                value={dayjs(newReward.start_date)}
                onChange={(date) => handleDateChange(date, 'start_date', setNewReward)}
                renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
              />
            </Grid>
            <Grid item xs={6}>
              <DatePicker
                label="작업 종료일자"
                minDate={today}
                value={dayjs(newReward.end_date)}
                onChange={(date) => handleDateChange(date, 'end_date', setNewReward)}
                renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
              />
            </Grid>
          </Grid>
        </LocalizationProvider>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
          <Button variant="contained" color="primary" style={{ marginRight: '8px' }} onClick={onClose}>
            취소
          </Button>
          <Button variant="contained" color="success"  onClick={handleSave}>
            저장
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default AddRewardModal;

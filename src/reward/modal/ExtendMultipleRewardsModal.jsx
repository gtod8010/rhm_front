import React, { useEffect, useState } from "react";
import { Modal, TextField, Box, InputLabel, Button } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const ExtendMultipleRewardsModal = ({
  open,
  onClose,
  selectedRows,
  userPoints,
  handleExtendMultipleSave,
  extendRowsEndDate,
  setExtendRowsEndDate
}) => {
  const [totalWorkVolume, setTotalWorkVolume] = useState(0);
  const [remainingPoints, setRemainingPoints] = useState(0);
  const [rows, setRows] = useState(selectedRows);
  const [dateChanged, setDateChanged] = useState(false);
  const tomorrow = dayjs().add(3, 'day');
  
  useEffect(() => {
    if (selectedRows.length > 0) {
      const totalWork = selectedRows.reduce((sum, row) => sum + parseInt(row.work_volume, 10), 0);
      setTotalWorkVolume(totalWork);
      setRemainingPoints(userPoints - totalWork);
      setRows(selectedRows);

      if (!dateChanged) {
        const maxEndDate = selectedRows.reduce((maxDate, row) => {
          const rowEndDate = dayjs(row.end_date);
          return rowEndDate.isAfter(maxDate) ? rowEndDate : maxDate;
        }, dayjs(selectedRows[0].end_date));

        setExtendRowsEndDate(maxEndDate.add(1, 'day').toDate());
      }
    }
  }, [selectedRows, userPoints, dateChanged]);

  const handleDateChange = (newDate) => {
    setDateChanged(true);
    setExtendRowsEndDate(dayjs(newDate).toDate());
  };

  const handleSave = () => {
    handleExtendMultipleSave(extendRowsEndDate);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <h2>선택된 리워드 기간 연장</h2>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="새 종료일"
            minDate={tomorrow}
            value={dayjs(extendRowsEndDate)}
            onChange={(newDate) => handleDateChange(newDate)}
            sx={{ width: '100%' }}
            views={['year', 'month', 'day']}
            slotProps={{ textField: { size: 'small' },field: { format: 'YYYY/MM/DD' } }}
          />
        </LocalizationProvider>
        <Box sx={{ mt: 2 }}>
          <InputLabel shrink htmlFor="bootstrap-input">
            하루당 사용 포인트 합
          </InputLabel>
          <TextField
            size="small"
            type="number"
            value={totalWorkVolume}
            fullWidth
            margin="normal"
            disabled
            sx={{ backgroundColor: "lightgray", marginTop: 0 }}
          />
          <InputLabel shrink htmlFor="bootstrap-input">
            잔여 포인트
          </InputLabel>
          <TextField
            size="small"
            value={remainingPoints}
            fullWidth
            margin="normal"
            disabled
            sx={{ backgroundColor: "lightgray", marginTop: 0 }}
          />
        </Box>
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
          <Button variant="contained" color="success" onClick={handleSave}>
            연장
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default ExtendMultipleRewardsModal;

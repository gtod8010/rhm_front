import React, { useEffect, useState } from "react";
import { Modal, TextField, Box, Grid, Button, Typography } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import holdays from "../../const/holidays";

const AddRewardModal = ({
  open,
  onClose,
  newReward,
  setNewReward,
  handleChange,
  handleDateChange,
  handleSave,
  userPoints,
  pointsToConsume,
  remainingPoints,
  setPointsToConsume,
  setRemainingPoints,
}) => {
  const tomorrow = dayjs().add(1, "day");

  useEffect(() => {
    if (newReward.work_volume && newReward.start_date && newReward.end_date) {
      const startDate = dayjs(newReward.start_date).startOf("day");
      const endDate = dayjs(newReward.end_date).startOf("day");
      const duration = endDate.diff(startDate, "day") + 1;
      const totalPoints = duration * newReward.work_volume;
      setPointsToConsume(totalPoints);
      setRemainingPoints(userPoints - totalPoints);
    }
  }, [newReward, userPoints]);

  useEffect(() => {
    console.log(remainingPoints)
  }, [remainingPoints ]);

  const handleSaveInternal = () => {
    if (remainingPoints < 0) {
      alert("잔여 포인트 부족으로 리워드를 추가하실 수 없습니다.");
      return;
    }
    handleSave();
  };

  const isHoliday = (date) => {
    const formattedDate = date.format("YYYY-MM-DD");
    return holdays.includes(formattedDate);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 450,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <h2>리워드 추가</h2>
        <TextField
          size="small"
          label="업체명"
          name="company_name"
          value={newReward.company_name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          size="small"
          label="셋팅 키워드"
          name="setting_keyword"
          value={newReward.setting_keyword}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          size="small"
          label="최종 키워드"
          name="final_keyword"
          value={newReward.final_keyword}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          size="small"
          label="플레이스 코드"
          name="place_code"
          type="number"
          value={newReward.place_code}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          size="small"
          label="작업량"
          name="work_volume"
          type="number"
          value={newReward.work_volume}
          onChange={handleChange}
          fullWidth
          margin="normal"
          sx={{ paddingBottom: 2 }}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <DatePicker
                label="작업 시작일자"
                minDate={tomorrow}
                value={dayjs(newReward.start_date)}
                onChange={(date) =>
                  handleDateChange(date, "start_date", setNewReward)
                }
                slotProps={{
                  textField: { size: "small" },
                  field: { format: "YYYY/MM/DD" },
                }}
                inputFormat="YYYY/MM/DD"
                shouldDisableDate={isHoliday}
              />
            </Grid>
            <Grid item xs={6}>
              <DatePicker
                label="작업 종료일자"
                minDate={dayjs(newReward.start_date).add(3, "day")}
                value={dayjs(newReward.end_date)}
                onChange={(date) =>
                  handleDateChange(date, "end_date", setNewReward)
                }
                slotProps={{
                  textField: { size: "small" },
                  field: { format: "YYYY/MM/DD" },
                }}
                inputFormat="YYYY/MM/DD"
              />
            </Grid>
          </Grid>
        </LocalizationProvider>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "16px",
          }}
        >
          <Box sx={{ marginRight: 8 }}>
            <Typography variant="body2">
              소진할 포인트: {pointsToConsume}
            </Typography>
            <Typography variant="body2">
              소진후 포인트:{" "}
              {isNaN(remainingPoints)
                ? ""
                : remainingPoints < 0
                ? "포인트 부족"
                : remainingPoints}
            </Typography>
          </Box>
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
            onClick={handleSaveInternal}
          >
            저장
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default AddRewardModal;

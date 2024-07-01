import React, { useState, useEffect, useContext } from "react";
import Button from "@mui/material/Button";
import {
  DataGridPro,
  GridToolbarContainer,
  gridClasses,
  GridToolbarColumnsButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid-pro";
import { UserContext } from "../login/UserContext";
import columns from "./columns";
import { Modal, TextField, Box } from "@mui/material";
import {
  fetchMembers,
  addMember,
  deleteMembers,
  editMember,
} from "../api/index";

const MemberTable = () => {
  const [rows, setRows] = useState([]);
  const [maxIdx, setMaxIdx] = useState(0);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [newMember, setNewMember] = useState({
    username: "",
    password: "",
    point: "",
    agency: "",
  });
  const [editMemberData, setEditMemberData] = useState({
    id: "",
    username: "",
    password: "",
    point: "",
    agency: "",
    addPoints: 0,
  });
  const { user } = useContext(UserContext);
  const [selectionModel, setSelectionModel] = useState([]);
  const [columnVisibilityModel, setColumnVisibilityModel] = useState({
    id: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataWithIdx = await fetchMembers(user.username);
        setRows(dataWithIdx);
        setMaxIdx(dataWithIdx.length);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  useEffect(() => {
    setEditMemberData((prev) => ({
      ...prev,
      finalPoints: parseInt(prev.point) + parseInt(prev.addPoints || 0),
    }));
  }, [editMemberData.addPoints]);

  const handleAddRow = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewMember({ username: "", password: "", point: "" });
  };

  const handleEditClick = (row) => {
    console.log(row);
    if (!row) {
      return; // row가 유효하지 않으면 처리 중단
    }
    setEditMemberData({
      id: row.id || "",
      username: row.username || "",
      password: row.password || "",
      point: row.point || "",
      agency: row.agency || "",
    });
    setEditOpen(true); // 수정 모달 창 열기
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewMember((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditMemberData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (
      !newMember.username ||
      !newMember.password ||
      !newMember.point ||
      !newMember.agency
    ) {
      alert("모든 입력 값을 넣어주세요");
      return;
    }

    const newRow = {
      idx: maxIdx + 1,
      username: newMember.username,
      password: newMember.password,
      point: newMember.point,
      admin: user.username,
      agency: newMember.agency,
    };

    try {
      const addedRow = await addMember(newRow);
      alert("멤버 추가를 성공하였습니다.");
      setRows((prevRows) => [...prevRows, { ...newRow, id: addedRow.id }]);
      setMaxIdx(maxIdx + 1);
      handleClose();
    } catch (error) {
      console.error("Error adding member:", error);
      alert("Error adding member");
    }
  };

  const handleEditSave = async () => {
    try {
      const finalPoints = parseInt(editMemberData.point) + parseInt(editMemberData.addPoints || 0);
      const updatedMemberData = {
        ...editMemberData,
        point: finalPoints
      };
  
      const updatedRow = await editMember(updatedMemberData);
      setRows((prevRows) =>
        prevRows.map((row) => (row.id === updatedRow.id ? updatedRow : row))
      );
      alert("회원 정보 업데이트 완료");
      setEditOpen(false);
    } catch (error) {
      console.error("Error updating member:", error);
      alert("Error updating member");
    }
  };

  const handleDeleteRow = async () => {
    if (selectionModel.length === 0) {
      alert("삭제할 항목을 선택하세요.");
      return;
    }

    const idsToDelete = selectionModel.map(
      (idx) => rows.find((row) => row.idx === idx).id
    );

    try {
      await deleteMembers(idsToDelete);
      alert("Members deleted successfully");
      const updatedRows = rows.filter(
        (row) => !selectionModel.includes(row.idx)
      );
      setRows(updatedRows);
      setSelectionModel([]);
    } catch (error) {
      console.error("Error deleting members:", error);
      alert("Error deleting members");
    }
  };

  const processRowUpdate = (newRow, oldRow) => {
    const updatedRows = rows.map((row) =>
      row.idx === oldRow.idx ? newRow : row
    );
    setRows(updatedRows);
    return newRow;
  };

  function CustomToolbar() {
    return (
      <GridToolbarContainer
        className={gridClasses.toolbarContainer}
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <div>
          <GridToolbarColumnsButton />
          <GridToolbarDensitySelector />
          <GridToolbarExport />
        </div>
      </GridToolbarContainer>
    );
  }

  return (
    <div style={{ width: "100%", height: "calc(100vh - 64px)" }}>
      <Box
        sx={{
          "& .super-app-theme--header": {
            backgroundColor: "black",
          },
        }}
      >
        <DataGridPro
          sx={{
            ".MuiDataGrid-columnHeaderTitleContainer": {
              backgroundColor: "black",
              color: "white",
            },

            ".expired": {
              bgcolor: "rgb(220, 220, 220)",
            },
            ".near-expired": {
              bgcolor: "rgb(238, 205, 205)",
            },
            "& .MuiDataGrid-columnHeaders": {
              borderBottom: "1px solid #e0e0e0",
            },
            "& .MuiDataGrid-cell": {
              borderRight: "1px solid #e0e0e0",
              borderRightColor: "lightgray",
            },
            "& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell": {
              borderRight: "1px solid #e0e0e0",
              borderRightColor: "lightgray",
            },
          }}
          getRowHeight={() => "auto"}
          autoHeight
          rows={rows}
          columns={columns(handleEditClick)}
          disableColumnResize={true}
          getRowId={(row) => row.id}
          density="compact"
          components={{ Toolbar: CustomToolbar }}
          hideFooter={false}
          checkboxSelection
          processRowUpdate={processRowUpdate}
          onRowSelectionModelChange={(newSelection) => {
            // o
            console.log("Selection changed:", newSelection);
            setSelectionModel(newSelection);
          }}
          rowSelectionModel={selectionModel} // selectionModel을 명시적으로 설정
          columnVisibilityModel={columnVisibilityModel} // columnVisibilityModel을 설정하여 id 컬럼 숨기기
          onColumnVisibilityModelChange={(newModel) =>
            setColumnVisibilityModel(newModel)
          } // 컬럼 가시성 모델 변경 핸들러
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
          color="success"
          style={{ marginRight: "8px" }}
          onClick={handleAddRow}
        >
          추가
        </Button>
        <Button
          variant="contained"
          color="primary"
          style={{ marginRight: "8px" }}
          onClick={handleDeleteRow}
        >
          삭제
        </Button>
      </div>
      <Modal open={open} onClose={handleClose}>
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
          <h2>회원 추가</h2>
          <TextField
            label="Username"
            name="username"
            size="small"
            value={newMember.username}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            size="small"
            value={newMember.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Points"
            name="point"
            size="small"
            value={newMember.point}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="agency"
            name="agency"
            size="small"
            value={newMember.agency}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "16px",
            }}
          >
            <Button
              variant="contained"
              color="success"
              style={{ marginRight: "8px" }}
              onClick={handleSave}
            >
              저장
            </Button>
            <Button variant="contained" color="primary" onClick={handleClose}>
              취소
            </Button>
          </div>
        </Box>
      </Modal>
      <Modal open={editOpen} onClose={() => setEditOpen(false)}>
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
          <h2>회원 수정</h2>
          <TextField
            label="Username"
            name="username"
            value={editMemberData.username}
            onChange={handleEditChange}
            fullWidth
            size="small"
            margin="normal"
            disabled
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={editMemberData.password}
            onChange={handleEditChange}
            fullWidth
            size="small"
            margin="normal"
            disabled
          />
          <TextField
            label="현재 포인트"
            name="point"
            value={editMemberData.point}
            onChange={handleEditChange}
            fullWidth
            size="small"
            margin="normal"
            disabled
          />
          <TextField
            label="추가할 포인트"
            name="addPoints"
            value={editMemberData.addPoints}
            onChange={handleEditChange}
            fullWidth
            size="small"
            margin="normal"
          />
          <TextField
            label="최종 포인트"
            name="finalPoints"
            value={
              parseInt(editMemberData.point) +
              parseInt(editMemberData.addPoints || 0)
            }
            fullWidth
            size="small"
            margin="normal"
            disabled
          />
          <TextField
            label="Agency"
            name="agency"
            value={editMemberData.agency}
            onChange={handleEditChange}
            fullWidth
            size="small"
            margin="normal"
          />
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
              onClick={handleEditSave}
            >
              저장
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setEditOpen(false)}
            >
              취소
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default MemberTable;

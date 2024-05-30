import React, { useState, useEffect, useContext } from "react";
import { Button, Box } from "@mui/material";
import { DataGridPro } from "@mui/x-data-grid-pro";
import { UserContext } from "../login/UserContext";
import getColumns from "./columns";
import AddRewardModal from "./modal/AddRewardModal";
import ExtendRewardModal from "./modal/ExtendRewardModal";
import ExtendMultipleRewardsModal from "./modal/ExtendMultipleRewardsModal";
import EditRewardModal from "./modal/EditRewardModal";
import DeleteDialog from "./dialog/DeleteDialog";
import {
  getRewards,
  addReward,
  extendReward,
  extendMultipleRewards,
  editReward,
  deleteReward,
  updateUsedStatus,
} from "../api/index";
import { makeStyles } from "@mui/styles";
import dayjs from "dayjs";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiDataGrid-columnHeaders": {
      color: "white",
    },
    "& .MuiDataGrid-checkboxInput": {
      padding: 0,
    },
  },
  select: {
    pointerEvents: "none",
  },
}));

const RewardTable = () => {
  const [rows, setRows] = useState([]);
  const [cellModesModel, setCellModesModel] = useState({});
  const { user } = useContext(UserContext);
  const [selectionModel, setSelectionModel] = useState([]);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openExtendModal, setOpenExtendModal] = useState(false);
  const [openExtendMultipleModal, setOpenExtendMultipleModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [extendRow, setExtendRow] = useState({
    start_date: new Date(),
    end_date: new Date(),
  });
  const [extendRowsEndDate, setExtendRowsEndDate] = useState({end_date : new Date()})
  const [editRow, setEditRow] = useState({
    company_name: "",
    setting_keyword: "",
    final_keyword: "",
    work_volume: "",
    place_code: "",
  });
  const [newReward, setNewReward] = useState({
    company_name: "",
    setting_keyword: "",
    final_keyword: "",
    work_volume: "",
    place_code: "",
    start_date: new Date(),
    end_date: new Date(),
  });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteRow, setDeleteRow] = useState(null);
  const [columnVisibilityModel, setColumnVisibilityModel] = useState({
    id: false,
    reward_no: false, // id 컬럼을 숨깁니다
  });
  const classes = useStyles();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
          const data = await getRewards(storedUser.username);
          setRows(data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleAddRow = () => {
    setOpenAddModal(true);
  };

  const handleCloseAddModal = () => {
    setOpenAddModal(false);
    setNewReward({
      company_name: "",
      setting_keyword: "",
      final_keyword: "",
      work_volume: "",
      place_code: "",
      start_date: null,
      end_date: null,
    });
  };

  const handleOpenExtendModal = (row) => {
    setExtendRow(row);
    setOpenExtendModal(true);
  };

  const handleCloseExtendModal = () => {
    setOpenExtendModal(false);
  };

  const handleOpenExtendMultipleModal = () => {
    if (selectionModel.length === 0) {
      alert("연장할 항목을 선택하세요.");
      return;
    }
    const selectedRows = selectionModel.map((idx) =>
      rows.find((row) => row.idx === idx)
    );
    if (selectedRows.length > 0) {
      setExtendRow({ end_date: selectedRows[0].end_date });
    }
    setOpenExtendMultipleModal(true);
  };
  const handleCloseExtendMultipleModal = () => {
    setOpenExtendMultipleModal(false);
    setExtendRow(null);
  };

  const handleOpenEditModal = (row) => {
    setEditRow(row);
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setEditRow(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewReward((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditRow((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date, field) => {
    setNewReward((prev) => ({ ...prev, [field]: date.toDate() }));
  };

  const handleSave = async () => {
    if (
      !newReward.company_name ||
      !newReward.setting_keyword ||
      !newReward.final_keyword ||
      !newReward.work_volume ||
      !newReward.place_code ||
      !newReward.start_date ||
      !newReward.end_date
    ) {
      alert("All fields are required");
      return;
    }

    try {
      const addedRow = await addReward({
        username: user.username,
        company_name: newReward.company_name,
        setting_keyword: newReward.setting_keyword,
        final_keyword: newReward.final_keyword,
        place_code: newReward.place_code,
        work_volume: newReward.work_volume,
        start_date: newReward.start_date,
        end_date: newReward.end_date,
      });
      setRows((prevRows) => [...prevRows, addedRow]);
      handleCloseAddModal();
    } catch (error) {
      console.error("Error adding reward:", error);
      alert("Error adding reward");
    }
  };

  const handleEditSave = async () => {
    try {
      const updatedRow = await editReward(editRow);
      setRows((prevRows) =>
        prevRows.map((row) => (row.idx === updatedRow.idx ? updatedRow : row))
      );
      handleCloseEditModal();
    } catch (error) {
      console.error("Error editing reward:", error);
      alert("Error editing reward");
    }
  };

  const handleExtendSave = async () => {
    try {
      const updatedRow = await extendReward(extendRow.idx, extendRow.end_date);
      console.log(updatedRow);
      setRows((prevRows) =>
        prevRows.map((row) => (row.idx === updatedRow.idx ? updatedRow : row))
      );
      handleCloseExtendModal();
    } catch (error) {
      console.error("Error extending reward:", error);
      alert("Error extending reward");
    }
  };

  const handleExtendMultipleSave = async () => {
    try {
      const updatedRows = await extendMultipleRewards(
        selectionModel,
        extendRowsEndDate
      );
      setRows((prevRows) =>
        prevRows.map(
          (row) =>
            updatedRows.find((updatedRow) => updatedRow.idx === row.idx) || row
        )
      );
      handleCloseExtendMultipleModal();
    } catch (error) {
      console.error("Error extending multiple rewards:", error);
      alert("Error extending multiple rewards");
    }
  };

  const handleDeleteRow = async () => {
    try {
      await deleteReward([deleteRow.idx]);
      setRows((prevRows) =>
        prevRows.filter((row) => row.idx !== deleteRow.idx)
      );
      handleCloseDeleteDialog();
    } catch (error) {
      console.error("Error deleting reward:", error);
      alert("Error deleting reward");
    }
  };

  const handleOpenDeleteDialog = (row) => {
    setDeleteRow(row);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setDeleteRow(null);
  };

  const handleDeleteRows = async () => {
    if (selectionModel.length === 0) {
      alert("삭제할 항목을 선택하세요.");
      return;
    }

    try {
      await deleteReward(selectionModel);
      const updatedRows = rows.filter(
        (row) => !selectionModel.includes(row.idx)
      );
      setRows(updatedRows);
      setSelectionModel([]);
    } catch (error) {
      console.error("Error deleting rewards:", error);
      alert("Error deleting rewards");
    }
  };

  const handleCellClick = (params) => {
    if (params.value === "") {
      setCellModesModel({
        ...cellModesModel,
        [params.id]: {
          ...cellModesModel[params.id],
          [params.field]: { mode: "edit" },
        },
      });
    }
  };

  const handleUsedStatusChange = async (idx, newStatus) => {
    try {
      const updatedRow = await updateUsedStatus(idx, newStatus);
      setRows((prevRows) =>
        prevRows.map((row) => (row.idx === updatedRow.idx ? updatedRow : row))
      );
    } catch (error) {
      console.error("Error updating used status:", error);
      alert("Error updating used status");
    }
  };

  const processRowUpdate = (newRow, oldRow) => {
    const updatedRows = rows.map((row) =>
      row.id === oldRow.id ? newRow : row
    );
    setRows(updatedRows);
    return newRow;
  };

  const getRowClassName = (params) => {
    const startDate = dayjs(params.row.start_date);
    const endDate = dayjs(params.row.end_date);
    const diff = endDate.diff(startDate, "day");

    if (diff <= 0) {
      return "expired";
    } else if (diff <= 3) {
      return "near-expired";
    }
    return "";
  };

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
          }}
          className={classes.root}
          autoHeight
          autoWidth
          getRowHeight={() => "auto"}
          getRowClassName={getRowClassName}
          rows={rows}
          columns={getColumns(
            handleOpenDeleteDialog,
            handleOpenExtendModal,
            handleOpenEditModal,
            handleUsedStatusChange
          )}
          density="compact"
          getRowId={(row) => row.idx}
          hideFooter={false}
          checkboxSelection
          cellModesModel={cellModesModel}
          onCellClick={handleCellClick}
          processRowUpdate={processRowUpdate}
          onRowSelectionModelChange={(newSelection) => {
            setSelectionModel(newSelection);
          }}
          selectionModel={selectionModel}
          columnVisibilityModel={columnVisibilityModel}
          onColumnVisibilityModelChange={(newModel) =>
            setColumnVisibilityModel(newModel)
          }
        />
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            marginTop: "16px",
          }}
        >
          <Button
            variant="contained"
            color="warning"
            style={{ marginRight: "8px" }}
            onClick={handleOpenExtendMultipleModal}
          >
            {selectionModel.length === 0
              ? "선택 연장"
              : `${selectionModel.length}개 연장`}
          </Button>
          <Button
            variant="contained"
            color="primary"
            style={{ marginRight: "8px" }}
            onClick={handleDeleteRows}
          >
            {selectionModel.length === 0
              ? "선택 삭제"
              : `${selectionModel.length}개 삭제`}
          </Button>
          <Button variant="contained" color="success" onClick={handleAddRow}>
            추가
          </Button>
        </div>
        <AddRewardModal
          open={openAddModal}
          onClose={handleCloseAddModal}
          newReward={newReward}
          handleChange={handleChange}
          handleDateChange={handleDateChange}
          handleSave={handleSave}
        />
        <ExtendRewardModal
          open={openExtendModal}
          onClose={() => setOpenExtendModal(false)}
          reward={extendRow}
          setReward={setExtendRow}
          onSave={handleExtendSave}
        />
        <ExtendMultipleRewardsModal
          open={openExtendMultipleModal}
          onClose={handleCloseExtendMultipleModal}
          selectedRows={selectionModel.map((idx) =>
            rows.find((row) => row.idx === idx)
          )}
          userPoints={user.point}
          handleExtendMultipleSave={handleExtendMultipleSave}
          extendRowsEndDate={extendRowsEndDate}
          setExtendRowsEndDate={setExtendRowsEndDate}
        />
        <EditRewardModal
          open={openEditModal}
          onClose={handleCloseEditModal}
          editRow={editRow}
          handleEditChange={handleEditChange}
          handleEditSave={handleEditSave}
        />
        <DeleteDialog
          open={deleteDialogOpen}
          onClose={handleCloseDeleteDialog}
          handleDeleteRow={handleDeleteRow}
        />
      </Box>
    </div>
  );
};

export default RewardTable;

import React, { useState, useEffect, useContext} from 'react';
import { DataGridPro } from "@mui/x-data-grid-pro";
import { Box, TextField, Button, Typography } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import columns from './columns';
import { fetchPointHistory, fetchFilteredPointHistory } from '../api/index'; // API 호출을 위한 함수
import { makeStyles } from "@mui/styles";
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { UserContext } from "../login/UserContext";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiDataGrid-columnHeaders": {
      color: "white",
    },
    "& .MuiDataGrid-checkboxInput": {
      padding: 0,
    },
  },
  header: {
    backgroundColor: '#fff',
    padding: '8px 16px', // 높이 줄이기
  },
  searchContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '8px 16px', // 높이 줄이기
    marginBottom: '8px', 
  },
  leftContainer: {
    display: 'flex',
    flexGrow: 0.7,
  },
  centerContainer: {
    display: 'flex',
    flexGrow: 0.7
  },
  searchField: {
    flexGrow: 1,
    marginRight: '16px',
  },
  dateField: {
    marginRight: '16px',
    padding: '8px 4px',
  },
  button: {
    marginRight: '16px',
    height: '40px', // TextField small size height
  },
  slimBox: {
    height: '32px', // 슬림한 높이 설정
  }
}));

const PointTable = () => {
  const classes = useStyles();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [agency, setAgency] = useState('');
  const [company_name, setCompany_name] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [pageSize, setPageSize] = useState(25);
  const [page, setPage] = useState(0);
  const { user, setUser } = useContext(UserContext);
  const [columnVisibilityModel, setColumnVisibilityModel] = useState({
    id: false,
    reward_no: false, // id 컬럼을 숨깁니다
  });


  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchPointHistory(user); // API에서 데이터 가져오기
        setRows(data);
      } catch (error) {
        console.error("Error fetching point history:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  
  const handleCellClick = (params, event) => {
    event.stopPropagation(); 
  };

  const handleRowClick = (params, event) => {
    if (event.target.closest('.MuiCheckbox-root')) {
      return; 
    }
    event.stopPropagation(); 
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const data = await fetchFilteredPointHistory(agency, company_name, startDate, endDate, user.username, user.role);
      setRows(data);
    } catch (error) {
      console.error("Error fetching filtered point history:", error);
    } finally {
      setLoading(false);
    }
  };

  const refsetSearch = async () => {
    setLoading(true);
    try {
      const data = await fetchPointHistory(user);
      setRows(data);
      setAgency('');
      setCompany_name('');
      setStartDate(null);
      setEndDate(null);
    } catch (error) {
      console.error("Error fetching filtered point history:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (newPageSize) => {
    setPageSize(newPageSize);
  };

  return (
    <div style={{ width: "100%" }}>
      <Box className={classes.header}>
        <Typography variant="h4">포인트 충전</Typography>
        <Typography variant="body2" color="textSecondary">포인트 충전 / 목록</Typography>
      </Box>
      <Box className={classes.searchContainer}>
        <Box className={classes.leftContainer}>
          {
            user?.role === 'admin' ? 
            <>
            <TextField
            label={user?.roll === 'admin' ? "대행사 검색" : "업체명 검색" }
            value={agency}
            onChange={(e) => setAgency(e.target.value)}
            className={classes.searchField}
            size="small"
          />
          <Button variant="contained" color='success' onClick={handleSearch} className={classes.button} size="small">
          검색
        </Button>
        </>
          :<></>
          }
          <TextField
            label={"업체명 검색" }
            value={company_name}
            onChange={(e) => setCompany_name(e.target.value)}
            className={classes.searchField}
            size="small"
          />
          <Button variant="contained" color='success' onClick={handleSearch} className={classes.button} size="small">
            검색
          </Button>
        </Box>
        <Box className={classes.centerContainer}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="검색 시작일"
              value={startDate}
              onChange={(date) => setStartDate(date)}
              slotProps={{ textField: { size: 'small'},field: { format: 'YYYY/MM/DD' } }}
              inputFormat="YYYY/MM/DD"
              sx={{marginRight: '10px'}}
            />
            <DatePicker
              label="검색 종료일"
              value={endDate}
              onChange={(date) => setEndDate(date)}
              slotProps={{ textField: { size: 'small' },field: { format: 'YYYY/MM/DD' } }}
              inputFormat="YYYY/MM/DD"
              sx={{marginRight: '10px'}}
            />
          </LocalizationProvider>
          <Button variant="contained" color='success' onClick={handleSearch} className={classes.button} size="small">
            검색
          </Button>
          <Button variant="contained" color='info' onClick={refsetSearch} className={classes.button} size="small">
            새로고침
          </Button>
          <Button variant="contained" color='primary' className={classes.button} size="small">
            엑셀 다운로드
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          "& .super-app-theme--header": {
            backgroundColor: "black",
          },
          '& .MuiDataGrid-columnHeaders': {
            borderBottom: '1px solid #e0e0e0',
          },
          '& .MuiDataGrid-cell': {
            borderRight: '1px solid #e0e0e0',
            borderRightColor: 'lightgray'
          },
          '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
            borderRight: '1px solid #e0e0e0',
            borderRightColor: 'lightgray'
          }
        }}
      >
        <DataGridPro
          sx={{
            ".MuiDataGrid-columnHeaderTitleContainer": {
              backgroundColor: "black",
              color: "white",
            },
          }}
          className={classes.root}
          getRowHeight={() => "auto"}
          rows={rows}
          loading={loading}
          columns={columns}
          density="compact"
          autoHeight
          autoWidth
          disableColumnResize={true}
          getRowId={(row) => row.id}
          hideFooter={false}
          onCellClick={handleCellClick}
          onRowClick={handleRowClick}
          pagination
          columnVisibilityModel={columnVisibilityModel}
          paginationMode="client"
          pageSize={pageSize}
          rowsPerPageOptions={[25, 50, 100]}
          onPageSizeChange={handlePageSizeChange}
          page={page}
          onPageChange={handlePageChange}
          initialState={{
            pagination: { paginationModel: { pageSize: 25 } },
          }}
          localeText={{
            footerRowSelected: count => `${count.toLocaleString()}개 선택됨`,
            MuiTablePagination: {
              labelRowsPerPage: '표시 수:',
              labelDisplayedRows: ({ from, to, count }) =>
                `${from} - ${to} / ${count !== -1 ? count : `more than ${to}`}`,
            },
          }}
        />
      </Box>
    </div>
  );
};

export default PointTable;

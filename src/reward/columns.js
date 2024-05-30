import React from 'react';
import { Button, Switch, Chip,Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';

const renderUsedIcon = (params, handleUsedStatusChange) => {
  const handleClick = async () => {
    const newStatus = !params.value;
    await handleUsedStatusChange(params.row.idx, newStatus);
  };

  return (
    <Chip
      size='small'
      label={params.value ? 'ON' : 'OFF'}
      color={params.value ? 'success' : 'primary'}
      onClick={(event) => {
        event.stopPropagation();
        handleClick();
      }}
      clickable
    />
  );
};

const renderStatusChip = (status) => {
  let color;
  switch (status) {
    case '비활성화':
      color = 'default';
      break;
    case '요청':
      color = 'primary';
      break;
    case '진행':
      color = 'success';
      break;
    default:
      color = 'default';
  }

  return (
    <Chip size = 'small'label={status} color={color} />
  );
};

const renderCellWithWrap = (params) => {
  return (
    <Typography variant="caption" style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
      {params.value}
    </Typography>
  );
};

const getColumns = (handleOpenDeleteDialog, handleOpenExtendModal, handleOpenEditModal, handleUsedStatusChange) => [
  { field: 'idx', headerName: '번호',headerClassName: 'super-app-theme--header', flex: 0.1, align: 'center', headerAlign: 'center' ,renderCell: renderCellWithWrap },
  { field: 'id', headerName: '계정', headerClassName: 'super-app-theme--header',flex: 1, editable: true, align: 'center', headerAlign: 'center' ,renderCell: renderCellWithWrap },
  { field: 'reward_no', headerName: '리워드 번호.',headerClassName: 'super-app-theme--header', flex: 0.1, editable: true, align: 'center', headerAlign: 'center',renderCell: renderCellWithWrap  },
  { field: 'reward_type', headerName: '리워드 종류', headerClassName: 'super-app-theme--header',minWidth:95,flex: 0.1, editable: true, align: 'center', headerAlign: 'center',renderCell: renderCellWithWrap  },
  {
    field: 'used',
    headerName: '사용여부',
    headerClassName: 'super-app-theme--header',
    flex: 1,
    editable: true,
    align: 'center',
    headerAlign: 'center',
    renderCell: (params) => renderUsedIcon(params, handleUsedStatusChange),
  },
  {
    field: 'status',
    headerName: '상태',
    headerClassName: 'super-app-theme--header',
    flex: 1,
    editable: true,
    align: 'center',
    headerAlign: 'center',
    renderCell: (params) => renderStatusChip(params.value),
  },
  { field: 'company_name', headerName: '업체명', headerClassName: 'super-app-theme--header',flex: 1, editable: true, align: 'center', headerAlign: 'center', renderCell: renderCellWithWrap  },
  { field: 'place_code', headerName: '플레이스코드', headerClassName: 'super-app-theme--header',flex: 0.1, editable: true, align: 'center', headerAlign: 'center',renderCell: renderCellWithWrap  },
  { field: 'setting_keyword', headerName: '셋팅 키워드', headerClassName: 'super-app-theme--header',flex: 1, editable: true, align: 'center', headerAlign: 'center', renderCell: renderCellWithWrap },
  { field: 'final_keyword', headerName: '최종 키워드', headerClassName: 'super-app-theme--header',flex: 1, editable: true, align: 'center', headerAlign: 'center', renderCell: renderCellWithWrap  }, 
  { field: 'start_date', headerName: '시작일', headerClassName: 'super-app-theme--header', minWidth:100,flex: 0.1, editable: true, type: 'date', align: 'center', headerAlign: 'center'},
  { field: 'end_date', headerName: '종료일',  headerClassName: 'super-app-theme--header',minWidth:100,flex: 0.1, editable: true, type: 'date', align: 'center', headerAlign: 'center' },
  { field: 'work_volume', headerName: '일 작업량', headerClassName: 'super-app-theme--header', flex: 1, editable: true, align: 'center', headerAlign: 'center',renderCell: renderCellWithWrap },
  {
    field: 'actions',
    headerName: '동작',
    headerClassName: 'super-app-theme--header',
    flex: 3,
    align: 'center',
    headerAlign: 'center',
    renderCell: (params) => (
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px' }}>
        <Button
          color="inherit"
          size="small"
          fullWidth
          onClick={(event) => {
            event.stopPropagation();
            handleOpenEditModal(params.row)
          }}
        >
          수정
        </Button>
        <Button
          color="inherit"
          size="small"
          fullWidth
          onClick={(event) => {
            event.stopPropagation();
            handleOpenDeleteDialog(params.row);
          }}
        >
          삭제
        </Button>
        <Button
          color="inherit"
          size="small"
          fullWidth
          onClick={(event) => {
            event.stopPropagation();
            handleOpenExtendModal(params.row);
          }}
        >
          연장
        </Button>
      </div>
    ),
  },
  
];

export default getColumns;

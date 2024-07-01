import React from 'react';
import { Button, Switch, Chip,Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';



const renderStatusChip = (status) => {
  let color;
  switch (status) {
    case '비활성화':
      color = 'default';
      break;
    case '요청':
      color = 'primary';
      break;
    case '활성화':
      color = 'success';
      break;
    default:
      color = 'default';
  }

  return (
    <Chip size = 'small'label={status} color={color}      onClick={(event) => {event.stopPropagation()}} />
  );
};

const renderCellWithWrap = (params,handleOpenWorkVolumeModal) => {
  return (
    <Typography variant="caption" style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}       onClick={(event) => {
      event.stopPropagation();
    }}>
      {params.value}
    </Typography>
  );
};

const getColumns = (handleOpenDeleteDialog, handleOpenExtendModal, handleOpenEditModal, handleUsedStatusChange, handleOpenWorkVolumeModal) => [
  { field: 'idx', headerName: '번호',headerClassName: 'super-app-theme--header', flex: 0.1, align: 'center', headerAlign: 'center' ,renderCell: renderCellWithWrap },
  { field: 'id', headerName: '계정', headerClassName: 'super-app-theme--header',flex: 1, editable: true, align: 'center', headerAlign: 'center' ,renderCell: renderCellWithWrap },
  { field: 'reward_no', headerName: '리워드 번호.',headerClassName: 'super-app-theme--header', flex: 0.1, editable: true, align: 'center', headerAlign: 'center',renderCell: renderCellWithWrap  },
  { field: 'reward_type', headerName: '리워드 종류', headerClassName: 'super-app-theme--header',minWidth:95,flex: 0.1, editable: true, align: 'center', headerAlign: 'center',renderCell: renderCellWithWrap  },
  {
    field: 'status',
    headerName: '상태',
    headerClassName: 'super-app-theme--header',
    flex: 0.6,
    editable: true,
    align: 'center',
    headerAlign: 'center',
    renderCell: (params) => renderStatusChip(params.value),
  },
  { field: 'company_name', headerName: '업체명', headerClassName: 'super-app-theme--header',flex: 1, editable: true, align: 'center', headerAlign: 'center', renderCell: renderCellWithWrap, },
  { field: 'place_code', headerName: '플레이스코드', headerClassName: 'super-app-theme--header',flex: 1, editable: true, align: 'center', headerAlign: 'center',renderCell: renderCellWithWrap  },
  { field: 'setting_keyword', headerName: '셋팅 키워드', headerClassName: 'super-app-theme--header',flex: 1, editable: true, align: 'center', headerAlign: 'center', renderCell: renderCellWithWrap },
  { field: 'final_keyword', headerName: '최종 키워드', headerClassName: 'super-app-theme--header',flex: 1, editable: true, align: 'center', headerAlign: 'center', renderCell: renderCellWithWrap  }, 
  { field: 'start_date', headerName: '시작일', headerClassName: 'super-app-theme--header', minWidth:100,flex: 0.1, editable: true, type: 'date', align: 'center', headerAlign: 'center'},
  { field: 'end_date', headerName: '종료일',  headerClassName: 'super-app-theme--header',minWidth:100,flex: 0.1, editable: true, type: 'date', align: 'center', headerAlign: 'center' },
  { 
    field: 'work_volume',
    headerName: '일 작업량',
    headerClassName: 'super-app-theme--header',
    flex: 0.5,
    editable: true,
    align: 'center',
    headerAlign: 'center',
    renderCell: (params) => (
        <Typography variant="caption" style={{ whiteSpace: 'normal', wordWrap: 'break-word' }} onClick={(event) => {
          event.stopPropagation();
        }}>
          {params.value}
        </Typography>
    )
  },
  {
    field: 'actions',
    headerName: '동작',
    headerClassName: 'super-app-theme--header',
    flex: 1.4,
    align: 'center',
    headerAlign: 'center',
    renderCell: (params) => (
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5px' }}>
        <Button
          size="small"
          sx={{ minWidth: '30px', padding: '4px' }}
          onClick={(event) => {
            event.stopPropagation();
            handleOpenEditModal(params.row)
          }}
        >
          수정
        </Button>
        <Button
          size="small"
          sx={{ minWidth: '30px', padding: '4px' }}
          onClick={(event) => {
            event.stopPropagation();
            handleOpenDeleteDialog(params.row);
          }}
        >
          삭제
        </Button>
        <Button
          size="small"
          sx={{ minWidth: '30px', padding: '4px' }}
          onClick={(event) => {
            event.stopPropagation();
            handleOpenExtendModal(params.row);
          }}
        >
          연장
        </Button>
        <Button
          size="small"
          sx={{ minWidth: '30px', padding: '4px' }}
          onClick={(event) => {
            event.stopPropagation();
            handleOpenWorkVolumeModal(params.row.idx);
          }}
        >
          로그
        </Button>
      </div>
    ),
  },
  
];

export default getColumns;

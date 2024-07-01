import React from 'react';
import { Button } from '@mui/material';

const columns = (handleEditClick) => [
  { field: 'id', headerName: '번호1', headerClassName: 'super-app-theme--header',flex: 1, hide: true, align: 'center', headerAlign: 'center' },
  { field: 'idx', headerName: '번호', headerClassName: 'super-app-theme--header',flex: 0.5, editable: true, align: 'center', headerAlign: 'center'},
  { field: 'username', headerName: '아이디',headerClassName: 'super-app-theme--header', flex: 2, editable: true , align: 'center', headerAlign: 'center'},
  { field: 'point', headerName: 'Points', headerClassName: 'super-app-theme--header',flex: 2, editable: true , align: 'center', headerAlign: 'center'},
  { field: 'agency', headerName: '대행사', headerClassName: 'super-app-theme--header',flex: 2, editable: true, align: 'center', headerAlign: 'center' },
  { field: 'created_at', headerName: '생성일자', headerClassName: 'super-app-theme--header',flex: 2, editable: true, type: 'date', align: 'center', headerAlign: 'center' },
  {
    field: 'actions',
    headerName: 'Actions',
    type: 'actions',
    width: 100,
    headerClassName: 'super-app-theme--header',
    renderCell: (params) => (
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px' }}>
        <Button
          size="small"
          onClick={(event) => {
            event.stopPropagation();
            handleEditClick(params.row);
          }}
        >
          수정
        </Button>
        </div>
    )
  },
];

export default columns;

import React from 'react';
import { Button } from '@mui/material';
import { GridActionsCellItem } from '@mui/x-data-grid-pro';

const handleEdit = (id) => {
  console.log(`Edit row with id: ${id}`);
};

const columns = [
  { field: 'id', headerName: '번호1', flex: 1, hide: true, align: 'center', headerAlign: 'center' },
  { field: 'idx', headerName: '번호', flex: 0.5, editable: true, align: 'center', headerAlign: 'center'},
  { field: 'username', headerName: '아이디', flex: 2, editable: true , align: 'center', headerAlign: 'center'},
  { field: 'point', headerName: 'Points', flex: 2, editable: true , align: 'center', headerAlign: 'center'},
  { field: 'created_at', headerName: '생성일자', flex: 2, editable: true, type: 'date', align: 'center', headerAlign: 'center' },
  {
    field: 'actions',
    headerName: 'Actions',
    type: 'actions',
    width: 100,
    getActions: (params) => [
      <GridActionsCellItem
        icon={<Button variant="contained" color="primary">Edit</Button>}
        label="Edit"
        onClick={() => handleEdit(params.row)}
      />
    ],
  },
];

export default columns;

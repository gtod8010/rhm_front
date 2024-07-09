import React, { useState, useEffect } from 'react';
import { Modal, Box } from '@mui/material';
import { DataGridPro } from '@mui/x-data-grid-pro';
import { fetchWorkVolumeHistory } from '../../api/index'; // API 함수 가져오기


const WorkVolumeModal = ({ open, onClose, rewardId }) => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (open && rewardId) {
      fetchWorkVolumeHistory(rewardId).then(data => {
        setRows(data);
        setLoading(false);
      });
    }
  }, [open, rewardId]);


  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '30vw',
        height: '80vh',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 2,
      }}>
        <DataGridPro
          rows={rows}
          columns={[
            { 
              field: 'gender', 
              headerName: '성별', 
              headerAlign: 'center', 
              flex: 1, 
              align: 'center',
              valueGetter: (params) => 
              // console.log(params)

              params === '남' ? '남성' : '여성'
            },
            { field: 'age_group', headerName: '연령대', headerAlign:'center',flex: 1,align:'center' },
            { field: 'ip_address', headerName: '접속 IP', headerAlign:'center',flex: 1,align:'center' },
            { field: 'access_time', headerName: '시간', headerAlign:'center',flex: 1.5, type: 'dateTime',align:'center' },
          ]}
          loading={loading}
          autoHeight={false}
          autoWidth
          pageSize={25}
          rowsPerPageOptions={[25, 50, 100]}
        />
      </Box>
    </Modal>
  );
};

export default WorkVolumeModal;

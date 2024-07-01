const rewardHistoryColumns = [
    { field: 'date', headerName: '리워드 변경일', flex: 1, align: 'center', headerAlign: 'center', type: 'date', headerClassName: 'super-app-theme--header',
      renderCell: (params) => {
        const date = new Date(params.value);
        return date.toLocaleString(); // 날짜와 시간을 로컬 형식으로 표시
      }
    },
    { field: 'id', headerName: '변경 ID', flex: 0.5, align: 'center', headerAlign: 'center', headerClassName: 'super-app-theme--header' },
    { field: 'username', headerName: '대행사', flex: 1, align: 'center', headerAlign: 'center', headerClassName: 'super-app-theme--header' },
    { field: 'company_name', headerName: '업체명', flex: 1.5, align: 'center', headerAlign: 'center', headerClassName: 'super-app-theme--header' },
    { field: 'category', headerName: '구분', flex: 3, align: 'center', headerAlign: 'center', headerClassName: 'super-app-theme--header' },
    { field: 'points', headerName: '포인트', flex: 0.5, align: 'center', headerAlign: 'center', headerClassName: 'super-app-theme--header' },
  ];
  
  export default rewardHistoryColumns;
  
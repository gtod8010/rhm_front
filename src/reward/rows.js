const rows = [
    // 예시 데이터
    { id: 1, rewardNo: '001', rewardType: 'Type A', used: 'Yes', status: true, companyName: 'Company A', placeCode: 'P001', settingKeyword: 'Keyword1', finalKeyword: 'KeywordFinal1', startDate: '2024-05-01', endDate: '2024-05-20', workVolume: '10' },
    { id: 2, rewardNo: '002', rewardType: 'Type B', used: 'No', status: false, companyName: 'Company B', placeCode: 'P002', settingKeyword: 'Keyword2', finalKeyword: 'KeywordFinal2', startDate: '2024-06-01', endDate: '2024-06-20', workVolume: '20' },
    { id: 3, rewardNo: '002', rewardType: 'Type B', used: 'No', status: false, companyName: 'Company B', placeCode: 'P002', settingKeyword: 'Keyword2', finalKeyword: 'KeywordFinal2', startDate: '2024-06-01', endDate: '2024-06-20', workVolume: '20' },
    { id: 4, rewardNo: '002', rewardType: 'Type B', used: 'No', status: false, companyName: 'Company B', placeCode: 'P002', settingKeyword: 'Keyword2', finalKeyword: 'KeywordFinal2', startDate: '2024-06-01', endDate: '2024-06-20', workVolume: '20' },
    { id: 5, rewardNo: '002', rewardType: 'Type B', used: 'No', status: false, companyName: 'Company B', placeCode: 'P002', settingKeyword: 'Keyword2', finalKeyword: 'KeywordFinal2', startDate: '2024-06-01', endDate: '2024-06-20', workVolume: '20' },
    { id: 6, rewardNo: '002', rewardType: 'Type B', used: 'No', status: false, companyName: 'Company B', placeCode: 'P002', settingKeyword: 'Keyword2', finalKeyword: 'KeywordFinal2', startDate: '2024-06-01', endDate: '2024-06-20', workVolume: '20' },
    { id: 7, rewardNo: '002', rewardType: 'Type B', used: 'No', status: false, companyName: 'Company B', placeCode: 'P002', settingKeyword: 'Keyword2', finalKeyword: 'KeywordFinal2', startDate: '2024-06-01', endDate: '2024-06-20', workVolume: '20' },
    { id: 8, rewardNo: '002', rewardType: 'Type B', used: 'No', status: false, companyName: 'Company B', placeCode: 'P002', settingKeyword: 'Keyword2', finalKeyword: 'KeywordFinal2', startDate: '2024-06-01', endDate: '2024-06-20', workVolume: '20' },
    { id: 9, rewardNo: '002', rewardType: 'Type B', used: 'No', status: false, companyName: 'Company B', placeCode: 'P002', settingKeyword: 'Keyword2', finalKeyword: 'KeywordFinal2', startDate: '2024-06-01', endDate: '2024-06-20', workVolume: '20' },
    { id: 10, rewardNo: '002', rewardType: 'Type B', used: 'No', status: false, companyName: 'Company B', placeCode: 'P002', settingKeyword: 'Keyword2', finalKeyword: 'KeywordFinal2', startDate: '2024-06-01', endDate: '2024-06-20', workVolume: '20' },
    { id: 11, rewardNo: '002', rewardType: 'Type B', used: 'No', status: false, companyName: 'Company B', placeCode: 'P002', settingKeyword: 'Keyword2', finalKeyword: 'KeywordFinal2', startDate: '2024-06-01', endDate: '2024-06-20', workVolume: '20' },
    { id: 12, rewardNo: '002', rewardType: 'Type B', used: 'No', status: false, companyName: 'Company B', placeCode: 'P002', settingKeyword: 'Keyword2', finalKeyword: 'KeywordFinal2', startDate: '2024-06-01', endDate: '2024-06-20', workVolume: '20' },
    { id: 13, rewardNo: '002', rewardType: 'Type B', used: 'No', status: false, companyName: 'Company B', placeCode: 'P002', settingKeyword: 'Keyword2', finalKeyword: 'KeywordFinal2', startDate: '2024-06-01', endDate: '2024-06-20', workVolume: '20' },
    { id: 14, rewardNo: '002', rewardType: 'Type B', used: 'No', status: false, companyName: 'Company B', placeCode: 'P002', settingKeyword: 'Keyword2', finalKeyword: 'KeywordFinal2', startDate: '2024-06-01', endDate: '2024-06-20', workVolume: '20' },
    { id: 15, rewardNo: '002', rewardType: 'Type B', used: 'No', status: false, companyName: 'Company B', placeCode: 'P002', settingKeyword: 'Keyword2', finalKeyword: 'KeywordFinal2', startDate: '2024-06-01', endDate: '2024-06-20', workVolume: '20' },
    { id: 16, rewardNo: '002', rewardType: 'Type B', used: 'No', status: false, companyName: 'Company B', placeCode: 'P002', settingKeyword: 'Keyword2', finalKeyword: 'KeywordFinal2', startDate: '2024-06-01', endDate: '2024-06-20', workVolume: '20' },
    { id: 17, rewardNo: '002', rewardType: 'Type B', used: 'No', status: false, companyName: 'Company B', placeCode: 'P002', settingKeyword: 'Keyword2', finalKeyword: 'KeywordFinal2', startDate: '2024-06-01', endDate: '2024-06-20', workVolume: '20' },
    { id: 18, rewardNo: '002', rewardType: 'Type B', used: 'No', status: false, companyName: 'Company B', placeCode: 'P002', settingKeyword: 'Keyword2', finalKeyword: 'KeywordFinal2', startDate: '2024-06-01', endDate: '2024-06-20', workVolume: '20' },
    { id: 19, rewardNo: '002', rewardType: 'Type B', used: 'No', status: false, companyName: 'Company B', placeCode: 'P002', settingKeyword: 'Keyword2', finalKeyword: 'KeywordFinal2', startDate: '2024-06-01', endDate: '2024-06-20', workVolume: '20' },
    { id: 20, rewardNo: '002', rewardType: 'Type B', used: 'No', status: false, companyName: 'Company B', placeCode: 'P002', settingKeyword: 'Keyword2', finalKeyword: 'KeywordFinal2', startDate: '2024-06-01', endDate: '2024-06-20', workVolume: '20' },
    { id: 21, rewardNo: '002', rewardType: 'Type B', used: 'No', status: false, companyName: 'Company B', placeCode: 'P002', settingKeyword: 'Keyword2', finalKeyword: 'KeywordFinal2', startDate: '2024-06-01', endDate: '2024-06-20', workVolume: '20' },
    { id: 22, rewardNo: '002', rewardType: 'Type B', used: 'No', status: false, companyName: 'Company B', placeCode: 'P002', settingKeyword: 'Keyword2', finalKeyword: 'KeywordFinal2', startDate: '2024-06-01', endDate: '2024-06-20', workVolume: '20' },
    { id: 23, rewardNo: '002', rewardType: 'Type B', used: 'No', status: false, companyName: 'Company B', placeCode: 'P002', settingKeyword: 'Keyword2', finalKeyword: 'KeywordFinal2', startDate: '2024-06-01', endDate: '2024-06-20', workVolume: '20' },
    { id: 24, rewardNo: '002', rewardType: 'Type B', used: 'No', status: false, companyName: 'Company B', placeCode: 'P002', settingKeyword: 'Keyword2', finalKeyword: 'KeywordFinal2', startDate: '2024-06-01', endDate: '2024-06-20', workVolume: '20' },
    { id: 25, rewardNo: '002', rewardType: 'Type B', used: 'No', status: false, companyName: 'Company B', placeCode: 'P002', settingKeyword: 'Keyword2', finalKeyword: 'KeywordFinal2', startDate: '2024-06-01', endDate: '2024-06-20', workVolume: '20' },
  
  ];

  export default rows

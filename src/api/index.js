import axios from 'axios';
import dayjs from 'dayjs';


// -------------------------------------- login -------------------------------------- //


export const setLogin = async (username, password) => {
  try {
    const response = await axios.post('/api/login', { username, password });
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.userInfo)); // 사용자 정보를 로컬 스토리지에 저장
    return response.data.userInfo; // 사용자 정보를 반환
  } catch (error) {
    console.error('Login error', error);
    throw error;
  }
};

// -------------------------------------- member -------------------------------------- //


export const fetchMembers = async (username) => {
  const response = await axios.post('/api/members', { username });
  return response.data.map((row, index) => ({ ...row, idx: index + 1, created_at : new Date(row.created_at) }));

};

export const addMember = async (newRow) => {
  const response = await axios.post('/api/addMember', newRow);
  return response.data;
};

export const deleteMembers = async (idsToDelete) => {
  await axios.post('/api/deleteMembers', { ids: idsToDelete });
};

export const editMember = async (editMemberData) => {
  const response = await axios.post('/api/editMember', editMemberData);
  return response.data;
};

// -------------------------------------- reward -------------------------------------- //

export const getRewards = async (username) => {
  const response = await axios.post('/api/getRewards', { username });
  return response.data.map(item => ({
    ...item,
    start_date: new Date(item.start_date),
    end_date: new Date(item.end_date),
  }));
};

export const addReward = async (rewardData) => {
  const response = await axios.post('/api/addReward', rewardData);
  return {
    ...response.data,
    start_date: new Date(response.data.start_date),
    end_date: new Date(response.data.end_date)
  };
};

export const editReward = async (rewardData) => {
  const response = await axios.post('/api/editReward', rewardData);
  return{
    ...response.data,
    start_date: new Date(response.data.start_date),
    end_date: new Date(response.data.end_date)
 }
  
};

export const extendReward = async (idx, end_date) => {
  const response = await axios.post('/api/extendReward',{idx,end_date})
      return {
      ...response.data,
      start_date: new Date(response.data.start_date),
      end_date: new Date(response.data.end_date)
    }
};


export const extendMultipleRewards = async (selectionModel, endDate) => {
  const updatedRows = await Promise.all(
    selectionModel.map(async (idx) => {
      const response = await axios.post('/api/extendReward', {
        idx: idx,
        end_date: endDate,
      });
      return {
        ...response.data,
        start_date: new Date(response.data.start_date),
        end_date: new Date(response.data.end_date)
      }
    })
  );
  return updatedRows;
};

export const deleteReward = async (ids) => {
  await axios.post('/api/deleteRewards', { ids });
};

// -------------------------------------- status --------------------------------------

export const updateUsedStatus = async (idx, newStatus) => {
  const response = await axios.post('/api/updateUsedStatus', { idx, used: newStatus });
  return{
    ...response.data,
    start_date: new Date(response.data.start_date),
    end_date: new Date(response.data.end_date)
 }
};

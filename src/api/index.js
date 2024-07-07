import axios from "axios";
import dayjs from "dayjs";

const isWithinRestrictedHours = () => {
  const now = dayjs();
  const start = dayjs().hour(15).minute(30);
  const end = dayjs().hour(8).minute(0).add(1, "day");

  return now.isAfter(start) && now.isBefore(end);
};

const makeRequest = async (requestFunc, ...args) => {
  if (isWithinRestrictedHours()) {
    alert("마감시간을 넘어 작업이 불가능합니다.")
    throw new Error("Requests are not allowed between 5 PM and 8 AM.");
  }
  return await requestFunc(...args);
};

// -------------------------------------- login -------------------------------------- //

export const setLogin = async (username, password) => {
  try {
    const response = await axios.post("/api/login", { username, password });
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.userInfo)); // 사용자 정보를 로컬 스토리지에 저장
    return response.data.userInfo; // 사용자 정보를 반환
  } catch (error) {
    console.error("Login error", error);
    throw error;
  }
};

// -------------------------------------- member -------------------------------------- //

export const fetchMembers = async (username) => {
  const response = await axios.post("/api/members", { username });
  return response.data.map((row, index) => ({
    ...row,
    idx: index + 1,
    created_at: new Date(row.created_at),
  }));
};

export const getMember = async (username) => {
  const response = await axios.post("/api/getMember", { username });
  return response.data;
};

export const addMember = async (newRow) => {
    const response = await axios.post("/api/addMember", newRow);
    return {
      ...response.data,
      created_at: new Date(response.data.created_at),
    };
};

export const deleteMembers = async (idsToDelete) => {
    await axios.post("/api/deleteMembers", { ids: idsToDelete });
};

export const editMember = async (editMemberData) => {
    const response = await axios.post("/api/editMember", editMemberData);
    return {
      ...response.data,
      created_at: new Date(response.data.created_at),
    };
};

// -------------------------------------- reward -------------------------------------- //

export const getRewards = async (username) => {
  const response = await axios.post("/api/getRewards", { username });
  return response.data.map((item) => ({
    ...item,
    start_date: new Date(item.start_date),
    end_date: new Date(item.end_date),
  }));
};

export const addReward = async (rewardData) => {
  return makeRequest(async () => {
    const response = await axios.post("/api/addReward", rewardData);
    return {
      ...response.data,
      start_date: new Date(response.data.start_date),
      end_date: new Date(response.data.end_date),
    };
  });
};

export const editReward = async (rewardData) => {
  return makeRequest(async () => {
    const response = await axios.post("/api/editReward", rewardData);
    return {
      ...response.data,
      start_date: new Date(response.data.start_date),
      end_date: new Date(response.data.end_date),
    };
  });
};

export const extendReward = async (idx, end_date) => {
  return makeRequest(async () => {
    const response = await axios.post("/api/extendReward", { idx, end_date });
    return {
      ...response.data,
      start_date: new Date(response.data.start_date),
      end_date: new Date(response.data.end_date),
    };
  });
};

export const extendMultipleRewards = async (selectionModel, endDate) => {
  return makeRequest(async () => {
    const updatedRows = await Promise.all(
      selectionModel.map(async (idx) => {
        const response = await axios.post("/api/extendReward", {
          idx: idx,
          end_date: endDate,
        });
        return {
          ...response.data,
          start_date: new Date(response.data.start_date),
          end_date: new Date(response.data.end_date),
        };
      })
    );
    return updatedRows;
  });
};

export const deleteReward = async (ids) => {
  return makeRequest(async () => {
    await axios.post("/api/deleteRewards", { ids });
  });
};

// -------------------------------------- status --------------------------------------

export const updateUsedStatus = async (idx, newStatus) => {
  return makeRequest(async () => {
    const response = await axios.post("/api/updateUsedStatus", {
      idx,
      used: newStatus,
    });
    return {
      ...response.data,
      start_date: new Date(response.data.start_date),
      end_date: new Date(response.data.end_date),
    };
  });
};

// -------------------------------------- point --------------------------------------

export const fetchPointHistory = async (user) => {
  const response = await axios.post("/api/pointHistory", user);
  console.log(response);
  return response.data.map((item) => ({
    ...item,
    date: new Date(item.date),
    point: item.point >= 0 ? `+${item.point}` : item.point.toString(),
  }));
};

export const fetchFilteredPointHistory = async (
  agency,
  company_name,
  startDate,
  endDate,
  username,
  role
) => {
  return makeRequest(async () => {
    const response = await axios.post("/api/filteredPointHistory", {
      agency,
      company_name,
      startDate,
      endDate,
      username,
      role,
    });
    return response.data.map((item) => ({
      ...item,
      date: new Date(item.date),
      point: item.point >= 0 ? `+${item.point}` : item.point.toString(),
    }));
  });
};

// -------------------------------------- rewardHistory --------------------------------------

export const fetchRewardHistory = async (user) => {
  return makeRequest(async () => {
    try {
      const response = await axios.post("/api/rewardHistory", {
        username: user.username,
        role: user.role,
      });
      return response.data.map((item) => ({
        ...item,
        date: new Date(item.date),
      }));
    } catch (error) {
      console.error("Error fetching reward history:", error);
      throw error;
    }
  });
};

export const fetchFilteredRewardHistory = async (
  agency,
  companyName,
  startDate,
  endDate,
  username,
  role
) => {
  return makeRequest(async () => {
    try {
      const response = await axios.post("/api/filteredRewardHistory", {
        agency,
        companyName,
        startDate,
        endDate,
        username,
        role,
      });
      return response.data.map((item) => ({
        ...item,
        date: new Date(item.date),
      }));
    } catch (error) {
      console.error("Error fetching filtered reward history:", error);
      throw error;
    }
  });
};

export const fetchWorkVolumeHistory = async (rewardId) => {
  return makeRequest(async () => {
    try {
      const response = await axios.get(`/api/workVolumeHistory/${rewardId}`);
      return response.data.map((item) => ({
        ...item,
        access_time: new Date(item.access_time),
      }));
    } catch (error) {
      console.error("Error fetching work volume history:", error);
      throw error;
    }
  });
};

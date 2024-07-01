import React, { lazy, Suspense, useContext, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './layout/Layout';
import { UserContext } from './login/UserContext';

const RewardTable = lazy(() => import('./reward/RewardTable'));
const MemberTable = lazy(() => import('./member/MemberTable'));
const PointTable = lazy(()=> import('./point/PointTable'));
const RewardHistoryTable = lazy(()=> import('./rewardHistory/RewardHistoryTable'));
const Login = lazy(() => import('./login/Login'));

const MainRoute = () => {
  const { user, setUser } = useContext(UserContext);

  // useEffect(() => {
  //   const storedUser = localStorage.getItem('user');
  //   if (storedUser) {
  //     setUser(JSON.parse(storedUser));
  //   }
  // }, [setUser]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={user ? <Navigate to="/reward" /> : <Login />} />
        <Route element={<Layout />}>
          <Route path="/reward" element={<RewardTable />} />
          <Route path="/member" element={<MemberTable />} />
          <Route path="/point" element={<PointTable/>} />
          <Route path="/Rewardhistory" element={<RewardHistoryTable/>} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Suspense>
  );
};

export default MainRoute;

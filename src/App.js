import { useEffect, useState } from "react";
import Table from "./components/Table";
import Loader from "./Loader/Loader";
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsersData } from "./redux/userSlice";

import { Route, Routes } from 'react-router';
import UserDetail from "./components/UserDetail";
// import { useGetUsersQuery } from "./redux/api";


function App() {
  // const { data = [], isLoading } = useGetUsersQuery()
  // if (isLoading) return <Loader />
  const dispatch = useDispatch()
  const users = useSelector(state => state.users)

  useEffect(() => {
    dispatch(fetchUsersData())
  }, []);

  return (
    <div className="container">
      <Routes>
        <Route path="/" element={users.pendingGet ? <Loader /> : <Table />} />
        <Route path="/user-detail/:id" element={<UserDetail/>} />
      </Routes>
    </div>
  );
}

export default App;

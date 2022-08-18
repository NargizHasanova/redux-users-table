import { useEffect } from "react";
import UsersTable from "./components/UsersTable";
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsersData, sortId } from "./redux/userSlice";
import Loader from './components/Loader/Loader';
import { Route, Routes } from 'react-router';
import UserDetail from "./components/UserDetail";
// import { useGetUsersQuery } from "./redux/api";


function App() {
  // const { data = [], isLoading } = useGetUsersQuery()
  // if (isLoading) return <Loader />
  const dispatch = useDispatch()
  const users = useSelector(state => state.users)
  
  useEffect(() => {
    (async () => {
      await dispatch(fetchUsersData())
      dispatch(sortId())
    })()

  }, []);

  return (
    
      <Routes>
        <Route path="/" element={users.pendingGet ? <Loader /> : <UsersTable />} />
        <Route path="/user-detail/:id" element={<UserDetail />} />
      </Routes>
   
  );
}

export default App;

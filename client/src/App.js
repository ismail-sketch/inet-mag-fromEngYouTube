import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { adminTrueOrFalse, logoutBtnReducers, authorizeRed } from './redux/slices/regAuthSlice'
import axios from 'axios'


import { Header } from "./components/Header/Header";
import { Routes, Route } from 'react-router-dom';
import { Home } from "./pages/Home/Home";
import { Delivery } from "./pages/Delivery/Delivery";
import { Admin } from "./pages/Admin/Admin";
import { Reg } from "./pages/RegAuth/Reg";
import { Auth } from "./pages/RegAuth/Auth";
import { Error } from "./pages/Error/Error";





function App() {
  const [adminTrue, setAdminTrue] = useState(false)

  const adminState = useSelector((state) => state.regAuth.setAdminTrue)
  const isAuth = useSelector(state => state.regAuth.isAuth)
  const dispatch = useDispatch()


  const getAdmin =  useCallback (async () => {
    const token = localStorage.getItem('token')
    const res = await axios.get('/api/getadmin', {
      headers: {Authorization: `Bearer ${token}`}
    })

    if(localStorage.getItem('token')) {
      dispatch(logoutBtnReducers(true))//reduxState для показа-скрытия кнопки "Выйти"
    } else {
      dispatch(logoutBtnReducers(false))
    }

    // Проверка на админа
    if(res.data.code === 'ok') {
      dispatch(adminTrueOrFalse(true))
    } else {
      dispatch(adminTrueOrFalse(false))
    }
    return console.log(res.data.code, res.data.message);
  }, [dispatch])

  useEffect(() => {
    getAdmin()
  }, [getAdmin])


  // Сохранение авторизованности при загрузке
  useEffect(() => {
    const token = localStorage.getItem('token')
    const getAuth = async () => {
      const res = await axios.get('/api/auth', {headers: {Authorization: `Bearer ${token}`}})
      if(res.data.code === 'auth') {
        dispatch(authorizeRed(true))
      } else {
        dispatch(authorizeRed(false))
      }
    }
    getAuth()
  }, [dispatch])



  return (
    <div className="App">
      <Header adminTrue={adminTrue}/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/deliver" element={<Delivery/>}/>
        <Route path="/admin/*" element={adminState && <Admin getAdmin={getAdmin}/>}/>
        {!isAuth &&
        <>
          <Route path="/reg" element={<Reg/>}/>
          <Route path="/auth" element={<Auth setAdminTrue={setAdminTrue}/>}/>
        </>
        }
        <Route path={'*'} element={<Error/>}/>
      </Routes>
    </div>
  );
}

export default App;

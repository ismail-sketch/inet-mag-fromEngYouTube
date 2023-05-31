import {Link} from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'

import { adminTrueOrFalse, authorizeRed} from '../../redux/slices/regAuthSlice'
import { useNavigate } from "react-router-dom";


import './RegAuth.scss'

export const Auth = () => {
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const [inputValue, setInputValue] = useState({
        email: '',
        password: '',
    })

    const handleChange = (e) =>{
        const value = e.target.value
        setInputValue({...inputValue, [e.target.name]: value})
    }

    const authUser = async (e) => {
        try {
            e.preventDefault()
            const res = await axios.post('/api/auth', {
                email: inputValue.email,
                password: inputValue.password,
            })
            console.log(res.data.message)
            if(res.data.code) {
                dispatch(authorizeRed(true))
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('role', res.data.userRole)
                if(res.data.userRole === 'ADMIN') {
                    dispatch(adminTrueOrFalse(true))
                    navigate('/admin/main-slider')
                } else {
                    dispatch(adminTrueOrFalse(false))
                    navigate('/')
                }
                setInputValue({email: '', password: '', password2: ''})
            }
        } catch (err) {
            console.log(err)
        }

    }


  return (
    <div className="auth reg-auth">
        <div className="container">
            <h1>Авторизация</h1>
            <form className="auth__form reg-auth-form" onSubmit={authUser}>
                <label>
                    <span>Ваш email</span>
                    <input
                        type="email"
                        name='email'
                        onChange={handleChange}
                        value={inputValue.email}
                    />
                </label>
                <label>
                    <span>Пароль</span>
                    <input
                        type="password"
                        name='password'
                        onChange={handleChange}
                        value={inputValue.password}
                    />
                </label>
                <button>Войти</button>
                <div className="question">
                    <span>Еще не зарегистрированы?</span>
                    <Link to={'/reg'}>Регистрация</Link>
                </div>
            </form>
        </div>
    </div>
  )
}

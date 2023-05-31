import {Link} from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import './RegAuth.scss'

export const Reg = () => {
    const [inputValue, setInputValue] = useState({
        email: '',
        password: '',
        password2: ''
    })

    const regUser = async (e) => {
        try {
            e.preventDefault()
            const data = {
                email: inputValue.email,
                password: inputValue.password,
                password2: inputValue.password2,
            }
            if(inputValue.password === inputValue.password2) {
                const res = await axios.post('/api/reg', data)
                console.log(res.data)
                setInputValue({email: '', password: '', password2: ''})
            } else {
                console.log('Пароли не совпадают')
            }

        } catch (err) {
            console.log(err)
        }

    }

    const handleChange = (e) =>{
        const value = e.target.value
        setInputValue({...inputValue, [e.target.name]: value})
    }

    return (
    <div className="reg reg-auth">
        <div className="container">
            <h1>Регистрация</h1>
            <form className="reg__form reg-auth-form" onSubmit={regUser}>
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
                <label>
                    <span>Подтвердите пароль</span>
                    <input
                        type="password"
                        name='password2'
                        onChange={handleChange}
                        value={inputValue.password2}
                    />
                </label>
                <button>Регистрация</button>
                <div className="question">
                    <span>Уже зарегистрированы?</span>
                    <Link to={'/auth'}>Войти</Link>
                </div>
            </form>
        </div>
    </div>
  )
}

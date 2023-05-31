import menu_catlog from '../../images/header/menu-catalog.svg'
import { useNavigate, NavLink, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { adminTrueOrFalse, authorizeRed } from '../../redux/slices/regAuthSlice'
import { CatalogList } from './CatalogList'



export const HeaderBottom = () => {
  const navigate = useNavigate()

  const adminState = useSelector((state) => state.regAuth.setAdminTrue)
  const isAuth = useSelector(state => state.regAuth.isAuth)
  const dispatch = useDispatch()

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    dispatch(adminTrueOrFalse(false))
    dispatch(authorizeRed(false))
    navigate('/auth')
  }

  return (
    <div className='header__bottom'>
    <nav className='menu'>
      <ul className='menu__list'>
        <li className='menu__item-catalog'>
          <img src={menu_catlog} alt="изображение" />
         <div>
          <span>Каталог</span>
          <CatalogList/>
         </div>
        </li>
        <li className='menu__item'>
          <NavLink to={'/'}>Главная</NavLink>
        </li>
        <li className='menu__item'>
          <NavLink to={'/deliver'}>Доставка</NavLink>
        </li>
        <li className='menu__item' onClick={() => navigate('/admin/main-slider')}>
       { adminState &&  <NavLink to={'/admin'}>Админ-панель</NavLink>}
        </li>
      </ul>
        {isAuth && <Link to={'/auth'} onClick={logout}>Выйти</Link> }
        {!isAuth && <div className="menu__reg-auth">
          <NavLink to={'/reg'}>Регистрация</NavLink>
          /
          <NavLink to={'/auth'}>Вход</NavLink>
        </div>}


    </nav>
  </div>
  )
}

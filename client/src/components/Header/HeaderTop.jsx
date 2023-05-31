import logo from '../../images/header/logo.svg'
import header_cart from '../../images/header/header-cart.svg'
import header_search from '../../images/header/header-search.svg'
import { Link } from 'react-router-dom'

export const HeaderTop = () => {
  return (
    <div className='header__top'>
    <div className="header__logo">
        <Link to={'/'}><img src={logo} alt="изображение" /></Link>
    </div>
    <form className="header__search-wrp">
     <div className='header__search'>
        <input type="search" />
        <button>
          <span>Найти</span>
          <img src={header_search} alt="изображение" />
        </button>
     </div>
    </form>
    <div className="header__cart">
      <img src={header_cart} alt="корзина" />
      <span>Корзина</span>
    </div>
 </div>
  )
}

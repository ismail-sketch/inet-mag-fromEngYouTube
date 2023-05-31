import './Header.scss'
import { HeaderBottom } from './HeaderBottom'
import { HeaderTop } from './HeaderTop'


export const Header = ({adminTrue}) => {
  return (
    <div className="header">
       <div className='container header__container'>
        <HeaderTop/>
        <HeaderBottom adminTrue={adminTrue}/>
       </div>
    </div>
  )
}

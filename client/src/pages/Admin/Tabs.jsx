
import {NavLink} from 'react-router-dom'




export const Tabs = () => {


    return (
    <div className='admin__tabs-wrp tabs-wrp'>
        <div className="tabs-btn admin__tabs-btn">
            <NavLink
                to={'main-slider'}
                className={'tab-btn'}
            >Слайдер на главной</NavLink>
            <NavLink
                to={'add-products'}
                className={'tab-btn'}
            >Добавление товаров</NavLink>
            <NavLink
                to={'add-category'}
                className={'tab-btn'}
            >Добавление категорий</NavLink>
             <NavLink
                to={'files-storage'}
                className={'tab-btn'}
             >Библиотека файлов</NavLink>
        </div>
    </div>
  )
}

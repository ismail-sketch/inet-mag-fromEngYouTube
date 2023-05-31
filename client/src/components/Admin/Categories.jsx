import React from 'react'
import { useSelector } from 'react-redux'

export const Categories = ({
    setSlideId,
    setIndexForUpdate,
    setInputValue,
    setUpdtBtn,
    uptBtnNum,
    setuptBtnNum,
    deleteCat
}) => {
    const categories = useSelector(state => state.categoriesSlice.initCategory)

    return (
    <div className='categories'>
        <div className="categories__wrp">
            <ul>
                {
                    categories?.map((item, index) => {
                       return <li
                            className='categories__item'
                            key={item._id}
                            style={{background: item.color}}
                        >
                           <div className='categories__text-img-wrp'>
                                <img src={'/' + item.icon.path} alt="" />
                                <h3>{item.name}</h3>
                           </div>
                           <div className="admin__del-update-btns">

                            <button
                                className={uptBtnNum === item._id ? 'admin__cancel-update active' : 'admin__cancel-update'}
                                onClick={() => {
                                    setUpdtBtn(false)
                                    setuptBtnNum(null)
                                    setInputValue('')
                                }}
                            >Отменить<span>&times;</span></button>

                            <button
                            id={item._id}
                            className="admin__update-btn"
                            onClick={() => {
                                setIndexForUpdate(index)
                                setSlideId(item._id)
                                setInputValue(item.name)
                                setUpdtBtn(true)
                                setuptBtnNum(item._id)
                            }}
                            >Редактировать</button>

                            <button
                                className="admin__del-btn"
                                onClick={() => deleteCat({id: item._id, name: item.icon.filename})}
                            >Удалить
                            </button>
                            </div>
                        </li>
                    })
                }
             </ul>
        </div>
    </div>
  )
}

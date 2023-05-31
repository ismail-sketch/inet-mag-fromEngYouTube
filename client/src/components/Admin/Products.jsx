import React from 'react'
import { useSelector } from 'react-redux'


export const Products = (
   {
    setSlideId,
    setIndexForUpdate,
    setInputValue2,
    setUpdtBtn,
    uptBtnNum,
    setuptBtnNum,
    deleteProd,
    checked,
    setChecked
}) => {

    // let imgs = ''
    const products = useSelector(state => state.productsSlice.initProduct)

    // products?.forEach(item => {
    //     imgs = item.images
    // })

    return (
    <div className="addProducts__list">
    <ul>
        {
            products?.map((item, index) => {
                return (
                    <li
                    className='addProducts__item'
                    key={item._id}
                    >
                        <div className='addProducts__text-img'>
                            <img src={"/" + item.images[0].path} alt="" />
                            <span className='addProducts__name'>{item.name}</span>
                        </div>
                        <div className="admin__del-update-btns">

                            <button
                                className={uptBtnNum === item._id ? 'admin__cancel-update active' : 'admin__cancel-update'}
                                onClick={() => {
                                    setUpdtBtn(false)
                                    setuptBtnNum(null)
                                    setInputValue2({
                                        name: '',
                                        brand: '',
                                        price: '',
                                        shotDesc: '',
                                        fullDesc: '',
                                    })
                                }}
                            >Отменить<span>&times;</span></button>

                            <button
                            id={item._id}
                            className="admin__update-btn"
                            onClick={() => {
                                setIndexForUpdate(index)
                                setSlideId(item._id)
                                setInputValue2({
                                    name: item.name,
                                    brand: item.brand,
                                    price: item.price,
                                    shotDesc: item.description,
                                    fullDesc: item.richDescription,
                                })
                                setUpdtBtn(true)
                                setuptBtnNum(item._id)
                                setChecked(item._id)
                            }}
                            >Редактировать</button>

                            <button
                                className="admin__del-btn"
                                onClick={() => deleteProd({id: item._id, name: item.images[0].filename})}
                            >Удалить
                            </button>
                        </div>
                    </li>
                )
            })
        }
    </ul>
    </div>
    )
};



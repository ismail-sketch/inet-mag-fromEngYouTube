import React from 'react'
import { useSelector } from 'react-redux'

export const CatalogList = () => {
    const categories = useSelector(state => state.categoriesSlice.initCategory)

    return (
    <div className='catalogList'>
        <ul className='catalogList__list'>
        {
            categories?.map(item => {
                return (
                    <li key={item._id + 'wefm'} className='catalogList__item'>{item.name}</li>
                )
            })
        }
        </ul>
    </div>
    )
}

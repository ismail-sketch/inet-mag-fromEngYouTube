

import React from 'react'
import { useDispatch } from 'react-redux'
import { addCategory, getCategory, updateCategory, deleteCategory } from '../../redux/slices/categorySlice'
import { Categories } from '../../components/Admin/Categories'

export const AddCategory = () => {

  const dispatch = useDispatch()

  const [checked, setChecked] = React.useState("#333333")
  const [img, setImg] = React.useState(null)
  const [inputValue, setInputValue] = React.useState('')

   // Управления элементами, связанными с редактированием
   const [updtBtn, setUpdtBtn] = React.useState(false)
   const [uptBtnNum, setuptBtnNum] = React.useState(null)
   const [slideId, setSlideId] = React.useState(null)
   const [indexForUpdate, setIndexForUpdate] = React.useState(null)


  function changeValue(e) {
    setChecked(e.target.value);
  }

  const createCategory = (e) => {
    e.preventDefault()
    const data = new FormData()
    data.append('name', inputValue)
    data.append('color', checked)
    data.append('slide', img)

    try {
      img && dispatch(addCategory(data))
      setInputValue('')
    } catch (err) {
      console.log('Ошибка' + err)
    }
  }

   // Обновление категории
   const updateCategories = async () => {
    const data = new FormData();
    data.append('name', inputValue)
    data.append('color', checked)
    data.append('slide', img)
    data.append("index", indexForUpdate)

    try {
        dispatch(updateCategory({data, slideId}))
    } catch (err) {
        console.log('Ошибка' + err)
    }
}

// Удаление категории
const deleteCat = (data) => {
  dispatch(deleteCategory(data))
}


  React.useEffect(() => {
    dispatch(getCategory())
  }, [dispatch])


  return (
    <section className='addProducts'>
      <div className="container categories__container">
        <form className="form addProducts__form" onSubmit={createCategory}>
          <div className='addProducts__inputs-wrp'>
           <div>
              <label className='addProducts__label category-label'>
                <span>Название категории</span>
                <input
                  type="text"
                  className='addProducts__product-name'
                  onChange={(e) => setInputValue(e.target.value)}
                  value={inputValue}
                />
              </label>

              <label className='addProducts__label category-label'>
                <span>Изображения</span>
                <input
                  type="file"
                  className='addProducts__product-price'
                  onChange={(e) => {setImg(e.target.files[0])}}
                />
              </label>
           </div>

            <div className="addProducts__categories">
              <h3>Выберите цвет</h3>
              <label className='addProducts__label category-color-label'>
                <input
                  type="radio"
                  name="color"
                  value={"#741010"}
                  checked={checked === '#741010' ? true : false}
                  onChange={changeValue}
                />
                <span className='category-color category-color-red'></span>
              </label>
              <label className='addProducts__label category-color-label'>
                <input
                  type="radio"
                  name="color"
                  value={"blue"}
                  checked={checked === 'blue' ? true : false}
                  onChange={changeValue}
                />
                <span className='category-color category-color-blue'></span>
              </label>
            </div>
          </div>
          <button className={!updtBtn ? 'categories__add-btn' : 'categories__add-btn active'}>Добавить</button>
          <button
            className={updtBtn ? 'categories__btn-edit-cat active' : 'categories__btn-edit-cat'}
            onClick={(e) => {
              e.preventDefault();
              updateCategories();
              setInputValue('');
              setUpdtBtn(false)
              setuptBtnNum(null)
            }}>
            Обновить
        </button>
        </form>

        <Categories
          setSlideId={setSlideId}
          setIndexForUpdate={setIndexForUpdate}
          setInputValue={setInputValue}
          setUpdtBtn={setUpdtBtn}
          uptBtnNum={uptBtnNum}
          setuptBtnNum={setuptBtnNum}
          deleteCat={deleteCat}
        />
      </div>
    </section>
  )
}




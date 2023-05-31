import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addProduct, getProduct, updateProduct, deleteProduct } from '../../redux/slices/productsSlice'
import { getCategory } from '../../redux/slices/categorySlice'
import { Products } from '../../components/Admin/Products'

export const AddProducts = () => {

  const [checked, setChecked] = React.useState('Без категории')
  const [img, setImg] = React.useState([])
  const [inputValue2, setInputValue2] = React.useState({
    name: '',
    brand: '',
    price: '',
    shotDesc: '',
    fullDesc: '',
})


  const categories = useSelector(state => state.categoriesSlice.initCategory)
  const dispatch = useDispatch()

  function changeValue(e) {
    setChecked(e.target.value);
  }

  const handleChange = (e) => {
    const value = e.target.value
    setInputValue2({...inputValue2, [e.target.name]: value})
  }

   // Управления элементами, связанными с редактированием
   const [updtBtn, setUpdtBtn] = React.useState(false)
   const [uptBtnNum, setuptBtnNum] = React.useState(null)
   const [slideId, setSlideId] = React.useState(null)
   const [indexForUpdate, setIndexForUpdate] = React.useState(null)

// Функции с axios=======================
  const createProduct = (e) => {
    e.preventDefault()
    const data = new FormData()
    data.append('name', inputValue2.name)
    data.append('description', inputValue2.shotDesc)
    data.append('richDescription', inputValue2.fullDesc)
    data.append('brand', inputValue2.brand)
    data.append('price', inputValue2.price)
    data.append('category', checked)
    for(let i = 0; i < img.length; i++) {
      data.append('images', img[i])
    }


    try {
      dispatch(addProduct(data))
      setInputValue2({
        name: '',
        brand: '',
        price: '',
        shotDesc: '',
        fullDesc: '',
      })
      e.target.reset()
    } catch (err) {
      console.log('Ошибка' + err)
    }
  }

    // Обновление продукта
    const updateProducts = async () => {
      const data = new FormData();
      data.append('name', inputValue2.name)
      data.append('description', inputValue2.shotDesc)
      data.append('richDescription', inputValue2.fullDesc)
      data.append('brand', inputValue2.brand)
      data.append('price', inputValue2.price)
      data.append('category', checked)
      data.append("index", indexForUpdate)
      // for(let i = 0; i < img.length; i++) {
      //   data.append('images', img[i])
      // }

      try {
          dispatch(updateProduct({data, slideId}))
      } catch (err) {
          console.log('Ошибка' + err)
      }
  }

  // Удаление продукта
  const deleteProd = (data) => {
    dispatch(deleteProduct(data))
  }

  React.useEffect(() => {
    dispatch(getProduct())
    dispatch(getCategory())
  }, [dispatch])





  return (
    <section className='addProducts'>
      <div className="container addProducts__container">
        <form className="form addProducts__form" onSubmit={createProduct}>
          <div className='addProducts__inputs-wrp'>
           <div>
              <label className='addProducts__label'>
                <span>Название товара</span>
                <input
                  type="text"
                  className='addProducts__product-name'
                  name="name"
                  onChange={handleChange}
                  value={inputValue2.name}
                />
              </label>
              <label className='addProducts__label'>
                <span>Название брэнда</span>
                <input
                  type="text"
                  className='addProducts__brand-name'
                  name="brand"
                  onChange={handleChange}
                  value={inputValue2.brand}
                />
              </label>
              <label className='addProducts__label'>
                <span>Цена</span>
                <input
                  type="text"
                  className='addProducts__product-price'
                  name="price"
                  onChange={handleChange}
                  value={inputValue2.price}
                />
              </label>
              <label className='addProducts__label'>
                <span>Краткое описание</span>
                <textarea
                  className='addProducts__short-desc'
                  name="shotDesc"
                  onChange={handleChange}
                  value={inputValue2.shotDesc}
                ></textarea>
              </label>
              <label className='addProducts__label'>
                <span>Полное описание</span>
                <textarea
                  className='addProducts__full-desc'
                  name="fullDesc"
                  onChange={handleChange}
                  value={inputValue2.fullDesc}
                ></textarea>
              </label>
              <label className='addProducts__label'>
                <span>Изображения</span>
                <input
                  type="file"
                  multiple={true}
                  className='addProducts__product-price'
                  onChange={(e) => {setImg(e.target.files)}}
                />
              </label>
           </div>

            <div className="addProducts__categories">
              <h3>Выберите категорию</h3>
              {
                categories?.map(item => {
                  return (
                  <label key={item.icon.path} className='addProducts__label'>
                    <input
                      type="radio"
                      value={item._id}
                      name={"category"}
                      checked={checked === item._id ? true : false}
                      onChange={changeValue}
                    />
                    <span>{item.name}</span>
                  </label>
                )
                })
              }
            </div>
          </div>
          <button className={!updtBtn ? 'addProducts__btn' : 'addProducts__btn active'}>Добавить</button>
          <button
            className={updtBtn ? 'categories__btn-edit-cat active' : 'categories__btn-edit-cat'}
            onClick={(e) => {
              e.preventDefault();
              updateProducts();
              setInputValue2({
                name: '',
                brand: '',
                price: '',
                shotDesc: '',
                fullDesc: '',
              });
              setUpdtBtn(false)
              setuptBtnNum(null)
            }}>
            Обновить
        </button>
        </form>
        <Products
          updtBtn={updtBtn}
          setUpdtBtn={setUpdtBtn}
          uptBtnNum={uptBtnNum}
          setuptBtnNum={setuptBtnNum}
          setSlideId={setSlideId}
          setIndexForUpdate={setIndexForUpdate}
          inputValue2={inputValue2}
          setInputValue2={setInputValue2}
          deleteProd={deleteProd}
          checked={checked}
          setChecked={setChecked}
        />
      </div>
    </section>
  )
}



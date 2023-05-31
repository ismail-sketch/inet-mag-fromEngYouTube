import { useState, useEffect } from 'react'


import { useSelector, useDispatch } from 'react-redux'
import { addToMainSlide, getMainSlide, deleteSlide, updateSlideRed } from '../../redux/slices/sliderSlice'

import { SlideForm } from './SlideForm'

export const TabMainSlider = () => {

// useSelector вытаскивает данные
  const slider = useSelector((state) => state.mainSlider.sliderMain)
  // useDispatch говорит "сделай что-то"
  const dispatch = useDispatch()

    const [img, setImg] = useState(null)
    const [checked, setChecked] = useState('#333')

    const [slideId, setSlideId] = useState(null)
    const [inputValue, setInputValue] = useState({
        title: '',
        desc: '',
    })


    // Данные для удаления слайда при обновлении
    const [indexForUpdate, setindexForUpdate] = useState(null)

    // Управления элементами, связанными с редактированием
    const [updtBtn, setUpdtBtn] = useState(false)
    const [uptBtnNum, setuptBtnNum] = useState(null)




    const handleChange = (e) => {
        const value = e.target.value
        setInputValue({...inputValue, [e.target.name]: value})
    }

    // Функция показа-скрытия кнопок "отменить редактирование"
    const cancelBtnsHandle = (id) => {
        setuptBtnNum(id)
    }


    // Создание слайда
    const sendFile =  async () => {
        const data = new FormData()
        data.append("slide", img)
        data.append("title", inputValue.title)
        data.append("desc", inputValue.desc)
        data.append("radio", checked)
        try {
            img && dispatch(addToMainSlide(data))
            setInputValue({title: '', desc: ''})
            setImg('')
        } catch (error) {
            console.log(`Ошибка: ${error}`)
        }

    }

    // Получение всех слайдов
    useEffect(() => {
        dispatch(getMainSlide())
    }, [dispatch])


    // Получение id для обновления слайда
    const getIdForUpdate = (id) => {
        setSlideId(id)
    }

    // Обновление слайда
    const updateSlide = async () => {
        const data = new FormData();
        data.append("slide", img)
        data.append("title", inputValue.title)
        data.append("desc", inputValue.desc)
        data.append("index", indexForUpdate)
        data.append("radio", checked)

        try {
            dispatch(updateSlideRed({data, slideId}))
        } catch (err) {
            console.log('Ошибка' + err)
        }
    }

    // Удаление слайда
    const deleteSlideAdmin = (data) => {
        dispatch(deleteSlide(data))
    }



  return (
    <div className="admin__upload-wrp">
    <SlideForm
        setImg={setImg}
        inputValue={inputValue}
        setInputValue={setInputValue}
        handleChange={handleChange}
        sendFile={sendFile}
        updateSlide={updateSlide}
        slideId={slideId}
        checked={checked}
        setChecked={setChecked}
        setUpdtBtn={setUpdtBtn}
        updtBtn={updtBtn}
        setuptBtnNum={setuptBtnNum}
    />

    {slider &&

    <div className='admin__mainSlider-img-wrp'>
         {
            slider?.map((item, index) => {
                return (
                <div
                    className='admin__slide-item'
                    key={item._id}
                >
                   <div className='admin__text-img-wrp'>
                        <div className='admin__slide-title-desc'>
                            <span className='admin__slide-title' style={{color: item.radio}}>{item.title}</span>
                            <span className='admin__slide-desc'  style={{color: item.radio}}>{item.desc}</span>
                        </div>
                        <img src={'/' + item.images[0].path} alt="изображение" />
                   </div>
                   <div className="admin__del-update-btns">

                    <button
                        className={uptBtnNum === item._id ? 'admin__cancel-update active' : 'admin__cancel-update'}
                        onClick={() => {
                            setUpdtBtn(false)
                            setInputValue({title: '', desc: ''})
                            setuptBtnNum(null)
                        }}
                    >Отменить<span>&times;</span></button>

                    <button id={item._id} className="admin__update-btn"
                        onClick={(e) => {
                            getIdForUpdate(e.target.id)
                            setindexForUpdate(index)
                            setInputValue({title: item.title, desc: item.desc, radio: item.radio})
                            setUpdtBtn(true)
                            cancelBtnsHandle(item._id)
                        }}
                    >Редактировать</button>

                    <button
                        className="admin__del-btn"
                        onClick={() => {
                            deleteSlideAdmin({id: item._id, name: item.images[0].filename})
                            setUpdtBtn(false)
                            setInputValue({title: '', desc: ''})
                            setuptBtnNum(null)
                        }}
                    >Удалить
                    </button>
                   </div>
                </div>
                )
            })
         }
    </div>
    }
</div>
  )
}

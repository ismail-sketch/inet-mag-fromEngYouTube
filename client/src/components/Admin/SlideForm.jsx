

export const SlideForm = ({
    setImg,
    inputValue,
    setInputValue,
    handleChange,
    sendFile,
    updateSlide,
    checked,
    setChecked,
    updtBtn,
    setUpdtBtn,
    setuptBtnNum

}) => {


  function changeValue(e) {
      setChecked(e.target.value);
    }

  return (
    <form
      className="admin__main-slide-form"
      onSubmit={(e) => {
        e.preventDefault();
        sendFile();
        e.target.reset();
      }}>
      <h3 className="admin__title-for-radios">Цвет текста</h3>
      <div className="admin__mainslide-radio-btns">
        <label>
          <span>Черный</span>
          <input
            type="radio"
            name="radio"
            value={'#333'}
            checked={checked === '#333' ? true : false}
            onChange={changeValue}
          />
        </label>
        <label>
          <span>Белый</span>
          <input
            type="radio"
            name="radio"
            value={'#fff'}
            checked={checked === '#fff' ? true : false}
            onChange={changeValue}
          />
        </label>
      </div>
      <label>
        <span>Заголовок слайда</span>
        <input
          type="text"
          name="title"
          onChange={handleChange}
          value={inputValue.title}
          className="admin__mainslide-input-text"
        />
      </label>
      <label>
        <span>Описание слайда</span>
        <textarea
          name="desc"
          onChange={handleChange}
          value={inputValue.desc}
          className="admin__mainslide-input-textarea"></textarea>
      </label>
      <input type="file" name="slide" onChange={(e) => {setImg(e.target.files[0])}} />
      <div className="admin__add-edit-wrp">
        <button
          className={updtBtn ? 'admin__btn-add-slide active' : 'admin__btn-add-slide'}
        >Добавить</button>
        <button
          className={updtBtn ? 'admin__btn-edit-slide active' : 'admin__btn-edit-slide'}
          onClick={(e) => {
            e.preventDefault();
            updateSlide();
            setInputValue({ title: '', desc: '' });
            setUpdtBtn(false)
            setuptBtnNum(null)
          }}>
          Обновить
        </button>
      </div>
    </form>
  );
}


import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getImgs, deleteImgs } from '../../redux/slices/imgLibSlice';




export const FilesSorage = () => {


  const allImgs = useSelector((state) => state.libImgs.initImgs)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getImgs())
  }, [dispatch]);

// Удаление только картинок (из папки из из массива)
const deleteAllImgs = async (name) => {
 dispatch(deleteImgs({name: name}))
}


return (
    <div className='fileStorage'>
        <div className="container">
            <div className="fileStorage__wrp">
                <ul>
                    {allImgs?.map(item => {
                        return(
                        <li key={item}>
                            <div title='Удалить' className="fileStorage__file-del-btn" onClick={() => {
                              deleteAllImgs(item)
                              }}>
                              <span>&times;</span>
                            </div>
                            <img className='fileStorage__file' src={'/images/' + item} alt="изображения" />
                        </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    </div>
  )
};

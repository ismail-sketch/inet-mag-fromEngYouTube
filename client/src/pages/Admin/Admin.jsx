
import './Admin.scss'
import { Route, Routes } from 'react-router-dom'
import { useEffect } from 'react'


import { Tabs } from './Tabs'
import { AddProducts } from './AddProducts'
import { FilesSorage } from './FilesSorage'
import { TabMainSlider } from '../../components/Admin/TabMainSlider'
import { AddCategory } from './AddCategory'




export const Admin = ({getAdmin}) => {

  useEffect(() => {
    getAdmin()
  }, [getAdmin])

  return (
    <div className="admin">
        <div className="container">
            <h1>Админ-панель</h1>
            <Tabs/>
            <Routes>
              <Route path="main-slider" element={<TabMainSlider/>}/>
              <Route path="files-storage" element={<FilesSorage />}/>
              <Route path="add-products" element={<AddProducts/>}/>
              <Route path="add-category" element={<AddCategory/>}/>
            </Routes>
        </div>
    </div>
  )
}

import { useSelector, useDispatch } from 'react-redux';
import { getMainSlide } from '../../redux/slices/sliderSlice';
import { useEffect } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import './SwiperSlider.scss'



export const SwiperSlider = () => {

const dispatch = useDispatch()
const slider = useSelector((state) => state.mainSlider.sliderMain)

  useEffect(() => {
    dispatch(getMainSlide())
  }, [dispatch])


  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={1}
      onSlideChange={() => {}}
      onSwiper={() => {}}
      loop={true}
      pagination={{
        clickable: true,
      }}
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
      }}
      speed={500}
      modules={[ Pagination, Autoplay]}
      className='mainSlider'
    >
      {slider?.map(item => {
        return <SwiperSlide key={item._id + '234'} className='mainSlider__slide'>
         <div className='mainSlider__text-wrp'>
           <h2 className='mainSlider__title' style={{color: item.radio}}>{item.title}</h2>
           <h3 className='mainSlider__desc' style={{color: item.radio}}>{item.desc}</h3>
         </div>
         <img src={item.images[0].path} alt="изображение" />
         </SwiperSlide>
      })}

    </Swiper>
  )
}

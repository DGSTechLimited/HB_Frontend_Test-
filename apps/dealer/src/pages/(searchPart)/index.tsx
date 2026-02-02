import React from 'react'
import CarouselComponent from './components/SearchCarousal'
import ImageCarousel from './components/ImageCarousal'
import GetInTouch from './components/GetInTouch'
import SearchPage from '@/components/Search'

const SearchPart = () => {
  return (
    <div className='container mx-auto'>
      <div className=' mx-auto pt-10'>
        <CarouselComponent />
      </div>
      <SearchPage />
      <ImageCarousel />
      <GetInTouch />
    </div>
  )
}

export default SearchPart
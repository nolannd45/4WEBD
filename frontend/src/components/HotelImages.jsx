import React from 'react'

const HotelImages = ({ data }) => {
    return (
        <>{data && data?.picture_list?.map((item) => {
            return (
                <div key={item._id} className='md:max-w-[400px]  w-full hover:scale-105 duration-700 '>
                    <img src={require(`/src/imageHotel/${item}.jpg`)} alt={'No @imag%e@- Found'} className='rounded-md' />
                </div>
            )
        })}</>
    )
}

export default HotelImages;
import React, { useEffect, useState } from 'react'
// import { IoStar } from 'react-icons/io5';
import { useParams } from 'react-router-dom';
import Apropos from './Apropos';
import HotelImages from './HotelImages';
import Modal from './Modal';

const HotelPage = () => {
    
    const { hotel } = useParams();
    const [data, setData] = useState([]);
    const url = `http://localhost:3002/event/this/${hotel}`;
    console.log(data)

    useEffect(() => {
        const getData = async () => {
            const res = await fetch(url);
            const result = await res.json();
            // console.log(result);
            // setData([result])
            setData(result)
        }
        getData();
        // eslint-disable-next-line
    }, [])
    return (
        <div className='text-start'>
            <h1 className="text-white text-2xl font-semibold mt-6">Hotel-{data.name}</h1>
            <h2 className='text-purple-500 text-xl'>{data.location}</h2>


            {/* !Rating Section */}

            {/* <div className='flex items-center justify-start'>

                <span className='text-purple-500 text-xl font-semibold'><IoStar size={30} color='pink' className='inline-block ' /> {data?.rating} / 5.0</span>
            </div> */}

            <div className='flex gap-4 flex-wrap justify-between mt-6'>

                <HotelImages data={data} />

            </div>
            <div className='my-6'>
                <Apropos data={data} />
            </div>
           {data.countPlace !== data.nbPlace ?
            <div>
                <Modal  idEvent={hotel} text={'Reservez maintenant'} />
            </div> 
            : ""}
        </div>
    )
}

export default HotelPage;
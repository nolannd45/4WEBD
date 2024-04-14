import React, { useState } from 'react'
import ModalData from './ModalData';



const Modal = ({ text, idEvent }) => {
    const [showModal, setShowModal] = useState(false);

    const ModalBtn = ({ text }) => {

        return (

            <div className=' flex w-full items-end justify-center cursor-pointer ' onClick={() => { setShowModal(!showModal) }}>
                <button id='reserver' className='bg-green-600 py-2 px-6 rounded-lg hover:bg-transparent text-white border-r-orange-300 border hover:text-green-400 duration-200 text-lg '>{text}</button>
            </div>

        )
    }
    const MyModal = () => {
        return (
            <>
                <ModalBtn text={text} />

                {showModal &&
                    <div className='flex items-center justify-center right-0'>

                        <ModalData idEvent={idEvent} setShowModal={setShowModal} />
                    </div>
                }

            </>
        )
    }
    return (
        <>
            <MyModal text={text} />
        </>
    )
}

export default Modal;
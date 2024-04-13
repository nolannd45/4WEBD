import React from 'react'

const Apropos = ({ data }) => {
//
    return (
        <>
            <span className='text-2xl font-semibold text-white underline'>Description : </span>
            <h2 className='font-semibold text-white mt-2'>{data.description}</h2>
        </>
    )
}

export default Apropos;
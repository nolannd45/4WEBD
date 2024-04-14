import React from 'react'

const Apropos = ({ data }) => {
//
    return (
        <>
            <span className='text-2xl font-semibold text-white underline'>Description : </span>
            <h2 className='font-semibold text-white mt-2'>{data.description}</h2>

            <span className='text-2xl text-white'>nombre de place : {data.nbPlace}</span>

            <span className='text-2xl text-white'>places restantes : {(data.nbPlace - data.countPlace)}</span>
        </>
    )
}

export default Apropos;
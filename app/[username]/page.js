import React from 'react'

const Username = ({params}) => {
  return (
    <>
    <div className='flex flex-col items-center'>
        <div className='cover w-full '>
            <img className='object-cover w-full max-h-[400px]' src="/cover.png" alt="" />
        </div>
        <div className='cover rounded-md  '>
            <img className='object-cover border border-zinc-400 rounded-md w-[150px] h-[150px] -mt-[75px]' src="/profile.png" alt="" />
        </div>
    </div>
    <div className='w-full h-50 gap-2 flex flex-col items-center my-3'>
        <h2 className='text-4xl font-semibold'>{decodeURIComponent(params.username)}</h2>
        <h6>345 Igniters 🔥</h6>
    </div>
    <div className='flex justify-center h-fit w-full'>
        <div className='w-1/3 h-fit m-2' >

        </div>
        <div className='w-1/3 h-fit m-2' >

        </div>
    </div>

    </>
  )
}

export default Username
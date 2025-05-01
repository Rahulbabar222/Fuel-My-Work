import React, { useEffect, useState } from 'react'
import { useSession } from "next-auth/react"

const Payment = ({ name, username }) => {
    const { data: session } = useSession();
    const [fuelCost] = useState(10)//needed to be taken from user from backend.
    const [paymentform, setPaymentform] = useState({fuel:1,amount:0,name:"anonymous",fromUsername:"anonymous",toUsername:username,fromUseremail:"",message:"",})
    const [finalAmount,setFinalAmount]=useState(paymentform.fuel*fuelCost)

    const handleChange = (e) => {
        setPaymentform({...paymentform,[e.target.name]:e.target.value})
    }

    const handlePay=()=>{
        setPaymentform(prev => ({ ...prev,amount:finalAmount }));
    }

    useEffect(() => {
        if (session) {
            const fromUsername = session.user.username;
            const fromUseremail = session.user.email;
            setPaymentform(prev => ({ ...prev, fromUseremail, fromUsername }));
        }
    }, [session]);

    useEffect(() => { 
        console.log(paymentform)
    }, [paymentform.amount])

    useEffect(() => { 
      setFinalAmount(paymentform.fuel*fuelCost)
    }, [paymentform])
    


    return (
        <div className='w-full h-fit bg-indigo-950/60 p-5 rounded-lg'>
            <div className=' flex gap-2 items-center group'>
                <h2 className='text-2xl font-bold'>Fuel {name}'s work </h2>
                <button className='relative'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" color="#ffffff" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M10 9C10 7.89543 10.8954 7 12 7C13.1046 7 14 7.89543 14 9C14 9.39815 13.8837 9.76913 13.6831 10.0808C13.0854 11.0097 12 11.8954 12 13V13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M11.992 17H12.001" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                    <div className='text-sm p-2 rounded-xl border-2 border-indigo-500 hidden group-hover:block group-focus:block w-[200px] h-fit bg-white text-black absolute -left-25 sm:left-0   bottom-6'>
                        It's a friendly metaphor, not real fuel. Each 'fuel' is ${fuelCost}, and you can buy as many as you like.
                    </div>
                </button>
            </div>
            <div className='flex items-center gap-5 my-3 p-4 border-2 border-indigo-500 rounded-lg bg-indigo-950'>
                <div className='w-[50px]'>
                    <img src="/logo.png" alt="" />
                </div>
                <h5 className='font-bold text-lg'>x</h5>
                <div onClick={() => setPaymentform(prev => ({ ...prev, fuel: 1 }))} className={`w-[50px] h-[50px] ${paymentform.fuel === 1 ? " bg-amber-300 text-indigo-950" : "bg-indigo-950 text-white "} border-2 border-white rounded-full flex items-center justify-center`}>1</div>
                <div onClick={() => setPaymentform(prev => ({ ...prev, fuel: 3 }))} className={`w-[50px] h-[50px] ${paymentform.fuel === 3 ? " bg-amber-300 text-indigo-950" : "bg-indigo-950 text-white "} border-2 border-white rounded-full flex items-center justify-center`}>3</div>
                <div onClick={() => setPaymentform(prev => ({ ...prev, fuel: 5 }))} className={`w-[50px] h-[50px] ${paymentform.fuel === 5 ? " bg-amber-300 text-indigo-950" : "bg-indigo-950 text-white "} border-2 border-white rounded-full flex items-center justify-center`}>5</div>
                <input onChange={handleChange} value={paymentform.fuel} className='w-[50px] h-[50px] text-center border-2 border-white rounded-xl' placeholder='10' type="number" name="fuel" />
            </div>
            <input onChange={handleChange} className='w-full p-3 text-lg bg-gray-300 text-gray-700 rounded-lg mb-3 ' placeholder='Name' type="text" name="name"  />
            <input onChange={handleChange} className='w-full h-[100px] p-3 text-lg bg-gray-300 text-gray-700 rounded-lg mb-3 ' placeholder='Say something nice...' type="text" name="message"  />
            <button onClick={()=>handlePay()} className="text-black bg-amber-300 border hover:bg-amber-400  rounded-full px-5 py-3 w-full m-2 font-semibold flex justify-center gap-2">
                <span>Fuel</span><span>${finalAmount}</span>
            </button>
        </div>
    )
}

export default Payment
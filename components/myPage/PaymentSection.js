import React, { useEffect, useState } from 'react'
import { useSession } from "next-auth/react"
import { ToastContainer, toast } from 'react-toastify';
import Image from 'next/image';


const Payment = ({name,username, fuelCost,id }) => {
    const { data: session} = useSession();
    const [paymentform, setPaymentform] = useState({ fuel: 1, amount: 0, senderName: "", fromUsername: "Anonymous", toUsername: username, fromUseremail: "Anonymous", message: "",toUserID:id })
    const [finalAmount, setFinalAmount] = useState(paymentform.fuel * fuelCost)
    const [loading, setLoading] = useState(false);
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'fuel') {
          if (/^\d*$/.test(value)) {
            setPaymentform({ ...paymentform, [name]: value });
          }
        } else {
          setPaymentform({ ...paymentform, [name]: value });
        }
      };

    const handlePay = async (e) => {
        setPaymentform(prev => ({ ...prev,amount:finalAmount*100 }));
        try {
            setLoading(true)
            const res = await fetch("/api/razorpay/order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    "amount": finalAmount*100,
                    "currency": "INR"
                }),
            });

            const orderData = await res.json();

            if (!orderData.id) {
                setLoading(false)
                toast("Fueling failed, please try again later.");
                return;
            }
            const options = {
                key:"rzp_test_vf5xYHRBFkOIvR",
                amount: orderData.amount,
                currency: orderData.currency,
                name: "Fuel My Work",
                description: "Test Transaction",
                image: "/logo.png",
                order_id: orderData.id,
                handler:async function (response) {
                    const fullResponse = {...response,              
                        receipt: orderData.receipt,
                        toUser:username,
                        amount:(orderData.amount)/100,
                        currency: orderData.currency,
                        toUserID:paymentform.toUserID,
                        senderName:paymentform.senderName,
                        fromUsername:paymentform.fromUsername,
                        fromUseremail:paymentform.fromUseremail,
                        message:paymentform.message
                    };
                    const verifyRes = await fetch("/api/razorpay/validate", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(fullResponse),
                    });
                
                    const verifyData = await verifyRes.json();
                
                    if (verifyData.success) {
                        setLoading(false)
                        window.location.reload();
                        alert("Payment verified successfully! Thank you for your Support.");
                    } else {
                        setLoading(false)
                        alert("Payment verification failed.");
                        window.location.reload();
                    }
                },
                prefill: {
                    name: paymentform.senderName,
                    email: "",
                    contact: "",
                },
                notes: {
                    message: "Lelo Maje karo",
                },
                theme: {
                    color: "#3399cc",
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.on('payment.failed', function (response) {
                setLoading(false)
                console.error("Payment failed:", response.error);
                toast("Payment failed: " + response.error.description);
            });
            rzp.open();
        } catch (err) {
            setLoading(false)
            console.error("Payment initiation failed", err);
            toast("Something went wrong - Fueling failed, please try again later.");
        }
    };

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
        setFinalAmount(paymentform.fuel * fuelCost)
    }, [paymentform])



    return (
        <div className='w-full h-fit bg-indigo-950/60 p-5 rounded-lg'>
            <div className=' flex gap-2 items-center group'>
                <h2 className='text-2xl font-bold'>Fuel {name}&#39;s work </h2>
                <button className='relative'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" color="#ffffff" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M10 9C10 7.89543 10.8954 7 12 7C13.1046 7 14 7.89543 14 9C14 9.39815 13.8837 9.76913 13.6831 10.0808C13.0854 11.0097 12 11.8954 12 13V13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M11.992 17H12.001" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                    <div className='text-sm p-2 rounded-xl border-2 border-indigo-500 hidden group-hover:block group-focus:block w-[200px] h-fit bg-white text-black absolute -left-25 sm:left-0   bottom-6'>
                        It&#39;s a friendly metaphor, not real fuel. Each &#39;fuel&#39; is ₹{fuelCost}, and you can buy as many as you like.
                    </div>
                </button>
            </div>
            <div className='flex items-center gap-5 my-3 p-4 border-2 border-indigo-500 rounded-lg bg-indigo-950'>
                <div className='w-[50px]'>
                    <Image
                    width={50} 
                    height={50} 
                    quality={100}
                    src="/logo.png" alt="logo" />
                </div>
                <h5 className='font-bold text-lg'>x</h5>
                <div onClick={() => setPaymentform(prev => ({ ...prev, fuel: 1 }))} className={`w-[50px] h-[50px] ${paymentform.fuel === 1 ? " bg-amber-300 text-indigo-950" : "bg-indigo-950 text-white "} border-2 border-white rounded-full flex items-center justify-center`}>1</div>
                <div onClick={() => setPaymentform(prev => ({ ...prev, fuel: 3 }))} className={`w-[50px] h-[50px] ${paymentform.fuel === 3 ? " bg-amber-300 text-indigo-950" : "bg-indigo-950 text-white "} border-2 border-white rounded-full flex items-center justify-center`}>3</div>
                <div onClick={() => setPaymentform(prev => ({ ...prev, fuel: 5 }))} className={`w-[50px] h-[50px] ${paymentform.fuel === 5 ? " bg-amber-300 text-indigo-950" : "bg-indigo-950 text-white "} border-2 border-white rounded-full flex items-center justify-center`}>5</div>
                <input onChange={handleChange} value={paymentform.fuel} className='w-[50px] h-[50px] text-center border-2 border-white rounded-xl' placeholder='10' type="number" step="1" min="0" name="fuel" />
            </div>
            <input onChange={handleChange} className='w-full p-3 text-lg bg-gray-300 text-gray-700 rounded-lg mb-3 ' placeholder='Name (required)' type="text" name="senderName" />
            <input onChange={handleChange} className='w-full h-[100px] p-3 text-lg bg-gray-300 text-gray-700 rounded-lg mb-3 ' placeholder='Say something nice...(optional)' type="text" name="message" />
            <button disabled={!paymentform.senderName || loading} onClick={() => handlePay()} className="disabled:cursor-not-allowed text-black bg-amber-300 border hover:bg-amber-400  rounded-full px-5 py-3 w-full m-2 font-semibold flex justify-center gap-2">
                <span>{loading?"Please wait..":"Fuel"}</span><span>{loading?"":`₹${finalAmount}`}</span>
            </button>
        </div>
    )
}

export default Payment
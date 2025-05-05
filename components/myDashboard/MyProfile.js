import React, { useState ,useEffect} from 'react'
import { useSession } from "next-auth/react"
import { toast } from 'react-toastify';

const MyProfile = ({setActiveComponent}) => {
    const { data: session } = useSession();

    const [profileForm, setProfileForm] = useState({
        id:"",profileImage:"",
        coverImage:"",title:"",about:"",fuelCost:"",
        introLink:"",website:"",behance:"",discord:"",github:"",facebook:"",instagram:"",linkedin:"",
        pinterest:"",telegram:"",youtube:"",snapchat:"",reddit:"",x:"",whatsapp:""
    })

    useEffect(() => {
        const initForm = async () => {
            const savedForm = JSON.parse(localStorage.getItem("profileForm"));
    
            if (savedForm?.id) {
                setProfileForm(savedForm);
            } else if (session?.user?.id) {
                try {
                    const res = await fetch("/api/dashboard/myprofile", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ id: session.user.id }),
                    });
    
                    const data = await res.json();
                    if (res.ok) {
                        setProfileForm({
                            id: data._id || "",
                            profileImage: data.profileImage || "/profile.png",
                            coverImage: data.coverImage || "/cover.png",
                            title: data.title || "",
                            about: data.about || "",
                            fuelCost: data.fuelCost || "",
                            introLink: data.introLink || "",
                            website: data.website || "",
                            behance: data.behance || "",
                            discord: data.discord || "",
                            github: data.github || "",
                            facebook: data.facebook || "",
                            instagram: data.instagram || "",
                            linkedin: data.linkedin || "",
                            pinterest: data.pinterest || "",
                            telegram: data.telegram || "",
                            youtube: data.youtube || "",
                            snapchat: data.snapchat || "",
                            reddit: data.reddit || "",
                            x: data.x || "",
                            whatsapp: data.whatsapp || "",
                        });
                    }
                } catch (err) {
                    console.error(err);
                    alert("Something went wrong.");
                }
            }
        };
    
        initForm();
    }, [session]);

    useEffect(() => {
        const savedForm = JSON.parse(localStorage.getItem("profileForm"));
        if (savedForm) {
            setProfileForm(savedForm);
        }
    }, []);
    
    useEffect(() => {
        localStorage.setItem("profileForm", JSON.stringify(profileForm));
    }, [profileForm]);
   
    const handleChange = (e) => {
        setProfileForm({ ...profileForm, [e.target.id]: e.target.value })
    }

    const handleSave=async()=>{
        try {
            const res = await fetch("/api/dashboard/myprofile", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(profileForm),
            });

            const data= await res.json();

            if(res.ok){
                toast("Profile Updated");
                localStorage.removeItem("profileForm");
                setActiveComponent("home")

            }else{
                toast(data.error)
            }
        }catch (err) {
            console.error(err);
            toast("Something went wrong.");
        }
    
    }

    return (
        <div className='py-10 sm:px-10 lg:px-25 w-full xl:w-1/2 xl:px-0  h-fit'>
            <h1 className='text-2xl font-bold p-3 '>Edit Profile</h1>
            <div className='p-10  bg-indigo-950/60 rounded-lg'>
                <label className='text-lg' htmlFor="coverImage">Cover Image Link</label>
                <input onChange={handleChange} value={profileForm.coverImage} className='mt-3 mb-5 w-full p-3 text-lg bg-gray-300 text-gray-700 rounded-lg text-start ' placeholder='' type="text" id="coverImage" />

                <label className='text-lg' htmlFor="profileImage">Profile Image Link</label>
                <input onChange={handleChange} value={profileForm.profileImage} className='mt-3 mb-5 w-full p-3 text-lg bg-gray-300 text-gray-700 rounded-lg text-start ' placeholder='' type="text" id="profileImage" />

                <label className='text-lg' htmlFor="title">Title</label>
                <input onChange={handleChange} value={profileForm.title} className='mt-3 mb-5 w-full p-3 text-lg bg-gray-300 text-gray-700 rounded-lg text-start ' placeholder='For about section...' type="text" id="title" />
                
                <label className='text-lg' htmlFor="name">About</label>
                <textarea onChange={handleChange} value={profileForm.about}
                    id="about"
                    placeholder="Write something about yourself, so your audience can know you better.."
                    className='mt-3 mb-5 w-full h-[200px] p-3 text-lg bg-gray-300 text-gray-700 rounded-lg resize-none'
                />

                <label className='text-lg' htmlFor="introLink">Introduction Video Link</label>
                <input onChange={handleChange} value={profileForm.introLink} className='mt-3 mb-5 w-full p-3 text-lg bg-gray-300 text-gray-700 rounded-lg text-start ' placeholder='Youtube video link...' type="text" id="introLink" />

                <label className='text-lg' htmlFor="fuelCost">Fuel Cost</label>
                <input onChange={handleChange} value={profileForm.fuelCost} className='mt-3 mb-5 w-full p-3 text-lg bg-gray-300 text-gray-700 rounded-lg text-start ' placeholder='Enter cost a single fuel, minimum ₹100...' type="number" id="fuelCost" />

                <hr className="border-t border-gray-400 my-4" />

                <h3 className='text-lg font-bold my-3 '>Link your Social Accounts</h3>

                <label className='text-lg' htmlFor="website">Website</label>
                <input onChange={handleChange} value={profileForm.website} className='mt-3 mb-5 w-full p-3 text-lg bg-gray-300 text-gray-700 rounded-lg text-start ' placeholder='link' type="text" id="website" />
                
                <label className='text-lg' htmlFor="discord">Discord</label>
                <input onChange={handleChange} value={profileForm.discord} className='mt-3 mb-5 w-full p-3 text-lg bg-gray-300 text-gray-700 rounded-lg text-start ' placeholder='link' type="text" id="discord" />

                <label className='text-lg' htmlFor="github">Github</label>
                <input onChange={handleChange} value={profileForm.github} className='mt-3 mb-5 w-full p-3 text-lg bg-gray-300 text-gray-700 rounded-lg text-start ' placeholder='link' type="text" id="github" />
                
                <label className='text-lg' htmlFor="facebook">Facebook</label>
                <input onChange={handleChange} value={profileForm.facebook} className='mt-3 mb-5 w-full p-3 text-lg bg-gray-300 text-gray-700 rounded-lg text-start ' placeholder='link' type="text" id="facebook" />
                
                <label className='text-lg' htmlFor="instagram">Instagram</label>
                <input onChange={handleChange} value={profileForm.instagram} className='mt-3 mb-5 w-full p-3 text-lg bg-gray-300 text-gray-700 rounded-lg text-start ' placeholder='link' type="text" id="instagram" />
                
                <label className='text-lg' htmlFor="linkedin">Linkedin</label>
                <input onChange={handleChange} value={profileForm.linkedin} className='mt-3 mb-5 w-full p-3 text-lg bg-gray-300 text-gray-700 rounded-lg text-start ' placeholder='link' type="text" id="linkedin" />

                <label className='text-lg' htmlFor="pinterest">Pinterest</label>
                <input onChange={handleChange} value={profileForm.pinterest} className='mt-3 mb-5 w-full p-3 text-lg bg-gray-300 text-gray-700 rounded-lg text-start ' placeholder='link' type="text" id="pinterest" />
                
                <label className='text-lg' htmlFor="telegram">Telegram</label>
                <input onChange={handleChange} value={profileForm.telegram} className='mt-3 mb-5 w-full p-3 text-lg bg-gray-300 text-gray-700 rounded-lg text-start ' placeholder='link' type="text" id="telegram" />

                <label className='text-lg' htmlFor="youtube">Youtube</label>
                <input onChange={handleChange} value={profileForm.youtube} className='mt-3 mb-5 w-full p-3 text-lg bg-gray-300 text-gray-700 rounded-lg text-start ' placeholder='link' type="text" id="youtube" />
                
                <label className='text-lg' htmlFor="snapchat">Snapchat</label>
                <input onChange={handleChange} value={profileForm.snapchat} className='mt-3 mb-5 w-full p-3 text-lg bg-gray-300 text-gray-700 rounded-lg text-start ' placeholder='link' type="text" id="snapchat" />
                
                <label className='text-lg' htmlFor="reddit">Reddit</label>
                <input onChange={handleChange} value={profileForm.reddit} className='mt-3 mb-5 w-full p-3 text-lg bg-gray-300 text-gray-700 rounded-lg text-start ' placeholder='link' type="text" id="reddit" />
                
                <label className='text-lg' htmlFor="x">{"X (Twitter)"}</label>
                <input onChange={handleChange} value={profileForm.x} className='mt-3 mb-5 w-full p-3 text-lg bg-gray-300 text-gray-700 rounded-lg text-start ' placeholder='link' type="text" id="x" />
                
                <label className='text-lg' htmlFor="whatsapp">Whatsapp</label>
                <input onChange={handleChange} value={profileForm.whatsapp} className='mt-3 mb-5 w-full p-3 text-lg bg-gray-300 text-gray-700 rounded-lg text-start ' placeholder='link' type="text" id="whatsapp" />

                <button onClick={()=>{handleSave()}}
                    className="disabled:bg-zinc-500 text-black bg-amber-300 border hover:bg-amber-400  rounded-full px-5 py-3 w-full mx-2 my-5 font-semibold flex justify-center gap-2">
                    <span>Save</span>
                </button>
            </div>
            <p className='p-3'>*{session.user.id}</p>
        </div>
    )
}

export default MyProfile
import { useEffect ,useState} from "react"
import { useParams } from "react-router-dom"
import { Swal } from "../../Components/ExpertOTP/import"
import Chat from "../../Components/Chat/Chat"
import { userAxiosInstance } from "../../axios/instance"

import { useSelector } from "react-redux"

const BookingDetail=()=>{

   const username=useSelector(state=>state.user.value._id)

 
    const {id}=useParams()
    const [booking,setBooking]=useState({})
    const [user,setUser]=useState({})
    const [other,setOther]=useState({})
    useEffect(()=>{
        setUser(booking?.userId)
        setOther(booking?.expertId)

    },[booking])
  

    useEffect(()=>{
        userAxiosInstance.get(`/booking/${id}`).then(res=>{
            if(res.data.status==="success"){
                setBooking(res.data.result)

            }else{
                Swal.fire("error","NetworkError","error")
            }
        }).catch(error=>{
            Swal.fire("error",error.message,"error")
        })
    },[])  

    return(
        <>
        <div className="bg-slate-50 p-2 mt-5 rounded-t-xl flex justify-center">

            <h1 className="text-xl md:text-3xl font-extrabold">Booking Detail</h1>
        </div>
        <div className="bg-slate-50 p-2  flex justify-center ">
        <ul className="steps md:text-2xl text-sm  font-bold">
  <li data-content="📬" className="step step-secondary ">Open</li>
  <li data-content="⛹" className="step step-secondary">Partner Assigned</li>
  <li data-content="⏲" className="step">In Progress</li>
  <li data-content="✔" className="step">Completed</li>
  <li data-content="🗐" className="step">invoiced</li>
  <li data-content="📪" className="step">Closed</li>
  {(booking?.status==="cancelled")&&<li data-content="🗙" className="step">Cancelled</li> }
</ul>
        </div>
<div className="bg-slate-50 p-2 h-fit w-full flex justify-center opacity-90 shadow-xl">
    <div className="w-3/5">

<div className="divider "></div>
<div className="flex justify-between   font-semibold p-2 flex-wrap"> <h1 className="text-xl">Booking ID: </h1> <h1>{booking?._id}</h1></div>
<div className="divider "></div>
<div className="flex justify-between  font-semibold p-2 flex-wrap"> <h1 className="text-xl">Booking Status: </h1> <h1>{booking?.status}</h1></div>
<div className="divider "></div>
<div className="flex justify-between   font-semibold p-2 flex-wrap"> <h1 className="text-xl">Scheduled: </h1> <h1>{booking?.slot}</h1></div>
<div className="divider "></div>
<div className="flex justify-between   font-semibold p-2 flex-wrap"> <h1 className="text-xl">Address: </h1> <h1>{booking?.address?.name?.toUpperCase()} <br/>{booking?.address?.house }<br/>{booking?.address?.street }<br/>{booking?.address?.pincode }</h1></div>
<div className="divider "></div>
<div className="flex justify-between   font-semibold p-2 flex-wrap"> <h1 className="text-xl">Partner Assigned: </h1> <h1>{booking?.expertId?.username?.toUpperCase()}<br/> Ph: +91- {booking?.expertId?.mobile}</h1></div>
<div className="divider "></div>
<div className="flex justify-between   font-semibold p-2 flex-wrap"> <h1 className="text-xl">Estimate Amount: </h1> <h1>Rs: {booking?.estimate ? booking?.estimate :"0"}</h1></div>
<div className="divider "></div>

    </div>
</div>
        <div className="flex justify-center bg-slate-100 bg-opacity-60">
        <Chat room={id} username={username} user={user} other={other}/>
        </div>
        </>
    )
}
export default BookingDetail
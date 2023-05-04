import { userAxiosInstance }  from "../axios/instance"


const authUser=()=>{
    return userAxiosInstance.get('/isUserAuth')
}
const payOnline=(amount)=>{
    return userAxiosInstance.post('/payment',{amount})
}
const verifyPayment=(response,bookId)=>{
    return userAxiosInstance.post('/paymentVerify',{...response,bookId})
}
const getExpertContacts=()=>{
    return userAxiosInstance.get('/getContacts')
}
const getUserMessage=(data)=>{
    return userAxiosInstance.post('/getMessage', data)
 }
 const addUserMessage=(data)=>{
    return userAxiosInstance.post('/addMessage',data)
 }
 const userReview=(data)=>{
    return userAxiosInstance.post('/addReview',data)
 }
 const userUpdateReview=(data)=>{
    return userAxiosInstance.post('/updateReview',data)
 }
 const userApproveEstimate=(id)=>{
    return userAxiosInstance.get(`/approveEstimate/${id}`)
 }


export {userApproveEstimate,userUpdateReview,addUserMessage,getUserMessage,authUser,payOnline,verifyPayment,getExpertContacts,userReview}
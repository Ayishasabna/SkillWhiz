import { expertAxiosInstance } from "../axios/instance"

const authExpert=()=>{
   return expertAxiosInstance.get('/isExpertAuth')
}
const startJob=(id)=>{
   return expertAxiosInstance.get(`/startJob/${id}`)
}

const endJob=(parts,hours,total,id)=>{
   return expertAxiosInstance.post('/endJob',{parts,hours,total,id})
}
const getUserContacts=()=>{
   return expertAxiosInstance.get('/getContacts')
}
const getExpertMessage=(data)=>{
   return expertAxiosInstance.post('/getMessage', data)
}
const addExpertMessage=(data)=>{
   return expertAxiosInstance.post('/addMessage',data)
}
export {addExpertMessage,getExpertMessage,authExpert,startJob,endJob,getUserContacts}
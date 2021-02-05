import Axios from "axios"
import EndPoints from "./EndPoints.json"

const billService = (kc)=>{
    console.log("customer service........................")
    console.log(kc.token)
   
    
    return {
        getBills : async()=>{
            const bills = await Axios.get(EndPoints.billingMS+"fullbills", {
                headers: {
                    Authorization :"Bearer "+ kc.token
                  }
            })
            return bills.data
        },
        getBill : async(id)=>{
            console.log("..................."+id)
            const bill = await Axios.get(EndPoints.billingMS+"fullbills/"+id, {
                headers: {
                    Authorization :"Bearer "+ kc.token
                  }
            })
            return bill.data
        },
        addBill : async(b)=>{
            const bill = await Axios.post(EndPoints.billingMS+"bills",{
                ...b
            }, {
                headers: {
                    Authorization :"Bearer "+ kc.token
                  }
            })
            return bill.data
        },
        
    }
}


export default (billService) ;
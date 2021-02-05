import Axios from "axios"
import EndPoints from "./EndPoints.json"

const customerService = (kc)=>{
    console.log("customer service........................")
    console.log(kc.token)
   
    
    return {
        getCustomers : async()=>{
            const customers = await Axios.get(EndPoints.customerMS+"customers", {
                headers: {
                    Authorization :"Bearer "+ kc.token
                  }
            })
            return customers.data._embedded.customers
        },
        getOneCustomer : async(id)=>{
            const customers = await Axios.get(EndPoints.customerMS+"customers/"+id, {
                headers: {
                    Authorization :"Bearer "+ kc.token
                  }
            })
            return customers.data
        },
        editCustomer : async(customer)=>{
            const customers = await Axios.put(EndPoints.customerMS+"customers/"+customer.id,{
                ...customer
            },{
                headers: {
                    Authorization :"Bearer "+ kc.token
                  }
            })
            return customers.data
        },
        deleteCustomer : async(c)=>{
            const customers = await Axios.delete(EndPoints.customerMS+"customers/"+c.id,{
                headers: {
                    Authorization :"Bearer "+ kc.token
                  }
            })
            return customers.data
        },
        addCustomer : async(c)=>{
            const customers = await Axios.post(EndPoints.customerMS+"customers/",{
                ...c
            },{
                headers: {
                    Authorization :"Bearer "+ kc.token
                  }
            })
            return customers.data
        }
    }
}


export default (customerService) ;
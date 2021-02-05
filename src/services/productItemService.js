import Axios from "axios"
import EndPoints from "./EndPoints.json"

const productItemService = (kc)=>{
   
    
    return {
        
        addproductItems : async(pItem)=>{
            const productItem = await Axios.post(EndPoints.billingMS+"productItems",{
                ...pItem
            }, {
                headers: {
                    Authorization :"Bearer "+ kc.token
                  }
            })
            return productItem.data
        },
        
    }
}


export default (productItemService) ;
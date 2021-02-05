import Axios from "axios"
import EndPoints from "./EndPoints.json"

const productService = (kc)=>{
    console.log("product service........................")
    console.log(kc.token)
   
    
    return {
        getProducts : async()=>{
            const products = await Axios.get(EndPoints.productMS+"products", {
                headers: {
                    Authorization :"Bearer "+ kc.token
                  }
            })
            return products.data._embedded.products
        },
        getOneProduct : async(id)=>{
            const products = await Axios.get(EndPoints.productMS+"products/"+id, {
                headers: {
                    Authorization :"Bearer "+ kc.token
                  }
            })
            return products.data
        },
        editProduct : async(product)=>{
            const products = await Axios.put(EndPoints.productMS+"products/"+product.id,{
                ...product
            },{
                headers: {
                    Authorization :"Bearer "+ kc.token
                  }
            })
            return products.data
        },
        deleteProduct : async(product)=>{
            const products = await Axios.delete(EndPoints.productMS+"products/"+product.id,{
                headers: {
                    Authorization :"Bearer "+ kc.token
                  }
            })
            return products.data
        },
        addProduct : async(product)=>{
            const products = await Axios.post(EndPoints.productMS+"products/",{
                ...product
            },{
                headers: {
                    Authorization :"Bearer "+ kc.token
                  }
            })
            return products.data
        }
    }
}


export default (productService) ;
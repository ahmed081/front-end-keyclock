
import { Row, Col, Card, Descriptions, Button ,Modal,Select,Divider } from 'antd';
import { Input } from 'antd';
import {connect } from "react-redux"
import ProductSevice from "../services/productService"
import CustomerSevice from "../services/customerService"
import BillingSevice from "../services/billinService"
import ProductItemSevice from "../services/productItemService"
import AddCustomerComponent from '../Customers/AddCustomer'
import { useEffect, useState } from 'react';
const { Search } = Input;
const { Option } = Select;
let PSevice;
let CSevice;
let BSevice;
let PISevice;
const AddBilling = (props)=>{
    const [products,setProducts] = useState([])
    const [customers,setCustomers] = useState([])
    const [loading,setLoading] = useState(true)
    const [panier, setPanier] =useState([])
    const {kc}=props

    PSevice = ProductSevice(kc)
    CSevice = CustomerSevice(kc)
    BSevice = BillingSevice(kc)
    PISevice = ProductItemSevice(kc)
    useEffect(()=>{
      
        PSevice.getProducts().then(p=>{
          setProducts([...p])
          setLoading(false)
          console.log("products =>",p)
        });
        CSevice.getCustomers().then(c=>{
            setCustomers([...c])
            console.log("customers =>",c)
          });
      },[kc])
    return(
        <Row>
                
                <Col span={16}>
                    <h2>
                        <center>
                            Products
                        </center>
                    </h2>
                    <Search placeholder="searsh for Product"/>
                    {
                        loading?<div>please wait</div>:
                        <ProductItems panier={panier} setPanier={setPanier} products={products} setProducts={setProducts}/>
                    }
                    
                </Col>
                <Col offset={2} span={6}>
                    <Panier panier={panier}/>
                    <Divider />
                    <Total panier={panier} />
                    <ValiderCMD panier={panier} customers={customers} setCustomers={setCustomers} />
                </Col>
            </Row>
    )
}

const ProductItems =(props)=>{
    const {products,setProducts} = props
    const {panier,setPanier} = props
    useEffect(()=>{
        setPanier([])
        
      },[products])
    
    const addToPanier=(product)=>{
        let pan = {
            ...product,
            total:product.price,
            quantity: 1
        }
        const tmpPanier = panier.find(p => p.id === product.id)
        const index = panier.indexOf(tmpPanier)
        console.log(index)
        if(tmpPanier)
        {
            pan = {

                ...product,
                total:(panier[index].quantity+1)*product.price,
                quantity: panier[index].quantity+1
            } 
            console.log("exist............")
            setPanier([
                ...panier.slice(0,index),
                pan,
                ...panier.slice(index+1,panier.length)
            ])
        }else 
            setPanier([
                ...panier,
                pan
            ]) 
        console.log("add to panier ..............")
        console.log(panier)
    }
    return (
        <>
        
        <Row>
            {
                products.map(p => <Product addToPanier={addToPanier} product={p} panier={panier} setPanier={setPanier}/>)
            }
        </Row>
        
        
        </>
    )
}
const Product =(props)=>{


    const {product} = props
    const {addToPanier} = props

    return (
        <Col>
            <Card onClick={()=>addToPanier(product)} title={product.description} style={{ width: 200 }}>
                <p>Price : {product.price}</p>
                <p>Quantity : : {product.quantity}</p>
            </Card>
        </Col>
    )
}
export const Panier =(props)=>{
    const {panier} = props

    return (
        <div>
            <h2>
                <center>
                    Panier
                </center>
            </h2>
            <Row>
                {
                    panier.map(p=>{
                        return (
                            <Col span={24}>
                                <Descriptions
                                    colon
                                    title={`${p.description}`}
                                    column={2}
                                    >
                                    <Descriptions.Item label="quantity">{p.quantity}</Descriptions.Item>
                                    <Descriptions.Item label="total">{p.total}</Descriptions.Item>
                                </Descriptions>
                            </Col>
                        )
                    })
                }
                
                
            </Row>
        </div>
        
        
    )
}
const Total=(props)=>{
    const {panier} =props
    const [total , setTotal] =useState(0)
    useEffect(()=>{
        let t = 0;
        panier.map(p=>{
            t+=p.total
        })
        setTotal(t)

    },[panier])
    return (
        <Row >
            <Col  span={16}>
            <h1>Total</h1>
            </Col>
            <Col span={8}>
                {
                    `${total} DHs`
                }
            </Col>
        </Row>
    )

}
const ValiderCMD=(props)=>{
    const {customers, setCustomers,panier} =props
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [customer,setCustomer] = useState({})
    const showAddBillModal = () => {
        
        setIsModalVisible(true);
    };
    function handleChange(value) {
        setCustomer({...customers.find(c => c.id == value)})
        
    }
    const handleAddBill = () => {
        const bill = {
            billingDate: new Date(),
            customerId : customer.id
        }
        BSevice.addBill(bill).then(b =>{
            console.log(b)
            panier.map(pi =>{
                PISevice.addproductItems({
                    price:pi.total,
                    quantity : pi.quantity,
                    productId:pi.id,
                    bill: "http://localhost:8086/bills/"+b.id
                }).then(p =>{
                    console.log("added........")
                    setIsModalVisible(false);
                })
            })
        })
       
    };
  
    const handleCancel = () => {
      setIsModalVisible(false);
    };
    return (
        <>
        <Button onClick={showAddBillModal} type="success"> add Bill </Button>
        <AddBillModal handleChange={handleChange} setCustomers={setCustomers} panier={panier} customers={customers} isModalVisible={isModalVisible} handleCancel={handleCancel}  handleAddBill={handleAddBill} />
        </>
        
    )

}
const AddBillModal = (props) => {
    const {handleAddBill,handleCancel,isModalVisible,customers,panier,setCustomers,handleChange} = props
    
    
    return (
      <>
        <Modal title="Add Bill" visible={isModalVisible} onOk={handleAddBill} onCancel={handleCancel}>
        <Select defaultValue="customers" style={{width:"100%"}} onChange={handleChange}>
            {
                customers.map(customer=>{
                    return (
                        <Option value={`${customer.id}`}>{`${customer.fullName}`}</Option>
                    )
                })
            }
            
        </Select>
        <AddCustomer setCustomers={setCustomers}/>
        <Panier panier={panier}/>
        <Divider />
        <Total panier={panier} />
        </Modal>
      </>
    );
  };


const AddCustomer = (props )=>{
    const [isModalVisible, setIsModalVisible] = useState(false);
    const {setCustomers} = props
    
    const showAddCustomerModal = () => {
        setIsModalVisible(true);
      };
    
      const handleAddCustomer = () => {
        CSevice.getCustomers().then(c=>{
            setCustomers([...c])
            console.log("customers =>",c)
        });
        setIsModalVisible(false);
      };
    
      const handleCancel = () => {
        setIsModalVisible(false);
      };
      return (
          <>
            <Button onClick={showAddCustomerModal}>Add New Customer</Button>
            <AddCustomerModal isModalVisible={isModalVisible} handleCancel={handleCancel}  handleAddCustomer={handleAddCustomer} />
          
          </>

      )
  }

const AddCustomerModal = (props) => {
    const {handleAddCustomer,handleCancel,isModalVisible} = props
    
    return (
      <>
        <Modal title="Add customer" visible={isModalVisible} onOk={handleAddCustomer} onCancel={handleCancel}>
            <AddCustomerComponent handleAddCustomer={handleAddCustomer} />
        </Modal>
      </>
    );
};
const mapStore =(store)=>{
    const {keycloakReducer} = store
    return {
        kc: keycloakReducer,
    }
  
}
  
export default connect(mapStore ,{}) (AddBilling) ;
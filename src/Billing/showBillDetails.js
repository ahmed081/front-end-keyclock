import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import {connect } from "react-redux"
import billinService from "../services/billinService"
import { Col, Descriptions, Row } from "antd"



const ShowBillDetaild =(props)=>{
    
    const {id} = useParams()
    const {kc} = props
    const BService = billinService(kc)

    const [loading,setLoading] = useState(true)
    const [bill,setBill] = useState({})
    const [total,setTotal] = useState(0)

    useEffect(()=>{
        setLoading(true)
        
        BService.getBill(id).then(bill=>{
            console.log(bill)
            setBill(bill)
            let t = 0;
            bill.productItems.map(b=>{
                t+=b.price
            })
            setTotal(t)
            setLoading(false)
        })
    },[kc])

    return (
        <div>
        {
            loading ? <div>Please wait</div>:<Row>
            <Col span={8}>
                
                <Descriptions
                
                    title="Customer"
                    column={1}
                    >
                    <Descriptions.Item label="fullName">{`${bill.costumer.fullName}`}</Descriptions.Item>
                    <Descriptions.Item label="email">{`${bill.costumer.email}`}</Descriptions.Item>
                </Descriptions>
            </Col>
            <Col span={8}>
                <h1>Product Item</h1>
                {
                    bill.productItems.map(p=>{
                        return (
                            <Descriptions
                                
                                title={`${p.product.description}`}
                                column={2}
                                >
                                <Descriptions.Item label="quantity">{`${p.quantity}`}</Descriptions.Item>
                                <Descriptions.Item label="total">{`${p.price}`}</Descriptions.Item>
                            </Descriptions>
                        )
                    })
                }
                
            </Col>
            <Col span={8}>
            <Descriptions
                                
                title="Total"
                column={2}
                >
                <Descriptions.Item>{`${total}`}</Descriptions.Item>
            </Descriptions>
            </Col>
        </Row>
        }
        </div>
        )
        
    
}

const mapStore =(store)=>{
    const {keycloakReducer} = store
    return {
        kc: keycloakReducer,
    }
  
}
  
export default connect(mapStore ,{}) (ShowBillDetaild) ;
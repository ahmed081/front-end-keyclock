import { Table, Tag, Space } from 'antd';
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import BillingSevice from "../services/billinService"
import {connect } from "react-redux"


const columns = [
    {
        title: 'Customer',
        dataIndex: 'customer',
        key: 'customer',
        render: (text,record, index) => <Link to={`/Billing/${record.id}`}>{text}</Link>,
    },
    
    {
        title: 'Total',
        dataIndex: 'total',
        key: 'total',
    },
    {
        title: 'Billing Date',
        dataIndex: 'billingDate',
        key: 'billingDate',
        
    },
    

];
const data =[
    {
        key: "1",
        billingDate:"12-2-2020",
        total:1200,
        customer:"ahmed"
    },
    {
        key: "2",
        billingDate:"12-2-2020",
        total:1200,
        customer:"ahmed"
    },
    {
        key: "3",
        billingDate:"12-2-2020",
        total:1200,
        customer:"ahmed"
    },
]
const BillingList =(props)=>{
    const {kc}=props
    const BService = BillingSevice(kc)
    const [loading,setLoading] = useState(true)
    const [bills,setBills] = useState([])
    useEffect(()=>{
        setLoading(true)
    },[])
    useEffect(()=>{
        
        BService.getBills().then(b =>{
           
            const bill = b.map((bi,index) =>{
                const total = bi.productItems.reduce((a,b)=>a.price+b.price)
                return {
                    key: index+1,
                    billingDate:bi.billingDate,
                    id:bi.id,
                    total:total,
                    customer:bi.costumer.fullName
                }
            })
            setBills([...bill])
            setLoading(false)
        })
    },[kc])

    return (
        <div>
            Billing list
            <Table loading={loading} columns={columns} dataSource={bills} />
        </div>
    )
}
const mapStore =(store)=>{
    const {keycloakReducer} = store
    return {
        kc: keycloakReducer,
    }
  
  }
  
export default connect(mapStore ,{}) (BillingList) ;

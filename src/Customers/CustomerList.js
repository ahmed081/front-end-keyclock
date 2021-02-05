import { Table, Tag, Space } from 'antd';
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import CustomerSevice from "../services/customerService"
import {connect } from "react-redux"

const columns = [
  {
    title: 'FullName',
    dataIndex: 'fullName',
    key: 'fullName',
    render: (text,record, index) => <Link to={`/Customers/${record.id}`}>{text}</Link>,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  }
];

const CustomerList = (props)=>{
  const {kc}=props
  const CSevice = CustomerSevice(kc)
  const [customers,setCustomers] = useState([])
  const [loading,setLoading] = useState(true)
    useEffect(()=>{
      setLoading(true)
    },[])
    useEffect(()=>{
      
      CSevice.getCustomers().then(c=>{
        setCustomers([...c])
        setLoading(false)
        console.log("customers =>",c)
      });
    },[kc])
    return <Table columns={columns} dataSource={customers} />
}
const mapStore =(store)=>{
  const {keycloakReducer} = store
  return {
      kc: keycloakReducer,
  }

}

export default connect(mapStore ,{}) (CustomerList) ;
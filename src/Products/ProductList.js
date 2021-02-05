import { Table, Tag, Space } from 'antd';
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import {connect } from "react-redux"
import ProductSevice from "../services/productService"

const columns = [
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
    render: (text,record, index) => <Link to={`/products/${record.id}`}>{text}</Link>,
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
    key: 'quantity',
  },
  
];


const ProductList = (props)=>{
  const {kc}=props
  const PSevice = ProductSevice(kc)
  const [products,setProducts] = useState([])
  const [loading,setLoading] = useState(true)
    useEffect(()=>{
      setLoading(true)
    },[])
    useEffect(()=>{
      
      PSevice.getProducts().then(p=>{
        setProducts([...p])
        setLoading(false)
        console.log("products =>",p)
      });
    },[kc])
    return <Table loading={loading} columns={columns} dataSource={products} />
}

const mapStore =(store)=>{
  const {keycloakReducer} = store
  return {
      kc: keycloakReducer,
  }

}

export default connect(mapStore ,{}) (ProductList) ;

import React, { useEffect, useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import ProductSevice from "../services/productService"
import {connect } from "react-redux"
import { Redirect } from 'react-router-dom';
const AddProduct = (props) => {
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState('horizontal');

  const onFormLayoutChange = ({ layout }) => {
    setFormLayout(layout);
  };

  const formItemLayout =
    formLayout === 'horizontal'
      ? {
          labelCol: {
            span: 4,
          },
          wrapperCol: {
            span: 14,
          },
        }
      : null;
  const buttonItemLayout =
    formLayout === 'horizontal'
      ? {
          wrapperCol: {
            span: 14,
            offset: 4,
          },
        }
      : null;
      
    const key = 'updatable';
    const {kc} = props
    const PSevice = ProductSevice(kc)
    const [product,setProduct] = useState({
      description:"",
      price:"",
      quantity:""
    })
    const [added,setAdded] = useState(false)

    useEffect(()=>{
      
    },[kc])
    useEffect(()=>{
      setProduct({
        description:"",
        price:"",
        quantity:""
      })
    },[])

    const addProduct=()=>{
      message.loading({ content: 'Loading...', key });
      PSevice.addProduct(product).then(p=>{
          message.success({ content: 'Add Success!', key, duration: 2 });
          setAdded(true)
      }).catch(err=>{
        message.error({ content: 'Add failed!', key, duration: 2 });
      })
    } 
  return (
    <>
        Add new Product 
        {
          added?<Redirect to="/products" />:""
        }
        <Form
        {...formItemLayout}
        layout={formLayout}
        form={form}
        initialValues={{
          layout: formLayout,
        }}
        onValuesChange={onFormLayoutChange}
      >
        
        <Form.Item label="Description">
          <Input value={product.description} onChange={(event)=>{setProduct({...product,description:event.target.value});}}  placeholder="Description" />
        </Form.Item>
        <Form.Item label="Quantity">
          <Input value={product.quantity} onChange={(event)=>{setProduct({...product,quantity:event.target.value});}}  placeholder="Quantity" />
        </Form.Item>
        <Form.Item label="Price">
          <Input value={product.price} onChange={(event)=>{setProduct({...product,price:event.target.value});}}  placeholder="Price" />
        </Form.Item>
        <Form.Item {...buttonItemLayout}>
          <Button onClick={()=>addProduct()} type="primary">Save</Button>
        </Form.Item>
      </Form>
    
     
    </>
  );
};
const mapStore =(store)=>{
  const {keycloakReducer} = store
  return {
      kc: keycloakReducer,
  }

}

export default connect(mapStore ,{}) (AddProduct) ;
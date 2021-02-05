
import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Radio ,message } from 'antd';
import { Redirect, useParams } from 'react-router-dom';
import ProductSevice from "../services/productService"
import {connect } from "react-redux"

const ShowProduct = (props) => {
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState('horizontal');

  const onFormLayoutChange = ({ layout }) => {
    setFormLayout(layout);
  };
  const {kc} = props
  const PSevice = ProductSevice(kc)
  const {id} = useParams()
  const key = 'updatable';
  
  const [product,setProduct] = useState()
  const [loading,setLoading] = useState(true)
  const [deleted,setDeleted] = useState(false)
  const [edit,setEdit] = useState(false)
  useEffect(()=>{
    PSevice.getOneProduct(id).then(p=>{
      setProduct({...p})
      setLoading(false)
      console.log("products =>",p)
    });
  },[kc])

  const editProduct=()=>{
    message.loading({ content: 'Loading...', key });
    setEdit(false)
    PSevice.editProduct(product).then(p=>{
      
      
        message.success({ content: 'Edit Success!', key, duration: 2 });
        setEdit(false)
    })
  }
  const deleteProduct=()=>{
    message.loading({ content: 'Loading...', key });
    setEdit(false)
    PSevice.deleteProduct(product).then(p=>{
        message.success({ content: 'Delete Success!', key, duration: 2 });
        setDeleted(true)
        
    }).catch(err=>{
      message.error({ content: 'Delete failed!', key, duration: 2 });
    })
  }
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
  return (
    <>
    {
      deleted?<Redirect to="/products" />:""
    }
    Show Product 
    {
      loading?<div>Please wait</div>:
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
          <Input value={product.description} onChange={(event)=>{setProduct({...product,description:event.target.value});setEdit(true)}}  placeholder="Description" />
        </Form.Item>
        <Form.Item label="Quantity">
          <Input value={product.quantity} onChange={(event)=>{setProduct({...product,quantity:event.target.value});setEdit(true)}}  placeholder="Quantity" />
        </Form.Item>
        <Form.Item label="Price">
          <Input value={product.price} onChange={(event)=>{setProduct({...product,price:event.target.value});setEdit(true)}}  placeholder="Price" />
        </Form.Item>
        <Form.Item {...buttonItemLayout}>
          {edit===false?<Button disabled type="primary">Edit Product</Button>:<Button onClick={()=>editProduct()} type="primary">Edit Product</Button>}
          <Button onClick={()=>deleteProduct()} type="danger">Delete Product</Button>
        </Form.Item>
      </Form>
    }
      
    </>
  );
};

const mapStore =(store)=>{
  const {keycloakReducer} = store
  return {
      kc: keycloakReducer,
  }

}

export default connect(mapStore ,{}) (ShowProduct) ;
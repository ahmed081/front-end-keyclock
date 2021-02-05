
import React, { useState,useEffect } from 'react';
import { Form, Input, Button, message } from 'antd';
import { Redirect, useParams } from 'react-router-dom';
import CustomerSevice from "../services/customerService"
import {connect } from "react-redux"


const ShowCustomer = (props) => {
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
  
    const {kc} = props
    const CSevice = CustomerSevice(kc)
    const {id} = useParams()
    const key = 'updatable';
    
    const [customer,setCustomer] = useState()
    const [loading,setLoading] = useState(true)
    const [deleted,setDeleted] = useState(false)
    const [edit,setEdit] = useState(false)
    useEffect(()=>{
      CSevice.getOneCustomer(id).then(c=>{
        setCustomer({...c})
        setLoading(false)
        console.log("customer =>",c)
      });
    },[kc])
  
    const editCustomer=()=>{
      message.loading({ content: 'Loading...', key });
      setEdit(false)
      CSevice.editCustomer(customer).then(p=>{
        
        
          message.success({ content: 'Edit Success!', key, duration: 2 });
          setEdit(false)
      })
    }
    const deleteCustomer=()=>{
      message.loading({ content: 'Loading...', key });
      setEdit(false)
      CSevice.deleteCustomer(customer).then(p=>{
          message.success({ content: 'Delete Success!', key, duration: 2 });
          setDeleted(true)
          
      }).catch(err=>{
        message.error({ content: 'Delete failed!', key, duration: 2 });
      })
    }
    
  return ( 
    <>
    Show Customer 
    {
      deleted?<Redirect to="/Customers" />:""
    }
      {
        loading?<div>Please wait......</div>:
        <Form
        {...formItemLayout}
        layout={formLayout}
        form={form}
        initialValues={{
          layout: formLayout,
        }}
        onValuesChange={onFormLayoutChange}
      >
        
        <Form.Item label="Full Name">
          <Input value={customer.fullName} onChange={(event)=>{setCustomer({...customer,fullName:event.target.value});setEdit(true)}} placeholder="Full Name" />
        </Form.Item>
        <Form.Item label="Email">
          <Input value={customer.email} onChange={(event)=>{setCustomer({...customer,email:event.target.value});setEdit(true)}} placeholder="email" />
        </Form.Item>

        <Form.Item {...buttonItemLayout}>
        {edit===false?<Button disabled type="primary">Edit Customer</Button>:<Button onClick={()=>editCustomer()} type="primary">Edit Customer</Button>}
          <Button onClick={()=>deleteCustomer()} type="danger">Delete Customer </Button>
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

export default connect(mapStore ,{}) (ShowCustomer) ;
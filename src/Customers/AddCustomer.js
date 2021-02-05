
import React, { useEffect, useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import CustomerSevice from "../services/customerService"
import {connect } from "react-redux"
import { Redirect } from 'react-router-dom';
const AddCustomer = (props) => {
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
    const CSevice = CustomerSevice(kc)
    const [customer,setCustomer] = useState({
      fullName:"",
      email:""
    })
    const [added,setAdded] = useState(false)

    useEffect(()=>{
      
    },[kc])
    useEffect(()=>{
      setCustomer({
        fullName:"",
        email:"",
      })
    },[])

    const addCustomer=()=>{
      message.loading({ content: 'Loading...', key });
      CSevice.addCustomer(customer).then(p=>{
          message.success({ content: 'Add Success!', key, duration: 2 });
          setAdded(true)
          props.handleAddCustomer()
      }).catch(err=>{
        message.error({ content: 'Add failed!', key, duration: 2 });
      })
    } 
  return (
    <>
        Add new Customer
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
          <Input value={customer.fullName} onChange={(event)=>{setCustomer({...customer,fullName:event.target.value});}}  placeholder="full name" />
        </Form.Item>
        <Form.Item label="Email">
          <Input value={customer.email} onChange={(event)=>{setCustomer({...customer,email:event.target.value});}}  placeholder="Email" />
        </Form.Item>
        
        <Form.Item {...buttonItemLayout}>
          <Button onClick={()=>addCustomer()} type="primary">Save</Button>
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

export default connect(mapStore ,{}) (AddCustomer) ;
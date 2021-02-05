import { Layout, Menu,  } from 'antd';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
  } from "react-router-dom";
import ProductComponent from './Products';
import CustomerComponent from './Customers';
import BilligComponent from './Billing';
import initOptions from "./kc.json"
import { useEffect, useState } from 'react';
import Keycloak from "keycloak-js"
import {connect,useDispatch} from "react-redux"
import Actions from './redux/actions'
const { Header, Content, Footer } = Layout;
const { SubMenu } = Menu;
const CustomLayout =(props)=>{
    const dispatch = useDispatch();
    const {keycloakAction} = props;
    const [kc,setKc] = useState()
    const kcAuth =async ()=>{
        const keycloak = Keycloak(initOptions);
        await keycloak.init({onLoad: 'check-sso',promiseType:'native'});
        return keycloak
    }
    useEffect(()=>{
        kcAuth().then(kc=>{
            setKc(kc)
            keycloakAction(kc)
                
        })
        console.log("app")
    
    },[])
      
    return (
        <Layout>
            <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
            <div className="logo" />
            
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                    
                    <Menu.Item key="2"><Link to='/'>E-MAGASIN</Link> </Menu.Item>:<Menu.Item > </Menu.Item>
                    {
                        kc && kc.authenticated && kc.hasRealmRole("PRODUCT_MANAGER")?
                        <SubMenu title="Products" key='1' >
                                <Menu.Item><Link to='/products'>Product List</Link> </Menu.Item>
                                <Menu.Item> <Link to='/products/add'>Add New</Link> </Menu.Item>
                            </SubMenu>:<Menu.Item > </Menu.Item>
                    }
                    {
                        kc && kc.authenticated && kc.hasRealmRole("CUSTOMER_MANAGER")?
                        <Menu.Item key="2"><Link to='/Customers'>Costumers</Link> </Menu.Item>:<Menu.Item > </Menu.Item>
                    }       
                    {
                        kc && kc.authenticated && kc.hasRealmRole("BILLING_MANAGER")?
                            <SubMenu title="Billing" key='3' >
                                <Menu.Item><Link to='/Billing'>Billing List</Link> </Menu.Item>
                                <Menu.Item> <Link to='/Billing/add'>Add New</Link> </Menu.Item>
                            </SubMenu>:<Menu.Item > </Menu.Item>
                    }   
                            

                    {
                        kc && kc.authenticated?<SubMenu title={`${kc.idTokenParsed.name}`} style={{"float":"right"}}>
                        <Menu.Item>Profile</Menu.Item>
                        <Menu.Item onClick={()=>{kc.logout()}}>Logout</Menu.Item>
                        </SubMenu>:<Menu.Item style={{"float":"right"}} onClick={()=>{kc.login()}} > <Link>Login</Link> </Menu.Item>
                    }
                    
                            
                          
                    
                </Menu>
            
            
            </Header>
            <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
            <Switch>
                <Route path="/Products">
                    <ProductComponent/>
                </Route>
                <Route path="/Customers">
                    <CustomerComponent/>
                </Route>
                <Route path="/Billing">
                    <BilligComponent/>
                </Route>
            </Switch>
            
            
            </Content>
            <Footer style={{ textAlign: 'center' }}>Billing project <br/>Ahmed EL ASSIMI<br/>BDCC3</Footer>
        </Layout>
    )
}

export default connect(null ,{...Actions}) (CustomLayout);

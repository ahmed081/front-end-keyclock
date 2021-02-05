import CustomerList from "./CustomerList"
import { Input } from 'antd';
import { Route, Switch } from "react-router-dom";
import ShowCustomer from "./showCustomer"
import {connect } from "react-redux"
import Actions from '../redux/actions'
import { useEffect } from "react";
const { Search } = Input;
const CustomerCompenent =(props)=>{
    const {kc}= props;
    useEffect(()=>{
        console.log("props",props.kc.token)
    
      },[kc])

    return (
        <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
            {
                (kc && kc.authenticated && kc.hasRealmRole("CUSTOMER_MANAGER"))?
                    <Switch>
                        <Route exact path='/Customers'>
                            <div>
                                Costumers list
                                <Search placeholder="searsh for Customer"/>
                                <CustomerList/>
                            </div>
                        </Route>
                        <Route exact path='/Customers/:id'>
                            <ShowCustomer/>
                        </Route>
                    </Switch>:<div>Unauthorised</div>
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
export default connect(mapStore ,{...Actions}) (CustomerCompenent) ;
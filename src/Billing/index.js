
import { Route, Switch } from 'react-router-dom';
import AddBilling from './AddBilling';
import BillingList from './BillingList';
import ShowBillDetaild from './showBillDetails';
import {connect } from "react-redux"
import Actions from '../redux/actions'
import { useEffect } from 'react';

const BilligComponent = (props)=>{

    const {kc}= props;
    useEffect(()=>{
        console.log(kc)
      },[kc])
    return (
        <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
            {
                (kc && kc.authenticated && kc.hasRealmRole("BILLING_MANAGER"))?
                    <Switch>
                        <Route exact path='/Billing'>
                            <BillingList/>
                        </Route>
                        <Route exact path="/Billing/add">
                            <AddBilling/>
                        </Route>
                        <Route exact path="/Billing/:id">
                            <ShowBillDetaild/>
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
export default connect(mapStore ,{...Actions}) (BilligComponent) ;
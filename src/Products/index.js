import ProductList from "./ProductList"
import { Input } from 'antd';
import { Route, Switch } from "react-router-dom";
import ShowProduct from "./ShowProduct";
import AddProduct from "./AddProduct";
import {connect } from "react-redux"
import Actions from '../redux/actions'
import { useEffect } from "react";

const { Search } = Input;
const ProductCompenent =(props)=>{

    const {kc}= props;
    useEffect(()=>{
        console.log("props",props.kc.token)
    
      },[kc])
    return (
        <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
            {
                    (kc && kc.authenticated && kc.hasRealmRole("PRODUCT_MANAGER"))?
                        <Switch>
                            <Route exact path='/products'>
                                <div>
                                    Product list
                                    <Search placeholder="searsh for product"/>
                                    <ProductList/>
                                </div>
                            </Route>
                            <Route exact path='/products/add'>
                                <AddProduct/>
                            </Route>
                            <Route exact path='/products/:id'>
                                <ShowProduct/>
                            </Route>
                        </Switch>
                    : <div>unauthorised</div>
            
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

export default connect(mapStore ,{...Actions}) (ProductCompenent) ;

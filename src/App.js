import logo from './logo.svg';
import './App.css';
import Layout from './Layout'
import {
  BrowserRouter as Router,

} from "react-router-dom";

import reducers from './redux/reducers'

import { Provider } from 'react-redux'
import { createStore } from 'redux'

const store = createStore(reducers,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
function App(props) {
  
  return (
    <Provider store={store}>
        <Router>
      <Layout/>
    </Router>
    </Provider>
  
  );

}

export default App;

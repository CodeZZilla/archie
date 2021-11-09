import './App.css';
import {Route, Switch} from "react-router-dom";
import Header from "./Components/Header";
import CompanyAdd from "./Components/CompanyAdd";
import Home from "./Components/Home";
import Backendless from 'backendless';


const APP_ID = '70833ED6-CF55-DCA8-FFD1-0F4165255600';
const API_KEY = 'FFEAFF95-7EB6-49B6-BBD2-B5F7964DB25C';
Backendless.serverURL = 'https://api.backendless.com';
Backendless.initApp(APP_ID, API_KEY);


const App = () => {
    return (
        <div className="App">
            <Header/>
            <Switch>
                <Route path='/home' component={Home}/>
                <Route path='/company-add'>
                    <CompanyAdd/>
                </Route>
                {/*<Route path='/company-list' component={CompanyList}/>*/}
                {/*<Route path='/company-item/:id' component={CompanyItem}/>*/}
                {/*<Route path='/location-list' component={LocationList}/>*/}
                {/*<Route path='/location-item/:id' component={LocationItem}/>*/}
                {/*<Route path='/user-add' component={UserAdd}/>*/}
                {/*<Route path='/client-add' component={Client}/>*/}
            </Switch>
        </div>
    );
}


export default App;

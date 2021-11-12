import './App.css';
import {Route, Switch} from "react-router-dom";
import Header from "./Components/Header";
import CompanyAdd from "./Components/CompanyAdd";
import Home from "./Components/Home";
import CompanyList from "./Components/CompanyList";
import Backendless from 'backendless';
import SuperUserPatients from "./Components/SuperUserPatients";
import PatientAdd from "./Components/PatientAdd";
import SpectaclePrescriptionForm from "./Components/SpectaclePrescriptionForm";
import SpectaclePrescription from "./Store/SpectaclePrescription";
import SpectaclePrescriptionTable from "./Components/SpectaclePrescriptionTable";
import ContactLensPrescriptionForm from "./Components/ContactLensPrescriptionForm";
import ContactLensPrescriptionTable from "./Components/ContactLensPrescriptionTable";


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
                <Route path='/company-list' component={CompanyList}/>
                <Route path='/company-item/:id' component={CompanyAdd}/>
                <Route path='/patients-super-user' component={SuperUserPatients}/>
                <Route path='/new-patient'>
                    <PatientAdd title='Add Patient' btnText='Save'/>
                </Route>
                <Route path='/spectacle-prescription' component={SpectaclePrescriptionForm}/>
                <Route path='/spectacle-prescription-table' component={SpectaclePrescriptionTable}/>
                <Route path='/spectacle-prescription-item/:id'>
                    <SpectaclePrescriptionForm read={true}/>
                </Route>
                <Route path='/contact-lens-prescription' component={ContactLensPrescriptionForm}/>
                <Route path='/contact-lens-prescription-table' component={ContactLensPrescriptionTable}/>
                <Route path='/contact-lens-prescription-item/:id'>
                    <ContactLensPrescriptionForm read={true}/>
                </Route>
                {/*<Route path='/client-add' component={Client}/>*/}
            </Switch>
        </div>
    );
}


export default App;

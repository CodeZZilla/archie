import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Components/Home";
import CompanyAdd from "./Components/CompanyAdd";
import CompanyList from "./Components/CompanyList";
import SuperUserPatients from "./Components/SuperUserPatients";
import PatientAdd from "./Components/PatientAdd";
import PatientsTable from "./Components/PatientsTable";
import SpectaclePrescriptionForm from "./Components/SpectaclePrescriptionForm";
import SpectaclePrescriptionTable from "./Components/SpectaclePrescriptionTable";
import ContactLensPrescriptionForm from "./Components/ContactLensPrescriptionForm";
import ContactLensPrescriptionTable from "./Components/ContactLensPrescriptionTable";
import UserProfile from "./Components/UserProfile";
import OrderAdd from "./Components/Order/OrderAdd";

export const useRoutes = (userType) => {
    switch (userType) {
        case "SuperAdmin":
            return (
                <div className="App">
                    <Header role="SuperAdmin"/>
                    <Switch>
                        <Route path='/home'>
                            <Home/>
                        </Route>
                        <Route path='/company-add'>
                            <CompanyAdd/>
                        </Route>
                        <Route path='/company-list'>
                            <CompanyList/>
                        </Route>
                        <Route path='/company-item/:id'>
                            <CompanyAdd/>
                        </Route>
                        <Route path='/user/:id'>
                            <UserProfile/>
                        </Route>
                    </Switch>
                </div>
            );
        case "UserLocation":
            return (
                <div className="App">
                    <Header role="UserLocation"/>
                    <Switch>
                        <Route path='/home'>
                            <Home/>
                        </Route>
                        <Route path='/patients-super-user'>
                            <SuperUserPatients/>
                        </Route>
                        <Route path='/new-patient'>
                            <PatientAdd title='Add Patient' btnText='Save'/>
                        </Route>
                        <Route path='/patient-tables'>
                            <PatientsTable/>
                        </Route>
                        <Route path='/spectacle-prescription'>
                            <SpectaclePrescriptionForm/>
                        </Route>
                        <Route path='/spectacle-prescription-table'>
                            <SpectaclePrescriptionTable/>
                        </Route>
                        <Route path='/spectacle-prescription-item/:id'>
                            <SpectaclePrescriptionForm read={true}/>
                        </Route>
                        <Route path='/contact-lens-prescription'>
                            <ContactLensPrescriptionForm/>
                        </Route>
                        <Route path='/contact-lens-prescription-table'>
                            <ContactLensPrescriptionTable/>
                        </Route>
                        <Route path='/contact-lens-prescription-item/:id'>
                            <ContactLensPrescriptionForm read={true}/>
                        </Route>
                        <Route path='/user/:id'>
                            <UserProfile/>
                        </Route>
                        <Route path='/order-add'>
                            <OrderAdd/>
                        </Route>
                    </Switch>
                </div>
            )
        default:
            return (
                <h1>Error user role</h1>
            )
    }
}
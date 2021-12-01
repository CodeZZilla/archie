import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Header from "./Components/Main/Header";
import Home from "./Components/Main/Home";
import CompanyAdd from "./Components/Company/CompanyAdd";
import CompanyList from "./Components/Company/CompanyList";
import PatientAdd from "./Components/Patient/PatientAdd";
import PatientsTable from "./Components/Patient/PatientsTable";
import SpectaclePrescriptionForm from "./Components/Prescriptions/SpectaclePrescriptionForm";
import SpectaclePrescriptionTable from "./Components/Prescriptions/SpectaclePrescriptionTable";
import ContactLensPrescriptionForm from "./Components/Prescriptions/ContactLensPrescriptionForm";
import ContactLensPrescriptionTable from "./Components/Prescriptions/ContactLensPrescriptionTable";
import UserProfile from "./Components/User/UserProfile";
import OrderAdd from "./Components/Order/OrderAdd";
import LocationAddEdit from "./Components/Location/LocationAddEdit";
import LocationList from "./Components/Location/LocationList";
import CompanyItem from "./Components/Company/CompanyItem";
import InventoryHome from "./Components/Inventory/InventoryHome";
import ProductAdd from "./Components/Product/ProductAdd";
import AddItem from "./Components/Item/AddItem";


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
                            <CompanyItem/>
                        </Route>
                        <Route path='/location-add'>
                            <LocationAddEdit newFlag={true}/>
                        </Route>
                        <Route path='/location-list'>
                            <LocationList/>
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
                        <Route path='/inventory'>
                            <InventoryHome/>
                        </Route>
                        <Route path='/product-add'>
                            <ProductAdd/>
                        </Route>
                        <Route path='/item-add'>
                            <AddItem/>
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
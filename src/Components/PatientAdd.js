import {observer} from "mobx-react-lite";
import {useState} from "react";

const PatientAdd = observer(({fun, addStatus, indexLocation}) => {
    let [isLoading, setIsLoading] = useState(true)
    let [listRoles, setListRoles] = useState([])

    return(
        <h1>PatientAdd</h1>
    )
})

export default PatientAdd
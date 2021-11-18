import React, {useEffect, useState} from "react";
import {observer} from "mobx-react-lite";
import {Typeahead} from "react-bootstrap-typeahead";
import SpectaclePrescription from "../../Store/SpectaclePrescription";


const SelectAndSearch = observer(({value, id, options, key}) => {
    const [singleSelections, setSingleSelections] = useState([]);

    useEffect(() => {
        setSingleSelections([value])
    }, [])

    return (

        <Typeahead
            labelKey="name"
            onChange={(obj) => {
                setSingleSelections(obj)
            }}
            onBlur={() => {
                SpectaclePrescription.edit(id, singleSelections[0])
            }}
            options={options}
            selected={singleSelections}
        />
    )
})

export default SelectAndSearch
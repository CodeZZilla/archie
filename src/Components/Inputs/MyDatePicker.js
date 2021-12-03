import React, {useState} from "react";
import {observer} from "mobx-react-lite";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import enLocale from "date-fns/locale/en-US";
// import DatePicker from "@mui/lab/DatePicker";
import TextField from "@mui/material/TextField";
import Order from "../../Store/Order";
import DatePicker from 'react-date-picker'

const MyDatePicker = observer(() => {
        const [value, onChange] = useState(new Date());

        return (
            <DatePicker
                onChange={onChange}
                value={value}
                locate="us-US"
            />
            // <LocalizationProvider dateAdapter={AdapterDateFns} locate={enLocale}>
            //         <DatePicker
            //             size="small"
            //             label="Date"
            //             value={Order.object.date}
            //             onChange={(newValue) => Order.edit('date', newValue)}
            //             disabled
            //             renderInput={(params) => <TextField {...params} />}
            //         />
            // </LocalizationProvider>
        )
    }
)

export default MyDatePicker
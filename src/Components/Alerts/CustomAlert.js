import {observer} from "mobx-react-lite";
import {Alert} from "react-bootstrap";
import AlertStatus from "../../Store/AlertStatus";

const CustomAlert = observer(() => {
    return(
        AlertStatus.status ?
        <Alert variant={AlertStatus.variant} onClose={() => AlertStatus.setStatus(false)} dismissible>
            <Alert.Heading>{AlertStatus.title}</Alert.Heading>
            <p>
                {AlertStatus.msg}
            </p>
        </Alert> : null
    )
})

export default CustomAlert
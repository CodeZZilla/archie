import {observer} from "mobx-react-lite";
import {Col, Container, Row} from "react-bootstrap";
import ItemsTable from "../Tables/ItemsTable";

const InventoryHome = observer(() => {

    return(
        <Container className="mt-3">
            <Row>
                <Col>
                   <h1>Inventory Home</h1>
                </Col>
            </Row>
            <Row>
                <ItemsTable/>
            </Row>
        </Container>
    )
})

export default InventoryHome
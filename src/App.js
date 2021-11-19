import './App.css';
import {BrowserRouter as Router, Route} from "react-router-dom";
import CommonStore from "./Store/CommonStore"
import {observer} from "mobx-react-lite";
import {useRoutes} from "./routes";
import Login from "./Components/Main/Login";


const App = observer(() => {
    return (
        <Router>
            {CommonStore.token !== null ?
                useRoutes(CommonStore.token.split("___")[1]):
                <div className="App">
                    <Route path='/'>
                        <Login/>
                    </Route>
                </div>
            }
        </Router>
    );
})


export default App;

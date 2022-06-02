import "./App.css";
import Login from "./components/Login";
import Edit from "./components/Edit";
import { useEffect, useState, Fragment } from "react";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const setAuth = (boolean) => {
        setIsAuthenticated(boolean);
    };

    const SwitchPage = ({ isAuthenticated }) => {
        if (!isAuthenticated) {
            return <Login setAuth={setAuth} />;
        } else {
            return <Edit setAuth={setAuth} />;
        }
    };

    async function isAuth() {
        try {
            const response = await fetch(
                "http://localhost:3001/customer/is-verify",
                {
                    method: "GET",
                    headers: { token: localStorage.token },
                }
            );
            const parseRes = await response.json();
            parseRes === true
                ? setIsAuthenticated(true)
                : setIsAuthenticated(false);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        isAuth();
    }, []);

    return (
        <Fragment>
            <SwitchPage isAuthenticated={isAuthenticated} />
        </Fragment>
        // <div className="App">

        // </div>
    );
}

export default App;

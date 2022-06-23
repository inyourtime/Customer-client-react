import "./App.css";
import Login from "./components/Login";
import Edit from "./components/Edit";
import { useEffect, useState, Fragment } from "react";
import apiUrl from "./utils/ApiEndPoint";

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
            const response = await fetch(apiUrl.url + "/is-verify", {
                method: "GET",
                headers: { token: localStorage.token },
            });
            const data = await response.json();
            data === true
                ? setIsAuthenticated(true)
                : setIsAuthenticated(false);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        isAuth();
        console.log(window.OmiseCard)
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

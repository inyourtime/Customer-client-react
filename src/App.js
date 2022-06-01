import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Login";
import Edit from "./components/Edit";
import { useEffect, useState } from "react";

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
        <div className="App">
            <SwitchPage isAuthenticated={isAuthenticated} />
        </div>
    );
}

export default App;

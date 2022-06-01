import React, { useState, useEffect } from "react";
import EditAccount from "./EditAccount";
import EditInfo from "./EditInfo";

const Edit = ({ setAuth }) => {
    const [userAccount, setUserAccount] = useState({});

    const [userInfo, setUserInfo] = useState({});

    const changeUserAccountHandler = (e) => {
        setUserAccount({ ...userAccount, [e.target.name]: e.target.value });
    };

    const changeUserInfoHandler = (e) => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    };

    const logout = (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        setAuth(false);
    };

    async function getInfo() {
        try {
            const response = await fetch("http://localhost:3001/customer", {
                method: "GET",
                headers: { token: localStorage.token },
            });
            const parseRes = await response.json();
            setUserAccount(parseRes.user[0]);
            setUserInfo(parseRes.user_info[0]);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getInfo();
    }, []);

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                <div className="container">
                    <div className="navbar-brand" style={{ color: "white" }}>
                        Account Update
                    </div>
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <a
                                href=""
                                className="nav-link active"
                                style={{ color: "white" }}
                                onClick={(e) => logout(e)}
                            >
                                Logout
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
            <div className="edit-wrapper">
                <div className="edit-grid">
                    <EditAccount userAccount={userAccount} />
                    <EditInfo userInfo={userInfo} />
                    {/* <button onClick={(e) => logout(e)}>logout</button> */}
                </div>
            </div>
        </>
    );
};

export default Edit;

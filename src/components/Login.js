import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, TextField, Alert } from "@mui/material";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import Avatar from "@mui/material/Avatar";
import { pink } from "@mui/material/colors";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login";

import { gapi } from "gapi-script";
import apiUrl from "../utils/ApiEndPoint";

const Login = ({ setAuth }) => {
    const [isIncorrect, setIsIncorrect] = useState(false);

    const userLoginHandler = async (values) => {
        // e.preventDefault();
        const payload = {
            username: values.username,
            password: values.password,
        };
        // console.log(payload)
        try {
            const response = await fetch(apiUrl.url + "/customer/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            const data = await response.json();
            // console.log(parseRes)
            if (data.token) {
                localStorage.setItem("token", data.token);
                // console.log(parseRes.token);
                setAuth(true);
                setIsIncorrect(false);
            } else {
                setAuth(false);
                setIsIncorrect(true);
                // console.log(isIncorrect)
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    const googleLoginHandler = async (googleData) => {
        // console.log(googleData);
        try {
            const response = await fetch(
                apiUrl.url + "/customer/login/google",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        token: googleData.tokenId,
                    }),
                }
            );
            const data = await response.json();
            // console.log(data);
            if (data.token) {
                localStorage.setItem("token", data.token);
                // console.log(parseRes.token);
                setAuth(true);
                setIsIncorrect(false);
            } else {
                setAuth(false);
                setIsIncorrect(true);
                // console.log(isIncorrect)
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    const facebookLoginHandler = async (facebookData) => {
        const payload = {
            name: facebookData.name,
            email: facebookData.email,
        };
        // console.log(payload);
        try {
            const response = await fetch(
                apiUrl.url + "/customer/login/facebook",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                }
            );
            const data = await response.json();
            // console.log(data);
            if (data.token) {
                localStorage.setItem("token", data.token);
                // console.log(parseRes.token);
                setAuth(true);
                setIsIncorrect(false);
            } else {
                setAuth(false);
                setIsIncorrect(true);
                // console.log(isIncorrect)
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validationSchema: Yup.object({
            username: Yup.string().required(),
            password: Yup.string().required(),
        }),
        onSubmit: userLoginHandler,
    });

    const AlertUsernameOrPasswordIncorrect = ({ isIncorrect }) => {
        if (isIncorrect) {
            return (
                <Alert severity="error" sx={{ mt: 1 }}>
                    Username or password are incorrect!
                </Alert>
            );
        } else {
            return;
        }
    };

    useEffect(() => {
        function start() {
            gapi.client.init({
                clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
                scope: "email",
            });
        }

        gapi.load("client:auth2", start);
    }, []);

    return (
        <div className="auth-wrapper">
            <div className="auth-inner">
                <form onSubmit={formik.handleSubmit}>
                    <Avatar sx={{ bgcolor: pink[500], mx: "auto", mb: 1 }}>
                        <LockRoundedIcon fontSize="medium" />
                    </Avatar>
                    <h4>Sign In</h4>
                    <div>
                        <TextField
                            label="Username *"
                            fullWidth
                            margin="normal"
                            id="username"
                            name="username"
                            onChange={formik.handleChange}
                            value={formik.values.username}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.username && formik.errors.username ? (
                            <div className="error">
                                {formik.errors.username}
                            </div>
                        ) : null}
                        <TextField
                            label="Password *"
                            type="password"
                            fullWidth
                            margin="normal"
                            id="password"
                            name="password"
                            onChange={formik.handleChange}
                            value={formik.values.password}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.password && formik.errors.password ? (
                            <div className="error">
                                {formik.errors.password}
                            </div>
                        ) : null}
                    </div>
                    <AlertUsernameOrPasswordIncorrect
                        isIncorrect={isIncorrect}
                    />
                    <Button
                        sx={{ mt: 2 }}
                        fullWidth
                        size="medium"
                        variant="contained"
                        color="info"
                        type="submit"
                    >
                        Sign In
                    </Button>
                    <h5>Or</h5>
                    <div className="btn-wrapper-google">
                        <div className="google">
                            <GoogleLogin
                                clientId={
                                    process.env.REACT_APP_GOOGLE_CLIENT_ID
                                }
                                // buttonText="Login"
                                onSuccess={googleLoginHandler}
                                onFailure={googleLoginHandler}
                                cookiePolicy={"single_host_origin"}
                            />
                        </div>
                        <FacebookLogin
                            appId="767912470866812"
                            autoLoad={false}
                            fields="name,email,picture"
                            callback={facebookLoginHandler}
                            size="small"
                            cssClass="fa fa-facebook btnFacebook"
                            // icon="fa-facebook"
                            textButton="&nbsp;&nbsp;Sign in with Facebook"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;

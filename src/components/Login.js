import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, TextField, Alert } from "@mui/material";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import Avatar from "@mui/material/Avatar";
import { pink } from "@mui/material/colors";

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
            const response = await fetch(
                "http://localhost:8000/customer/login",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                }
            );
            const parseRes = await response.json();
            // console.log(parseRes)
            if (parseRes.token) {
                localStorage.setItem("token", parseRes.token);
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
                </form>
            </div>
        </div>
    );
};

export default Login;

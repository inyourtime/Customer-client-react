import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

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
                "http://localhost:3001/customer/login",
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
                <div className="error">username or password are incorrect</div>
            );
        }
    };

    return (
        <div className="auth-wrapper">
            <div className="auth-inner">
                <form onSubmit={formik.handleSubmit}>
                    <h3>Sign In</h3>
                    <div className="mb-3">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter username"
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
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter password"
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
                    <div className="mb-3">
                        <AlertUsernameOrPasswordIncorrect
                            isIncorrect={isIncorrect}
                        />
                    </div>
                    <div className="d-grid">
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;

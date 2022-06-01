import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const EditAccount = ({ userAccount }) => {
    const userAccountUpdateHandler = async (values) => {
        // e.preventDefault();
        const payload = {
            username: values.username,
            password: values.password,
        };
        try {
            const response = await fetch(
                `http://localhost:3001/customer/update-account/${userAccount.id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        token: localStorage.token,
                    },
                    body: JSON.stringify(payload),
                }
            );
            const parseRes = await response.json();
            console.log(parseRes);
        } catch (error) {
            console.error(error.message);
        }
    };

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            username: userAccount.username,
            password: userAccount.value,
        },
        validationSchema: Yup.object({
            username: Yup.string().required(),
            password: Yup.string().required(),
        }),
        onSubmit: userAccountUpdateHandler,
    });

    return (
        <div className="edit-account-inner">
            <h3>Update Account</h3>
            <form onSubmit={formik.handleSubmit}>
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
                        <div className="error">{formik.errors.username}</div>
                    ) : null}
                </div>
                <div className="mb-3">
                    <label htmlFor="password">Password</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter password"
                        id="password"
                        name="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.password && formik.errors.password ? (
                        <div className="error">{formik.errors.password}</div>
                    ) : null}
                </div>
                <div className="d-grid">
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditAccount;

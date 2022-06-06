import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, TextField, Button } from "@mui/material";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import apiUrl from "../utils/ApiEndPoint";

const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const EditInfo = ({ userInfo }) => {
    const [isUpdateSuccess, setIsUpdateSuccess] = useState(false);

    const AlertUpdateSuccess = ({ isUpdateSuccess }) => {
        if (isUpdateSuccess) {
            return (
                <Alert severity="success">
                    <AlertTitle>Success</AlertTitle>
                    This is a success alert — <strong>check it out!</strong>
                </Alert>
            );
        }
    };

    const userInfoUpdateHandler = async (values) => {
        // e.preventDefault();
        const payload = {
            cid: values.cid,
            th_prename: values.th_prename,
            th_fname: values.th_fname,
            th_lname: values.th_lname,
            en_prename: values.en_prename,
            en_fname: values.en_fname,
            en_lname: values.en_lname,
            DOB: values.DOB,
            address: values.address,
            issue_date: values.issue_date,
            exp_date: values.exp_date,
            email: values.email,
            phone: values.phone,
        };
        // alert(JSON.stringify(payload))
        try {
            const response = await fetch(
                apiUrl.url + `/customer/details/${userInfo.id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        token: localStorage.token,
                    },
                    body: JSON.stringify(payload),
                }
            );
            const data = await response.json();
            if (data.message === "ok") {
                setIsUpdateSuccess(true);
            }
            console.log(data.message);
        } catch (error) {
            console.error(error.message);
        }
    };

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            cid: userInfo.cid,
            th_prename: userInfo.th_pre_name,
            th_fname: userInfo.th_f_name,
            th_lname: userInfo.th_l_name,
            en_prename: userInfo.en_pre_name,
            en_fname: userInfo.en_f_name,
            en_lname: userInfo.en_l_name,
            DOB: userInfo.DOB,
            address: userInfo.address,
            issue_date: userInfo.issue_date,
            exp_date: userInfo.expire_date,
            email: userInfo.email,
            phone: userInfo.phone,
        },
        validationSchema: Yup.object({
            cid: Yup.string()
                .matches(/^[0-9]{13}$/g, "Invalid Thailand Citizen ID")
                .required(),
            th_prename: Yup.string().required(),
            th_fname: Yup.string().required(),
            th_lname: Yup.string().required(),
            en_prename: Yup.string().required(),
            en_fname: Yup.string().required(),
            en_lname: Yup.string().required(),
            DOB: Yup.date().required(),
            address: Yup.string().required(),
            issue_date: Yup.date().required(),
            exp_date: Yup.date().required(),
            email: Yup.string().email().max(255),
            phone: Yup.string().matches(
                phoneRegExp,
                "Phone number is not valid"
            ),
        }),
        onSubmit: userInfoUpdateHandler,
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <AlertUpdateSuccess isUpdateSuccess={isUpdateSuccess} />
            <Box>
                <div>
                    <TextField
                        label="CID *"
                        fullWidth
                        margin="normal"
                        sx={{ width: "30ch", mr: 2, mt: 2 }}
                        id="cid"
                        name="cid"
                        onChange={formik.handleChange}
                        value={formik.values.cid}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.cid && formik.errors.cid ? (
                        <div className="error">{formik.errors.cid}</div>
                    ) : null}
                </div>
                <div>
                    <TextField
                        label="Thai. prename *"
                        fullWidth
                        margin="normal"
                        sx={{ width: "20ch", mr: 2, mt: 2 }}
                        id="th_prename"
                        name="th_prename"
                        onChange={formik.handleChange}
                        value={formik.values.th_prename}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.th_prename && formik.errors.th_prename ? (
                        <div className="error">{formik.errors.th_prename}</div>
                    ) : null}
                    <TextField
                        label="Thai. firstname *"
                        margin="normal"
                        fullWidth
                        sx={{ width: "30ch", mr: 2, mt: 2 }}
                        id="th_fname"
                        name="th_fname"
                        onChange={formik.handleChange}
                        value={formik.values.th_fname}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.th_fname && formik.errors.th_fname ? (
                        <div className="error">{formik.errors.th_fname}</div>
                    ) : null}
                    <TextField
                        label="Thai. lastname *"
                        margin="normal"
                        fullWidth
                        sx={{ width: "30ch", mr: 2, mt: 2 }}
                        id="th_lname"
                        name="th_lname"
                        onChange={formik.handleChange}
                        value={formik.values.th_lname}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.th_lname && formik.errors.th_lname ? (
                        <div className="error">{formik.errors.th_lname}</div>
                    ) : null}
                </div>
                <div>
                    <TextField
                        label="Eng. prename *"
                        margin="normal"
                        fullWidth
                        sx={{ width: "20ch", mr: 2, mt: 2 }}
                        id="en_prename"
                        name="en_prename"
                        onChange={formik.handleChange}
                        value={formik.values.en_prename}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.en_prename && formik.errors.en_prename ? (
                        <div className="error">{formik.errors.en_prename}</div>
                    ) : null}
                    <TextField
                        label="Eng. firstname *"
                        margin="normal"
                        fullWidth
                        sx={{ width: "30ch", mr: 2, mt: 2 }}
                        id="en_fname"
                        name="en_fname"
                        onChange={formik.handleChange}
                        value={formik.values.en_fname}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.en_fname && formik.errors.en_fname ? (
                        <div className="error">{formik.errors.en_fname}</div>
                    ) : null}
                    <TextField
                        label="Eng. lastname *"
                        margin="normal"
                        fullWidth
                        sx={{ width: "30ch", mr: 2, mt: 2 }}
                        id="en_lname"
                        name="en_lname"
                        onChange={formik.handleChange}
                        value={formik.values.en_lname}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.en_lname && formik.errors.en_lname ? (
                        <div className="error">{formik.errors.en_lname}</div>
                    ) : null}
                </div>
                <div>
                    <TextField
                        label="Address *"
                        fullWidth
                        margin="normal"
                        sx={{ mr: 2, mt: 2 }}
                        id="address"
                        name="address"
                        onChange={formik.handleChange}
                        value={formik.values.address}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.address && formik.errors.address ? (
                        <div className="error">{formik.errors.address}</div>
                    ) : null}
                </div>
                <div>
                    <TextField
                        label="Email"
                        type="email"
                        margin="normal"
                        fullWidth
                        sx={{ width: "30ch", mr: 2, mt: 2 }}
                        id="email"
                        name="email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <div className="error">{formik.errors.email}</div>
                    ) : null}
                    <TextField
                        label="Phone number"
                        margin="normal"
                        fullWidth
                        sx={{ width: "30ch", mr: 2, mt: 2 }}
                        id="phone"
                        name="phone"
                        onChange={formik.handleChange}
                        value={formik.values.phone}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.phone && formik.errors.phone ? (
                        <div className="error">{formik.errors.phone}</div>
                    ) : null}
                </div>
                <div>
                    <TextField
                        label="Date of birth *"
                        type="date"
                        margin="normal"
                        fullWidth
                        sx={{ width: "30ch", mr: 2, mt: 2 }}
                        id="DOB"
                        name="DOB"
                        onChange={formik.handleChange}
                        value={formik.values.DOB}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.DOB && formik.errors.DOB ? (
                        <div className="error">{formik.errors.DOB}</div>
                    ) : null}
                    <TextField
                        label="Issue date *"
                        type="date"
                        margin="normal"
                        fullWidth
                        sx={{ width: "30ch", mr: 2, mt: 2 }}
                        id="issue_date"
                        name="issue_date"
                        onChange={formik.handleChange}
                        value={formik.values.issue_date}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.issue_date && formik.errors.issue_date ? (
                        <div className="error">{formik.errors.issue_date}</div>
                    ) : null}
                    <TextField
                        label="Expire date *"
                        type="date"
                        margin="normal"
                        fullWidth
                        sx={{ width: "30ch", mr: 2, mt: 2 }}
                        id="exp_date"
                        name="exp_date"
                        onChange={formik.handleChange}
                        value={formik.values.exp_date}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.exp_date && formik.errors.exp_date ? (
                        <div className="error">{formik.errors.exp_date}</div>
                    ) : null}
                </div>
            </Box>
            <Button
                sx={{ mt: 2 }}
                fullWidth
                size="medium"
                variant="contained"
                color="info"
                type="submit"
            >
                Submit
            </Button>
        </form>
    );
};

export default EditInfo;

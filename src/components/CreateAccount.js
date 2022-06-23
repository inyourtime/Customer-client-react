import React, {useState} from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TextField, Button } from "@mui/material";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import apiUrl from "../utils/ApiEndPoint";

const CreateAccount = () => {
    const [isUpdateSuccess, setIsUpdateSuccess] = useState(false);
	const [isExist, setIsExist] = useState(false)

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
	const AlertAlreadyExist = ({ isExist }) => {
        if (isExist) {
            return (
                <Alert severity="warning">
                    <AlertTitle>Warning</AlertTitle>
                    This username is already exist — <strong>check it out!</strong>
                </Alert>
            );
        }
    };

    const userAccountCreateHandler = async (values) => {
        // e.preventDefault();
        const payload = {
            username: values.username,
            password: values.password,
        };
        try {
            const response = await fetch(
                apiUrl.url + `/customer/account`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        token: localStorage.token,
                    },
                    body: JSON.stringify(payload),
                }
            );
            const data = await response.json();
			if (data.exist) {
				setIsExist(true)
			}
            if (data.message === "ok") {
                setIsUpdateSuccess(true);
            }
			if (data.token) {
				localStorage.setItem("token", data.token);
			}
            console.log(data);
        } catch (error) {
            console.error(error.message);
        }
    };

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            username: "",
            password: "",
        },
        validationSchema: Yup.object({
            username: Yup.string().required(),
            password: Yup.string().required(),
        }),
        onSubmit: userAccountCreateHandler,
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <AlertUpdateSuccess isUpdateSuccess={isUpdateSuccess} />
			<AlertAlreadyExist isExist={isExist}/>
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
                <div className="error">{formik.errors.username}</div>
            ) : null}
            <TextField
                label="Password *"
                fullWidth
                margin="normal"
                id="password"
                name="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password ? (
                <div className="error">{formik.errors.password}</div>
            ) : null}
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

export default CreateAccount;

import React, { useState, useEffect } from "react";
import EditAccount from "./EditAccount";
import EditInfo from "./EditInfo";
import Navbar from "./Navbar";
import UserAccountBox from "./UserAccountBox";
import UserInfoBox from "./UserInfoBox";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const Edit = ({ setAuth }) => {
    const [userAccount, setUserAccount] = useState({});
    const [userInfo, setUserInfo] = useState({});
    const [openUserAccountUpdateForm, setOpenUserAccountUpdateForm] =
        useState(false);
    const [openUserInfoUpdateForm, setOpenUserInfoUpdateForm] = useState(false);

    const handleClickOpenUserAccountUpdateForm = () => {
        setOpenUserAccountUpdateForm(true);
    };

    const handleClickCloseUserAccountUpdateForm = () => {
        setOpenUserAccountUpdateForm(false);
    };

    const handleClickOpenUserInfoUpdateForm = () => {
        setOpenUserInfoUpdateForm(true);
    };

    const handleClickCloseUserInfoUpdateForm = () => {
        setOpenUserInfoUpdateForm(false);
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
    }, [openUserAccountUpdateForm, openUserInfoUpdateForm]);

    return (
        <>
            <Navbar logout={logout} />
            {/* <div className="edit-wrapper"> */}
            <Container>
                <div style={{ marginBottom: "100px" }}>
                    <div className="edit-grid">
                        <UserAccountBox
                            userAccount={userAccount}
                            handleClickOpenUserAccountUpdateForm={
                                handleClickOpenUserAccountUpdateForm
                            }
                        />
                        <UserInfoBox
                            userInfo={userInfo}
                            handleClickOpenUserInfoUpdateForm={
                                handleClickOpenUserInfoUpdateForm
                            }
                        />
                    </div>
                    <Dialog
                        open={openUserAccountUpdateForm}
                        onClose={handleClickCloseUserAccountUpdateForm}
                        maxWidth="xs"
                        fullWidth="true"
                    >
                        <DialogTitle>Update Your Account</DialogTitle>
                        <DialogContent dividers>
                            <EditAccount userAccount={userAccount} />
                        </DialogContent>
                        <DialogActions>
                            <IconButton
                                aria-label="close"
                                onClick={handleClickCloseUserAccountUpdateForm}
                                sx={{
                                    position: "absolute",
                                    right: 8,
                                    top: 8,
                                    color: (theme) => theme.palette.grey[500],
                                }}
                            >
                                <CloseIcon />
                            </IconButton>
                            <Button
                                onClick={handleClickCloseUserAccountUpdateForm}
                            >
                                Cancel
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <Dialog
                        open={openUserInfoUpdateForm}
                        onClose={handleClickCloseUserInfoUpdateForm}
                        maxWidth="md"
                        fullWidth="true"
                    >
                        <DialogTitle>Update Your Info</DialogTitle>
                        <DialogContent dividers>
                            <EditInfo userInfo={userInfo} />
                        </DialogContent>
                        <DialogActions>
                            <IconButton
                                aria-label="close"
                                onClick={handleClickCloseUserInfoUpdateForm}
                                sx={{
                                    position: "absolute",
                                    right: 8,
                                    top: 8,
                                    color: (theme) => theme.palette.grey[500],
                                }}
                            >
                                <CloseIcon />
                            </IconButton>
                            <Button
                                onClick={handleClickCloseUserInfoUpdateForm}
                            >
                                Cancel
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </Container>
        </>
    );
};

export default Edit;

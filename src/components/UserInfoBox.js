import React from "react";
import Box from "@mui/material/Box";
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
} from "@mui/material";
import Paper from "@mui/material/Paper";

const UserInfoBox = ({ userInfo, handleClickOpenUserInfoUpdateForm }) => {
    return (
        <Box
            sx={{
                width: "100%",
                height: "100%",
                backgroundColor: "white",
                borderRadius: "15px",
                padding: "15px 15px 15px 15px",
            }}
        >
            <h2><span><ImportContactsIcon/></span> My Information</h2>
            <hr />
            <TableContainer component={Paper} sx={{ mt: 2 }}>
                <Table sx={{ minWidth: "auto" }} aria-label="simple table">
                    <TableBody>
                        <TableRow>
                            <TableCell sx={{ fontWeight: "bold" }}>
                                CID
                            </TableCell>
                            <TableCell>{userInfo.cid}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{ fontWeight: "bold" }}>
                                Thai. name
                            </TableCell>
                            <TableCell>
                                {userInfo.th_pre_name} {userInfo.th_f_name}{" "}
                                {userInfo.th_l_name}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{ fontWeight: "bold" }}>
                                Eng. name
                            </TableCell>
                            <TableCell>
                                {userInfo.en_pre_name} {userInfo.en_f_name}{" "}
                                {userInfo.en_l_name}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{ fontWeight: "bold" }}>
                                Address
                            </TableCell>
                            <TableCell>{userInfo.address}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{ fontWeight: "bold" }}>
                                Email
                            </TableCell>
                            <TableCell>{userInfo.email}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{ fontWeight: "bold" }}>
                                Phone
                            </TableCell>
                            <TableCell>{userInfo.phone}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{ fontWeight: "bold" }}>
                                Date of birth
                            </TableCell>
                            <TableCell>{userInfo.DOB}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{ fontWeight: "bold" }}>
                                Issue date
                            </TableCell>
                            <TableCell>{userInfo.issue_date}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{ fontWeight: "bold" }}>
                                Expire date
                            </TableCell>
                            <TableCell>{userInfo.expire_date}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <Box display="flex" justifyContent="flex-end" alignItems="flex-end">
                <Button
                    sx={{ mt: 2 }}
                    // fullWidth
                    size="medium"
                    variant="contained"
                    color="info"
                    onClick={handleClickOpenUserInfoUpdateForm}
                >
                    Edit
                </Button>
            </Box>
        </Box>
    );
};

export default UserInfoBox;

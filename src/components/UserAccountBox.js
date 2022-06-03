import React from "react";
import Box from "@mui/material/Box";
import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import DnsIcon from '@mui/icons-material/Dns';

const UserAccountBox = ({ userAccount, handleClickOpenUserAccountUpdateForm }) => {
    return (
        <Box
            sx={{
                width: "100%",
                height: "100%",
                backgroundColor: "white",
                borderRadius: "15px",
                padding: "15px 15px 15px 15px",
                // "&:hover": {
                //     backgroundColor: "primary.main",
                //     opacity: [0.9, 0.8, 0.7],
                // }
            }}
        >
            <h2><span><DnsIcon/></span> My Account</h2>
            <hr />
            <TableContainer component={Paper} sx={{ mt: 2 }}>
                <Table sx={{ minWidth: "auto" }} aria-label="simple table">
                    <TableBody>
                        <TableRow>
                            <TableCell sx={{ fontWeight: "bold" }}>
                                Username
                            </TableCell>
                            <TableCell>{userAccount.username}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{ fontWeight: "bold" }}>
                                Password
                            </TableCell>
                            <TableCell>{userAccount.value}</TableCell>
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
					onClick={handleClickOpenUserAccountUpdateForm}
                >
                    Edit
                </Button>
            </Box>
        </Box>
    );
};

export default UserAccountBox;

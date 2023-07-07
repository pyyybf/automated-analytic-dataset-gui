import React from "react";
import {useSelector} from "react-redux";
import {Box, Table, TableBody, TableCell, TableContainer, TableRow} from "@mui/material";

export default function Graph() {
    const fieldList = useSelector(state => state.generator.fieldList);

    return (
        <Box sx={{padding: '12px 24px'}}>
            <TableContainer>
                <Table sx={{minWidth: 100, width: '20%'}} aria-label="field table">
                    <TableBody>
                        {fieldList.map((field, index) => (
                            <TableRow
                                key={index}
                                sx={{border: '1px lightgray solid'}}>
                                <TableCell component="td" scope="row" align="center">
                                    {field.name}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
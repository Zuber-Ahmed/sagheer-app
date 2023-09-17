import React from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  //   LinearProgress,
  TableContainer,
  Paper,
} from "@mui/material";
import styled from "@emotion/styled";
import TableCell from "@mui/material/TableCell";
import { tableCellClasses } from "@mui/material";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#002f6c",
    color: "#fff",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const TableDetail = ({ data, columnConfig, searchData }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <>
      {data && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {columnConfig?.map((configEntry, index) => (
                  <StyledTableCell key={index}>
                    {configEntry?.label}
                  </StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.length === 0 ? (
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  key={`no-data-found`}
                >
                  <TableCell
                    sx={{ textAlign: "center" }}
                    colSpan={columnConfig?.length}
                  >
                    No Data Found For Given Query
                  </TableCell>
                </TableRow>
              ) : (
                (rowsPerPage > 0
                  ? data.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : data
                )?.filter((item) => {
                    return searchData.toUpperCase() === ""
                      ? item
                      : item?.documentName.includes(searchData) || item?.InsuredName.toLowerCase().includes(searchData)
                  }).map((row, index) => (
                    <TableRow
                      key={row?.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      {columnConfig?.map((configEntry, index) => {
                        if (configEntry?.type === "component") {
                          return (
                            <TableCell key={index}>
                              {configEntry?.component({ row })}
                            </TableCell>
                          );
                        } else {
                          return (
                            <TableCell key={index}>
                              {row[configEntry?.name]}
                            </TableCell>
                          );
                        }
                      })}
                    </TableRow>
                  ))
              )}
            </TableBody>
            {/* <TableFooter>
                <TableRow>
                    <TableCell colSpan={columnConfig?.length}>
                        <div>
                            <div>
                                <div>Rows Per Page:</div>
                            </div>
                        </div>
                    </TableCell>
                </TableRow>
            </TableFooter> */}
          </Table>
        </TableContainer>
      )}
    </>
  );
};
export default TableDetail;

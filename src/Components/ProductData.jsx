import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TableDetail from "./TableDetail";
import dummyData from "../dummy.json";
import SearchIcon from "@mui/icons-material/Search";
const ProductData = () => {
  const [dates, setDates] = useState({ startDate: "", endDate: "" });
  const [data, setData] = useState(null);
  const [filterData, setFilterData] = useState("");
const [isData,setIsdata]=useState(false);
  const hanldeDateRange = () => {
    const converDateFormate = (date) => {
      const inputDate = new Date(date);
      const year = inputDate.getFullYear();
      const month = (inputDate.getMonth() + 1).toString().padStart(2, "0");
      const day = inputDate.getDate().toString().padStart(2, "0");
      const formattedDate = `${year}-${month}-${day}`;
      return formattedDate;

    };
    let dateRange = `StartDate^${converDateFormate(
      dates.startDate
    )}|EndDate^${converDateFormate(dates.endDate)}`;
    console.log("==>", dateRange);
    setIsdata(!isData)
  };

  useEffect(() => {
    const flattenedArray = dummyData.map((item) => {
      const flatObject = {
        documentHandleId: item.documentHandleId,
        documentName: item.documentName,
        Description: item.keywords.Description,
        DateOnDocument: item.keywords["Date on Document"],
        InsuredName: item.keywords["Insured Name"],
        Matter: item.keywords.Matter,
      };
      return flatObject;
    });
    // debugger;
   if(isData)
   setData(flattenedArray);
  }, [dummyData,isData]);
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} mb={2}>
          <Typography variant="h4" align="center" mt={2} p={2}>
            Table Details
          </Typography>
        </Grid>
        <Grid item xs={3}></Grid>
        <Grid item xs={2}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              autoFocus
              value={dates.startDate}
              onChange={(date) =>
                setDates((prev) => ({ ...prev, startDate: date }))
              }
              label="From Date"
              format="DD-MM-YYYY"
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={2}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              autoFocus
              value={dates.endDate}
              onChange={(date) =>
                setDates((prev) => ({ ...prev, endDate: date }))
              }
              label="To Date"
              format="DD-MM-YYYY"
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={2} mt={1}>
          <Button
            disabled={
              dates.endDate !== "" && dates.startDate !== "" ? false : true
            }
            variant="contained"
            onClick={hanldeDateRange}
          >
            Search
          </Button>
        </Grid>
        <Grid item xs={12} mt={3}>
          <Box
            sx={{ maxWidth: "100%", width: "400px", float: "right", m: "2em" }}
          >
            <TextField
              fullWidth
              value={filterData}
              placeholder="Search Reacords"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              variant="standard"
              onChange={(e) => setFilterData(e.target.value)}
            />
          </Box>
          <TableDetail
            data={Array.isArray(data) ? data : []}
            columnConfig={[
              { name: "documentHandleId", label: "ID" },
              { name: "Description", label: "Description " },
              { name: "DateOnDocument", label: "Document Date" },
              { name: "InsuredName", label: "Insured Name" },
            ]}
            searchData={filterData}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
export default ProductData;

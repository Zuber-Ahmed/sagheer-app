import React, { useState, useEffect } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { searchData } from "../services/api";
import TableData from "./TableData";


const ProductData = () => {
  const [dates, setDates] = useState({ startDate: "", endDate: "" });
  const [data, setData] = useState(null);
  const [tempData, setTempData] = useState(null);
  const [isData, setIsdata] = useState(false);

  const hanldeDateRange = () => {
    const converDateFormate = (date) => {
      const inputDate = new Date(date);
      const year = inputDate.getFullYear();
      const month = (inputDate.getMonth() + 1).toString().padStart(2, "0");
      const day = inputDate.getDate().toString().padStart(2, "0");
      const formattedDate = `${year}-${month}-${day}`;
      return formattedDate;
    };
    // eslint-disable-next-line
    let dateRange = `StartDate^${converDateFormate(
      dates.startDate
    )}|EndDate^${converDateFormate(dates.endDate)}`;

    searchData({}).then((res) => setTempData(res));
    setIsdata(!isData);
  };

  useEffect(() => {
    const flattenedArray = tempData?.map((item) => {
      const flatObject = {
        documentHandleId: item.documentHandleId,
        documentName: item.documentName,
        Description:
          item.keywords.Description === undefined
            ? "No Data Found"
            : item.keywords.Description,
        DateOnDocument: item.keywords["Date on Document"],
        InsuredName: item.keywords["Insured Name"],
        Matter: item.keywords.Matter,
      };
      return flatObject;
    });
    setData(flattenedArray);
  }, [tempData]);

  console.log(data);
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
        <Grid item xs={12}>
          {isData && <TableData data={data} />}
        </Grid>
      </Grid>
    </Box>
  );
};
export default ProductData;

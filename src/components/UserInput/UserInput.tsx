import React, { useState } from "react";
import classes from "./UserInput.module.css";
import {
  Autocomplete,
  TextField,
  Button,
  Container,
  Grid,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import { useSearchPickup } from "../../hooks/query/useSearchPickup";
import { useAddTourDetails } from "../../hooks/mutation/useAddTourDetails";
import Result from "../Result/Result";

const UserInput: React.FC<{}> = () => {
  const [pickupLocation, setPickupLocation] = useState<string | "">("");
  const [dateTime, setDateTime] = useState<string>("");
  const [duration, setDuration] = useState<string | "">("");
  const {
    data: pickupLocationList,
    isLoading,
    isError,
  } = useSearchPickup(pickupLocation);
  const tourData = useAddTourDetails();

  const convertDateFormat = (originalDateString: string) => {
    var originalDate = new Date(originalDateString);
    var formattedDateString =
      originalDate.getFullYear() +
      "-" +
      ("0" + (originalDate.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + originalDate.getDate()).slice(-2) +
      "T" +
      ("0" + originalDate.getHours()).slice(-2) +
      ":" +
      ("0" + originalDate.getMinutes()).slice(-2) +
      ":" +
      ("0" + originalDate.getSeconds()).slice(-2);

    return formattedDateString;
  };
  const handleSearch = () => {
    if (!pickupLocation || !dateTime || !duration) {
      alert("Please fill all fields");
      return;
    }
    const formattedDateTime = convertDateFormat(dateTime);
    tourData.mutate({ pickupLocation, formattedDateTime, duration });
  };

  return (
    <>
      <Container maxWidth="sm">
        <h1>Sixt Sightseeing Tours</h1>
        <Autocomplete
          options={pickupLocationList || []}
          onChange={(event, value) => setPickupLocation(value?.placeId || '')}
          getOptionLabel={(option: any) => option.label}
          onInputChange={(event, value) => setPickupLocation(value)}
          renderInput={(params) => (
            <TextField {...params} label="Search Pickup Location" />
          )}
        />
        <TextField
          label="Date and Time"
          type="datetime-local"
          value={dateTime}
          onChange={(e) => setDateTime(e.target.value)}
          InputLabelProps={{ shrink: true }}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Duration (hours)"
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          InputLabelProps={{ shrink: true }}
          fullWidth
          margin="normal"
        />
        <Grid container justifyContent="center" spacing={2}>
          <Grid item>
            <Button variant="contained" color="primary" onClick={handleSearch}>
              Search
            </Button>
          </Grid>
        </Grid>
      </Container>
      {tourData && tourData.isPending && (
        <CircularProgress className={classes.center} />
      )}
      {tourData && tourData.data && <Result tourDetails={tourData.data} />}
    </>
  );
};
export default UserInput;

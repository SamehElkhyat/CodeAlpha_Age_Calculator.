import { Box, TextField, Button, Grid, Container } from "@mui/material";
import { useFormik } from "formik";
import React, { useCallback, useState } from "react";

export default function About() {
  let [Age, setAge] = useState();
  let [Months, setMonths] = useState();
  let [Days, setDays] = useState();

  let [newage, setnewage] = useState();
  let [newmonth, setnewmonth] = useState();
  let [newday, setnewday] = useState();

  let getInputsValue = (values) => {
    if (values.currentOfday < values.birthOfday) {
      let thenewDay = values.currentOfday + 30;

      let thenewMonth = values.currentmonth - 1;

      setDays(thenewDay);

      setMonths(thenewMonth);

      if (values.currentmonth < values.birthmonth) {
        let theNewYear = values.currentYear - 1;

        let thenewMonth = values.currentmonth + 12;

        setAge(theNewYear);

        setMonths(thenewMonth);

        finalResult(values);
      } else {
        let theNewYear = values.currentYear;

        setAge(theNewYear);
      }
    } else if (values.currentmonth < values.birthmonth) {
      setAge(values.currentYear - 1);

      setMonths(values.currentmonth + 12);

      finalResult(values);

    }else if (values.currentmonth > values.birthmonth) {
      setAge(values.currentYear);
      setMonths(values.currentmonth);
      CurentGreater(values)
    }
     else if (values.currentmonth === values.birthmonth) {
      let theNewYear = values.currentYear - values.birthYear;

      let thenewMonth = values.currentmonth - values.birthmonth;

      setMonths(thenewMonth);

      setAge(theNewYear);
      CurentEqualition(values);
    }
    finalResult(values)

  };
  
  let finalResult = useCallback(
    (values) => {

        let finalAge = Age - values.birthYear;
        let finalMonth = Months - values.birthmonth;
        let finalday = Days - values.birthOfday;
  
        console.log(Age);
  
        setnewage(finalAge);
  
        setnewmonth(finalMonth);
  
        setnewday(finalday);
    

  
    },
    [Age, Months, Days]
  );
  let CurentEqualition = useCallback(() => {
      let finalAge = Age;
      let finalMonth = Months;
      let finalday = Days;

      console.log(Age);

      setnewage(finalAge);

      setnewmonth(finalMonth);

      setnewday(finalday);
    },
    [Age, Months, Days]
  );

  let CurentGreater = useCallback((values) => {

    let finalAge = Age - values.birthYear;
    let finalMonth = Months - values.birthmonth;
    let finalday = Days - values.birthOfday;


    setnewage(finalAge);

    setnewmonth(finalMonth);

    setnewday(finalday);
  },
  [Age, Months, Days]
);

  let formik = useFormik({
    initialValues: {
      birthYear: "",
      birthmonth: "",
      birthOfday: "",
      currentYear: "",
      currentmonth: "",
      currentOfday: "",
    },
    onSubmit: getInputsValue,
  });

  return (
    <>
      <h1 className="text-center" style={{ fontWeight: 800, color: "white" }}>
        Age Calculater
      </h1>

      <Container maxWidth="xxsmall" className="container">
        <Grid className="itemm">
          <Box
            onSubmit={formik.handleSubmit}
            component="form"
            className="requires-validation"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="of"
          >
            <div className="mains">
              <div className="theanimat"></div>

              <div className="birth">
                <h6>Year Of Birth</h6>
                <TextField
                  value={formik.values.birthYear}
                  onChange={formik.handleChange}
                  id="birthYear"
                  label="birthYear"
                  type="number"
                  variant="filled"
                  required
                />

                <h6>Month Of Birth</h6>

                <TextField
                  value={formik.values.birthmonth}
                  onChange={formik.handleChange}
                  id="birthmonth"
                  label="birthmonth"
                  type="number"
                  variant="filled"
                  required
                />

                <h6>days Of Birth</h6>

                <TextField
                  value={formik.values.birthOfday}
                  onChange={formik.handleChange}
                  id="birthOfday"
                  label="birthOfday"
                  type="number"
                  variant="filled"
                  required
                />
              </div>

              <div className="current">
                <h6>current Year</h6>
                <TextField
                  value={formik.values.currentYear}
                  onChange={formik.handleChange}
                  id="currentYear"
                  label="currentYear"
                  type="number"
                  variant="filled"
                  required
                />

                <h6>current Month </h6>

                <TextField
                  value={formik.values.currentmonth}
                  onChange={formik.handleChange}
                  id="currentmonth"
                  label="currentmonth"
                  type="number"
                  variant="filled"
                  required
                />

                <h6>current days</h6>

                <TextField
                  value={formik.values.currentOfday}
                  onChange={formik.handleChange}
                  id="currentOfday"
                  label="currentOfday"
                  type="number"
                  variant="filled"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              id="submit"
              variant="contained"
              className="submitbutton"
            >
              Submit
            </Button>

            {!newage ? (
              <></>
            ) : (
              <div className="TheResult">
                <h3>You Have:{newage}Years</h3>
                <h3>And:{newmonth}Months</h3>
              </div>
            )}
          </Box>
        </Grid>
      </Container>
    </>
  );
}

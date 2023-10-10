import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CallIcon from "@mui/icons-material/Call";
import Home from "./Icons/home.svg";
// import PhoneInput from 'react-phone-number-input'
import {
  Backdrop,
  Button,
  LinearProgress,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  Alert,
} from "@mui/material";

function Register() {
  const nav = useNavigate();

  let nri = true;
  let mgmt = false;
  let gov = false;
  let opc = true;

  const [loader, setLoader] = useState(false);
  const [year, setYear] = useState("");
  const [gender, setGender] = useState("");
  const [quota, setQuota] = useState("");
  const [pgm, setPgm] = useState("");

  const nriregister = async (e) => {
    e.preventDefault();
    setLoader(true);
    const api = "https://ams-backend-368717.el.r.appspot.com/";
    const data = {
      firstName: document.getElementById("fname").value,
      middleName: document.getElementById("mname").value,
      lastName: document.getElementById("lname").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      gender: gender,
      course: pgm,
      quota: quota,
      aadhaar: document.getElementById("aadhar").value,
      dob: document.getElementById("dob").value,
      academicYear: year,
    };
    console.log(data);
    axios
      .post(api + "user/register", data)
      .then((response) => {
        console.log(response);
        console.log(data);
        if (response.status === 200) {
          window.alert(
            "Registration success.Login Credentials Are Send to Registered EmailId"
          );
          nav("/login");
        } else window.alert(response.statusText);
        setLoader(false);
      })
      .catch((error) => {
        console.log(error);
        window.alert(error.response.data.message);
        setLoader(false);
      });
  };
  return (
    <div className="min-w-screen font-poppins relative min-h-screen py-20 xl:py-0 bg-gradient-to-br flex items-center justify-center from-rock-blue-200 via-rock-blue-300 to-rock-blue-400">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loader}
      >
        <div className="w-screen absolute top-0">
          <LinearProgress color="primary" />
        </div>
      </Backdrop>
      <p className="absolute text-right text-[13px] xl:text-[14px] right-4 top-4">
        <CallIcon fontSize="small" />
        <b className="text-red-600">Technical Support</b>
        <br />
        Ms. Jeena Varghese: &nbsp;<b>99466 52762</b>
        <br />
        Ms. Rija Jose: &nbsp;<b>63093 87606</b>
        <br />
      </p>
      <Link to="/">
        <img className="absolute top-6 left-6" src={Home} alt="home" />
      </Link>
      <div className="w-11/12 sm:w-3/5 p-3 rounded-md shadow-xl xl:w-2/5  bg-white">
        <p className="text-center text-3xl my-6 font-semibold uppercase">
          Registration
        </p>
        <div className="grid grid-row-3 xl:py-5 p-3 md:grid-cols-3 gap-3">
          <TextField
            autoComplete="off"
            required={true}
            label="First Name"
            id="fname"
            size="small"
          />
          <TextField
            autoComplete="off"
            label="Middle Name"
            id="mname"
            size="small"
          />
          <TextField
            autoComplete="off"
            required={true}
            label="Last Name"
            id="lname"
            size="small"
          />
        </div>

        <div className="grid grid-row-3 py-5 p-3 md:grid-cols-3 gap-3">
          <TextField
            autoComplete="off"
            className="md:col-span-2"
            required={true}
            label="Email"
            type="email"
            id="email"
            size="small"
            fullWidth
          />

          <TextField
            autoComplete="off"
            required={true}
            label="Mobile No.(in Kerala)"
            id="phone"
            size="small"
            type="tel"
            inputProps={{
              maxLength: 10,
            }}
          />
        </div>

        <div className="grid grid-row-3 py-5 p-3 md:grid-cols-3 gap-3">
          <FormControl required={true} size="small">
            <InputLabel id="gendr">Gender</InputLabel>
            <Select
              required={true}
              labelId="gendr"
              id="gender"
              value={gender}
              label="Gender"
              onChange={(e) => {
                setGender(e.target.value);
              }}
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Others">Others</MenuItem>
            </Select>
          </FormControl>

          <FormControl required={true} size="small">
            <InputLabel id="qta">Quota</InputLabel>
            <Select
              labelId="qta"
              id="quota"
              value={quota}
              label="Quota"
              onChange={(e) => setQuota(e.target.value)}
            >
              {nri && <MenuItem value="NRI">NRI</MenuItem>}
              {mgmt && <MenuItem value="Management">Management</MenuItem>}
              {gov && <MenuItem value="Government">Government</MenuItem>}
              {opc && <MenuItem value="Others">OCI/PIO/CIWG</MenuItem>}
            </Select>
          </FormControl>
          <FormControl required={true} size="small">
            <InputLabel id="pgm">Program</InputLabel>
            <Select
              required={true}
              labelId="pgm"
              id="program"
              value={pgm}
              label="Program"
              onChange={(e) => setPgm(e.target.value)}
            >
              <MenuItem value="BTech">BTech</MenuItem>
              <MenuItem value="MTech">MTech</MenuItem>
              <MenuItem value="MCA">MCA</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div className="grid grid-row-3 py-5 p-3 md:grid-cols-3 gap-3">
          <FormControl required={true} size="small">
            <InputLabel id="apply-year-label">Applying Year</InputLabel>
            <Select
              required={true}
              labelId="apply-year-label"
              id="apply-year"
              value={year}
              label="Applying year"
              onChange={(e) => setYear(e.target.value)}
            >
              <MenuItem value={2023}>2023</MenuItem>
              <MenuItem value={2024}>2024</MenuItem>
            </Select>
          </FormControl>
          <TextField
            autoComplete="off"
            label="Aadhar No."
            id="aadhar"
            size="small"
            inputProps={{
              maxLength: 12,
            }}
          />
          <TextField
            autoComplete="off"
            required={true}
            label="Date of Birth"
            type="date"
            id="dob"
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <div className="p-3 flex items-center justify-between">
          <Button onClick={nriregister} variant="contained">
            Submit
          </Button>
          <p>
            Already Registered?{" "}
            <Link to="/login" className="text-blue-600">
              Sign-In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;

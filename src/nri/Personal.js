import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  Checkbox,
  IconButton,
  Tooltip,
  CircularProgress,
  LinearProgress,
  Dialog,
  DialogTitle,
  Box,
  Backdrop,
} from "@mui/material";
import { Stepper, Step, StepLabel } from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Link } from "react-router-dom";
import axios from "axios";

function Personal() {
  const [course, setCourse] = useState("");
  const [eye, setEye] = useState(false);
  const steps = ["Personal Details", "Payment"];
  const [loader, setLoader] = useState(false);
  const [check, setCheck] = useState(true);

  useEffect(() => {
    setLoader(!loader)
    axios
      .get("https://ams-backend-api.herokuapp.com/user/nri/application", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
      .then((res) => {
        console.log(res);
        document.getElementById("fname").value = res.data.user.firstName;
        document.getElementById("mname").value = res.data.user.middleName;
        document.getElementById("lname").value = res.data.user.lastName;
        document.getElementById("phoneKerala").value = res.data.user.phone;
        document.getElementById("dob").valueAsDate = new Date(res.data.user.dob);
        document.getElementById("phone1").value = res.data.user.NRIdetails.aPhone === undefined ? "" : Number(res.data.user.NRIdetails.aPhone);

        document.getElementById("Chouse").value = res.data.user.contactAddress.addressL1
        document.getElementById("Ccity").value = res.data.user.contactAddress.city
        document.getElementById("Cdistrict").value = res.data.user.contactAddress.district
        document.getElementById("Cstate").value = res.data.user.contactAddress.state
        document.getElementById("Cpincode").value = res.data.user.contactAddress.pincode

        document.getElementById("Phouse").value = res.data.user.permanentAddress.addressL1
        document.getElementById("Pcity").value = res.data.user.permanentAddress.city
        document.getElementById("Pdistrict").value = res.data.user.permanentAddress.district
        document.getElementById("Pstate").value = res.data.user.permanentAddress.state
        document.getElementById("Ppincode").value = res.data.user.permanentAddress.pincode

        document.getElementById("parentName").value = res.data.user.fatherDetails.name
        document.getElementById("parentOccupation").value = res.data.user.fatherDetails.occupation
        document.getElementById("sponsorName").value = res.data.user.NRIdetails.name
        document.getElementById("sponsorRelation").value = res.data.user.NRIdetails.relation
      
        setLoader(false)
      });
  }, []);

  const [selectedFile, setSelectedFile] = useState(null);

  const handleEye = () => {
    setTimeout(setEye(!eye), 3000);
  };

  const handleChange = (event) => {
    setCourse(event.target.value);
  };

  function autofill() {
    setCheck(!check);
    console.log(check);
    //do autofill
  }

  const handlePhotoFile = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();

    formData.append("photo", file);

    setSelectedFile(file);

    console.log(formData);
  };

  const personalUpload = async (e) => {
    e.preventDefault();
    setLoader(!loader)
    const data = {
      firstName     : document.getElementById("fname").value,
      middleName    : document.getElementById("mname").value,
      lastName      : document.getElementById("lname").value,
      aphoneNo      : Number(document.getElementById("phone1").value),
      phoneKerala   : document.getElementById("phoneKerala").value,
      // filePhotograph:selectedFile,

        addressL1C: document.getElementById("Chouse").value,
        cityC     : document.getElementById("Ccity").value,
        districtC : document.getElementById("Cdistrict").value,
        stateC    : document.getElementById("Cstate").value,
        pincodeC  : document.getElementById("Cpincode").value,

        addressL1P: document.getElementById("Phouse").value,
        cityP     : document.getElementById("Pcity").value,
        districtP : document.getElementById("Pdistrict").value,
        stateP    : document.getElementById("Pstate").value,
        pincodeP  : document.getElementById("Ppincode").value,

        fatherName      : document.getElementById("parentName").value,
        fatherOccupation: document.getElementById("parentOccupation").value,

        NRIname    : document.getElementById("sponsorName").value,
        NRIrelation: document.getElementById("sponsorRelation").value,

    };
    console.log(data);
    try {
      await axios
        .patch("https://ams-backend-api.herokuapp.com/user/application/"+localStorage.getItem("user_id"),data,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("access_token"),
            },
          })
        .then((res) => {
          console.log(res);
          if (res.data.status === "SUCCESS ") {
            setLoader(false)
            console.log("details patched");
          } else {
            // setLoader(!loader)
            console.log("Something wrong happened");
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" xl:w-[1180px] my-[30px] xl:my-auto">
      <Stepper className="xl:w-[780px] px-3 mx-auto" activeStep={0}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loader}
        >
          <div className="w-screen absolute top-0"><LinearProgress color="primary"/></div>
        </Backdrop>

      <div className="w-full bg-white rounded-md h-auto flex flex-col xl:flex-row shadow-md mt-8">
        <div className="xl:w-1/2 h-[584px] pt-6 ">
          <div className="flex items-center justify-center p-5 space-x-2">
            <TextField
              InputLabelProps={{
                shrink: true,
              }}
              id="fname"
              defaultValue=""
              label="First Name"
              type="text"
              size="small"
              required
            />
            <TextField
              InputLabelProps={{
                shrink: true,
              }}
              id="mname"
              label="Middle Name"
              type="text"
              size="small"
            />
            <TextField
              InputLabelProps={{
                shrink: true,
              }}
              id="lname"
              label="Last Name"
              type="text"
              size="small"
              required
            />
          </div>

          <div className=" flex  p-5 space-x-2">
            <TextField
              InputLabelProps={{
                shrink: true,
              }}
              id="phone1"
              label="Contact Ph. No(M)"
              type="text"
              size="small"
              required
            />
            <TextField
              InputLabelProps={{
                shrink: true,
              }}
              id="phoneKerala"
              label="Contact Ph. No(Kerala)"
              type="text"
              size="small"
              required
            />
            <TextField
              label="DOB"
              type="date"
              size="small"
              id="dob"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <div className=" flex  p-5  justify-between">
            <TextField
              label="Photo Upload"
              type="file"
              size="small"
              id="photo"
              onChange={handlePhotoFile}
              InputLabelProps={{
                shrink: true,
              }}
              required
            />
            <Tooltip arrow title={eye ? "preview" : "no preview"}>
              <IconButton
                sx={{ p: 1, mr: 1 }}
                onClick={handleEye}
                aria-label="upload picture"
                component="label"
              >
                {eye ? <RemoveRedEyeIcon /> : <VisibilityOffIcon />}
                {eye && <CircularProgress sx={{ position: "absolute" }} />}
              </IconButton>
            </Tooltip>
            <Button variant="contained" type="submit">
              Upload
            </Button>
          </div>
          <div className=" flex flex-col space-y-2 p-5 mt-4 ">
            <label className="text-xl ml-2">Contact Address</label>
            <TextField
            InputLabelProps={{
              shrink: true,
            }}
              id="Chouse"
              fullWidth
              label="House Name"
              type="text"
              size="small"
              required
            />
          </div>
          <div className=" flex items-center p-5 space-x-2">
            <TextField
            InputLabelProps={{
              shrink: true,
            }}
              id="Cstate"
              className="w-1/2"
              label="State"
              type="text"
              size="small"
              required
            />
            <TextField
            InputLabelProps={{
              shrink: true,
            }}
              id="Cdistrict"
              className="w-1/2"
              label="District"
              type="text"
              size="small"
            />
          </div>
          <div className=" flex items-center p-5 space-x-2">
            <TextField
            InputLabelProps={{
              shrink: true,
            }}
              id="Ccity"
              className="w-1/2"
              label="City"
              type="text"
              size="small"
              required
            />
            <TextField
            InputLabelProps={{
              shrink: true,
            }}
              id="Cpincode"
              className="w-1/2"
              label="Pincode"
              type="text"
              size="small"
            />
          </div>
        </div>
        <div className="xl:w-1/2  h-[584px]">
          <div className=" flex flex-col space-y-2 p-5 mt-1 ">
            <label className="text-xl ml-2">Permanent Address</label>
            <TextField
            InputLabelProps={{
              shrink: true,
            }}
              id="Phouse"
              fullWidth
              label="House Name"
              type="text"
              size="small"
              required
            />
          </div>
          <div className=" flex items-center p-5 space-x-2">
            <TextField
            InputLabelProps={{
              shrink: true,
            }}
              id="Pstate"
              className="w-1/2"
              label="State"
              type="text"
              size="small"
              required
            />
            <TextField
            InputLabelProps={{
              shrink: true,
            }}
              id="Pdistrict"
              className="w-1/2"
              label="District"
              type="text"
              size="small"
            />
          </div>
          <div className=" flex items-center p-5 space-x-2">
            <TextField
            InputLabelProps={{
              shrink: true,
            }}
              id="Pcity"
              className="w-1/2"
              label="City"
              type="text"
              size="small"
              required
            />
            <TextField
            InputLabelProps={{
              shrink: true,
            }}
              id="Ppincode"
              className="w-1/2"
              label="Pincode"
              type="text"
              size="small"
            />
          </div>
          <div className="w-full px-3">
            <Checkbox
              className="ml-6"
              id="checkbox"
              onClick={autofill}
            ></Checkbox>
            <label>Use Contact address as Permanent address</label>
          </div>

          <div className=" flex items-center p-5 space-x-2">
            <TextField
            InputLabelProps={{
              shrink: true,
            }}
              id="parentName"
              className="w-1/2"
              label="Parent/Gaurdian"
              type="text"
              size="small"
              required
            />
            <TextField
            InputLabelProps={{
              shrink: true,
            }}
              id="parentOccupation"
              className="w-1/2"
              label="Occupation"
              type="text"
              size="small"
            />
          </div>
          <div className=" flex items-center p-5 space-x-2">
            <TextField
            InputLabelProps={{
              shrink: true,
            }}
              id="sponsorName"
              className="w-1/2"
              label="NRI Sponsor"
              type="text"
              size="small"
              required
            />
            <TextField
            InputLabelProps={{
              shrink: true,
            }}
              id="sponsorRelation"
              className="w-1/2"
              label="Relation with applicant"
              type="text"
              size="small"
            />
          </div>
          <div className=" flex px-5 py-2 mt-5 space-x-5">
            {/* <FormControl className="w-full" size="small">
              <InputLabel id="demo-select-small">Course</InputLabel>
              <Select
                id="demo-select-small"
                value={course}
                onChange={handleChange}
                label="Course"
              >
                <MenuItem value={10}>Computer Science and Engineering</MenuItem>
                <MenuItem value={20}>CSE (Artificial Intelligence)</MenuItem>
                <MenuItem value={30}>Artificial Intelligence & Data Science</MenuItem>
                <MenuItem value={40}>Cyber Security</MenuItem>
                <MenuItem value={50}>Electronics and Communications Engineering</MenuItem>
                <MenuItem value={60}>Electrical and Electronics Engineering</MenuItem>
                <MenuItem value={70}>Mechanical Engineering</MenuItem>
                <MenuItem value={80}>Civil Engineering</MenuItem>
              </Select>
            </FormControl> */}
            <Button onClick={personalUpload} variant="contained">
              Save & Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Personal;

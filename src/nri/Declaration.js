import { Button } from "@mui/material";
import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Backdrop, LinearProgress } from "@mui/material";
import FormData from "form-data";

const Declaration = () => {
  localStorage.setItem("pageNo", 3);
  const [loader, setLoader] = useState(false);
  const nav = useNavigate();
  useEffect(() => {
    return () => {};
  }, []);

  const handleBranch = async (e) => {
    e.preventDefault();
    const branch = document.getElementById("bp").value;
    console.log(branch);
    try {
      await axios
        .get("https://ams-backend-api.herokuapp.com/branch/get", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        })
        .then((res) => {
          console.log(res);
          console.log(res.data.list.length);
          for (let i = 0; i < res.data.list.length; i++) {
            if (res.data.list[i].name === branch) {
              if (res.data.list[i].NRIOccupied === res.data.list[i].NRISeats) {
                window.alert(
                  "Seats in Preferred branch are filled..Select another one"
                );
              }
            }
          }
        });
    } catch (error) {
         console.log(error);
    }
  };
  
  const [filesign, setFilesign] = useState();
  const [signPick,setSignPick] = useState(false)
  const handlesign = async(e) =>{
    console.log(e.target.id);
    setFilesign(e.target.files[0]);
    setSignPick(true);
  }

  const signupload = async(e) =>{
     e.preventDefault()
     const formData = new FormData();
     formData.append("imgSign", filesign);
     console.log(formData);
     if (signPick === true) {
      try {
        await axios
          .patch("https://ams-backend-api.herokuapp.com/user/nri/application-page3/" +localStorage.getItem("user_id"),
            formData,
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("access_token"),
                "Content-Type": "multipart/form-data",
              },
            }
          )
          .then((res) => {
            console.log(res);
            if (res.data.status === "SUCCESS ") {
              window.alert("photo uploaded");
            } else {
              window.alert("Something wrong happened");
            }
          });
      } catch (error) {
        window.alert("error wrong happened");
      }
    } else {
      window.alert("Please Pick the Signature");
    }
  }

  const [isChecked , setIschecked] = useState(false)
  const handlecheck = async(e) =>{
    setIschecked(true)
    console.log(e.target.id)
  }
  const handleProceed = async(e) => {
    setLoader(true);
    e.preventDefault();
    const data = {
      bp1: document.getElementById("bp").value,
    };
    if(isChecked === true && signPick ===true){
    try{
    await axios
      .patch("https://ams-backend-api.herokuapp.com/user/nri/application-page3/" +localStorage.getItem("user_id"),
        data,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        }
      )
      .then((res) => {
        setLoader(false);
        nav("/nriform/verification");
        if (res.data.status === "SUCCESS") {
          console.log(res);
        } else {
          console.log(res);
          console.log("something went wrong");
        }
      });
    }catch(error){
      console.log(error)
    }
  }else{
    window.alert("Kindly undertake the regulations");
  }
  };
  return (
    <div className="font-poppins py-20 h-auto min-h-screen  mx-auto w-11/12 lg:w-3/5 flex items-center xl:my-auto">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loader}
      >
        <div className="w-screen absolute top-0">
          <LinearProgress color="primary" />
        </div>
      </Backdrop>
      <div className="h-auto   w-full p-6 bg-white  rounded-[4px] ">
        <div className=" xl:w-1/2 rounded-md border-[2px] p-4 py-8 space-y-6">
          <p className="text-lg mb-4">Branch Preference</p>
          <div className="sm:space-x-3 xl:flex justify-between">
            <label>Select Branch</label>
            <select
              className="rounded-[4px]  border-[1px] w-full sm:w-auto hover:border-black focus:outline-red-600 border-gray-400 p-[5px] "
              id="bp"
              onChange={handleBranch}
            >
              <option value=""></option>
              <option value="Computer Science">Computer Science</option>
              <option value="Cyber Security">Cyber Security</option>
              <option value="Artificial Intelligence">
                Artificial Intelligence
              </option>
              <option value="CSE-AI&DS">CSE-AI&DS</option>
              <option value="Civil">Civil</option>
              <option value="Mech">Mech</option>
              <option value="EEE">EEE</option>
              <option value="EEE">EC</option>
            </select>
          </div>

          {/* <div className="xl:w-1/2 mt-6 xl:mt-0 xl:mx-8 p-4 bg-red-50 border-[2px] border-red-500 rounded-lg ">
            <b>Please Note</b><br/>
            A student opting to <b>EXIT</b> before <b>5</b> days after the publication of KEAM
            2023 score will be reimbursed the entire amount after deducting Rs
            <b> 1000</b> processing fee However a student will be automatically
            considered for MITS management quota from NRI quota. There after the
            registered choice will be freezed and will not be eligible for any
            refund if the admission is cancelled after 5 days from the date of
            KEAM result publication
          </div> */}
        </div>
        <p className="text-xl my-6 text-center underline">Instructions</p>
        <div className="w-full space-y-4 p-2">
          <p className="font-semibold ">1.GROUP A branches </p>
          <p>
            I am aware about the criteria followed by "Muthoot Institute
            of Technology and Science", for the B-Tech NRI Quota admission for
            the year 2023, such that my ward has to attain 75% Marks for
            Mathematics individually and 75% put together in Physics, Chemistry
            & Mathematics, in the 12th stadard, for Qualifying
            examination(CBSE/ISC) OR attain 75% Marks for Mathematics
            individually and 75% put together in Physics, Chemistry &
            Mathematics, in the 12th stadard(Terminal-evaluation TE), for
            Qualifying examination(State Board). If my ward failed to do so,
            there is no claim, from my side for the admission
          </p>
          <p className="font-semibold ">2.GROUP B branches </p>
          <p>
            I am aware about the criteria followed by "Muthoot Institute of
            Technology and Science", for the B-Tech NRI Quota admission for the
            year 2023, such that my ward has to attain 70% Marks for Mathematics
            individually and 70% put together in Physics, Chemistry &
            Mathematics, in the 12th stadard, for Qualifying
            examination(CBSE/ISC) OR attain 70% Marks for Mathematics
            individually and 70% put together in Physics, Chemistry &
            Mathematics, in the 12th stadard(Terminal-evaluation TE), for
            Qualifying examination(State Board). If my ward failed to do so,
            there is no claim, from my side for the admission
          </p>
        </div>

        <div className="w-full space-y-4 p-2 border-[3px] rounded-md mt-3 border-red-500">
          <p className="text-center font-semibold underline">EXIT OPTION </p>
          <p>
          1. A student can opt to <b>EXIT </b>from NRI quota before <b>5</b>
          days after the publication of KEAM 2023 score and will be reimbursed
          the entire amount after deducting Rs
          <b> 1000</b> processing fee. However a student will be automatically
          considered for MITS management quota from NRI quota if he desires so
          and has to freeze the registration in MITS. Request for exit should be
          mailed in admissions@mgits.ac.in within the stipulated time. There
          after the registered choice will be freezed and will not be eligible
          for any refund if the admission is cancelled after 5 days from the
          date of KEAM result publication
          </p>
        
          <p>
          <b>2. </b> I hereby declare that I have read all the instructions,
          Exit options and undertake that all the information furnished above
          are true and correct and I will obey the rules and regulations of the
          institution if admitted
          </p>
        </div>
        <p className="mt-6 text-center"> <input id="proof" onChange={handlecheck} type="checkbox" className="w-4 h-4 accent-red-600 mr-2"/><label>I have clearly read the instructions mentioned above and would like to proceed further</label></p>

        <div className=" xl:flex items-center my-3 gap-4 justify-center">
          <p className="font-semibold">Signature Upload (applicant)*</p>
          <span className="sm:space-x-3">
          <input
            id="sign"
            onChange={handlesign}
            type="file"
            className="rounded-[4px] mb-2 border-[1px] w-full sm:w-auto hover:border-black focus:outline-red-600 border-gray-400  "
          />
          <Button variant="contained" onClick={signupload}>Upload</Button>
          </span>
          
        </div>
        {/* <LinearProgress sx={{width: "75%",margin:"auto"}} /> */}
        <p className="text-center my-4 text-red-600">
          upload an image file (jpeg/png) of size less than 1mb*
        </p>
        

        <Button
          sx={{
            color: "#fff",
          }}
          color="greenary"
          variant="contained"
          onClick={handleProceed}
        >
          Proceed
        </Button>
      </div>
    </div>
  );
};

export default Declaration;

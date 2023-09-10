import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Grid, Input } from "@mui/material";
import { FaUserTie } from "react-icons/fa";
import { GrEdit } from "react-icons/gr";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdDone } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useMyContext } from "../MyContext/MyContext";
import DeleteDialogBox from "./DeleteDialogBox";

const CelebrityCard = ({ celebritydata, id }) => {
  const { state, dispatch } = useMyContext();
  const [editClick, setEditClick] = useState(true);
  const [DeleteBox, setDeleteBox] = useState(false);
  const [country, setCountry] = useState(celebritydata.country);
  const [gender, setGender] = useState(celebritydata?.gender);
  const [age, setAge] = useState(calculateAge(celebritydata?.dob));
  const [description, setDescription] = useState(celebritydata?.description);
  const [isEdited, setIsEdited] = useState(true);
  const [expanded, setExpanded] = React.useState(null);

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
    setIsEdited(false);
  };
  const handleAgeChange = (event) => {
    setAge(event.target.value);
    setIsEdited(false);
  };
  const handleGenderChange = (event) => {
    setGender(event.target.value);
    setIsEdited(false);
  };
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
    setIsEdited(false);
  };
  function calculateAge(dateOfBirth) {
    const dob = new Date(dateOfBirth);
    const currentDate = new Date();

    const age = currentDate.getFullYear() - dob.getFullYear();

    if (
      currentDate.getMonth() < dob.getMonth() ||
      (currentDate.getMonth() === dob.getMonth() &&
        currentDate.getDate() < dob.getDate())
    ) {
      return age - 1;
    }
    return age;
  }
  const deleteObject = (id) => {
    dispatch({ type: "DELETE_OBJECT", payload: { id } });
  };

  const updateObject = (id, changes) => {
    dispatch({ type: "UPDATE_OBJECT", payload: { id, changes } });
  };

  const accordionStyle = {
    border: "1px solid #ddd",
    borderRadius: "9px",
    marginBottom: "10px",
    width: "35rem",
    padding: "1rem",
  };

  return (
    <>
      <Accordion
        key={celebritydata?.id}
        className='accordian-box'
        style={accordionStyle}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Box className='summary'>
            <img src={celebritydata?.picture} className='user-image' alt='' />
            <Typography className='heading-label'>
              {celebritydata?.first} {celebritydata?.last}{" "}
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Grid>
            <Grid
              container
              direction='row'
              spacing={3}
              sx={{ mb: 2, justifyContent: "space-around", width: "100%" }}
            >
              <Grid item xs='auto'>
                <Typography className='label'>Age</Typography>
                {true ? (
                  <Typography className='celebrity-data'>
                    {calculateAge(celebritydata?.dob)}
                  </Typography>
                ) : (
                  <input
                    className='input-field'
                    type='number'
                    value={age}
                    onChange={handleAgeChange}
                    required
                  />
                )}
              </Grid>
              <Grid item xs='auto'>
                <InputLabel className='label' id='demo-simple-select-label'>
                  Gender
                </InputLabel>
                {editClick ? (
                  <Typography className='celebrity-data'>
                    {celebritydata?.gender}
                  </Typography>
                ) : (
                  <select
                    className='input-field'
                    value={gender}
                    onChange={handleGenderChange}
                    required
                  >
                    <option value='male'>Male</option>
                    <option value='Female'>Female</option>
                    <option value='female'>Rather not to say</option>
                    <option value='other'>Other</option>
                  </select>
                )}
              </Grid>
              <Grid item xs='auto'>
                <Typography className='label'>Country</Typography>
                {editClick ? (
                  <Typography className='celebrity-data'>
                    {celebritydata?.country}
                  </Typography>
                ) : (
                  <input
                    type='text'
                    className='input-field'
                    value={country}
                    onChange={handleCountryChange}
                    required
                  />
                )}
              </Grid>
            </Grid>
            <Grid item xs='auto' container>
              <Typography className='label'>description</Typography>
              {editClick ? (
                <Typography className='celebrity-data'>
                  {celebritydata?.description}
                </Typography>
              ) : (
                <textarea
                  type='text'
                  className='input-description'
                  value={description}
                  onChange={handleDescriptionChange}
                  required
                />
              )}
            </Grid>
          </Grid>
          {editClick ? (
            <Grid
              spacing={2}
              container
              direction='row'
              justifyContent='flex-end'
              alignItems='center'
              className='tool-buttons'
              sx={{ mt: 1 }}
            >
              <Grid item xs='auto' sx={{ pr: 1 }}>
                <RiDeleteBin6Line
                  className='tool-button1'
                  onClick={() => setDeleteBox(true)}
                />
                <DeleteDialogBox
                  DeleteBox={DeleteBox}
                  setDeleteBox={setDeleteBox}
                  onDelete={deleteObject}
                  id={celebritydata.id}
                />
              </Grid>
              <Grid item xs='auto'>
                <GrEdit
                  onClick={() => setEditClick(false)}
                  className='tool-button2'
                />
              </Grid>
            </Grid>
          ) : (
            <Grid
              spacing={2}
              container
              direction='row'
              justifyContent='flex-end'
              alignItems='center'
              className='edit-buttons'
              sx={{ mt: 1 }}
            >
              <Grid
                item
                xs='auto'
                onClick={() => setEditClick(true)}
                sx={{ pr: 1 }}
              >
                <RxCross2 className='edit-button1' />
              </Grid>
              <Grid item xs='auto'>
                <MdDone
                  className={!isEdited ? "edit-button2" : "active-edit-button2"}
                  onClick={(e) => {
                    if (isEdited == false) {
                      updateObject(celebritydata.id, {
                        gender: gender,
                        country: country,
                        description: description,
                        // dob: age,
                      });
                      setEditClick(true);
                    }
                  }}
                />
              </Grid>
            </Grid>
          )}
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default CelebrityCard;

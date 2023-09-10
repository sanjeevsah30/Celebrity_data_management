import React, { useState } from "react";
import { useMyContext } from "../MyContext/MyContext";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CelebrityCard from "./CelebrityCard";
import { Box } from "@mui/material";

function ObjectList() {
  const { state, dispatch } = useMyContext();
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <Box className='main' sx={{ px: 4 }}>
      <Box className='heading' sx={{ m: 2, p: 2 }}>
        All Celebrity Data
      </Box>
      <Box sx={{ m: 1, p: 1 }}>
        <form class='nosubmit'>
          <input
            class='nosubmit'
            type='search'
            placeholder='Search...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
      </Box>

      <Box className='allCards'>
        {searchTerm.trim() === ""
          ? state.map((obj) => (
              <CelebrityCard celebritydata={obj} key={obj.id} id={obj.id} />
            ))
          : state
              .filter((person) =>
                `${person.first} ${person.last}`
                  .toLowerCase()
                  .includes(searchTerm)
              )
              .map((obj) => <CelebrityCard celebritydata={obj} key={obj.id} />)}
      </Box>
    </Box>
  );
}

export default ObjectList;

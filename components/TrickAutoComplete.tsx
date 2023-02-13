import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { FunctionComponent } from "react";
import { TrickNode } from "../lexical/nodes/TrickNode";

const tricks = [];
  TrickNode.getTricks().forEach((trick) => {
    tricks.push(trick);
});


const TrickAutoComplete: FunctionComponent = () => {
  return (
    <Autocomplete
      id="trick-autocomplete"
      sx={{ width: 300 }}
      options={tricks}
      autoHighlight
      getOptionLabel={(option) => option}
      renderOption={(props, option) => (
        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
          {option}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Choose a trick"
          inputProps={{
            ...params.inputProps,
          }}
        />
      )}
    />
  )
}

export default TrickAutoComplete;
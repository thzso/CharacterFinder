import { useEffect, useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import getPages from "../util/getPages.js";
import getOptions from "../util/getOptions.js";
// import makeStyles from "@mui/material";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     "& .MuiInputLabel-outlined:not(.MuiInputLabel-shrink)": {
//       // Default transform is "translate(14px, 20px) scale(1)""
//       // This lines up the label with the initial cursor position in the input
//       // after changing its padding-left.
//       transform: "translate(34px, 20px) scale(1);"
//     },
//     "&.Mui-focused .MuiInputLabel-outlined": {
//       color: "purple"
//     }
//   },
//   inputRoot: {
//     color: "purple",
//     // This matches the specificity of the default styles at https://github.com/mui-org/material-ui/blob/v4.11.3/packages/material-ui-lab/src/Autocomplete/Autocomplete.js#L90
//     '&[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input:first-child': {
//       // Default left padding is 6px
//       paddingLeft: 26
//     },
//     "& .MuiOutlinedInput-notchedOutline": {
//       borderColor: "green"
//     },
//     "&:hover .MuiOutlinedInput-notchedOutline": {
//       borderColor: "red"
//     },
//     "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
//       borderColor: "purple"
//     }
//   }
// }));
function MuiAutocomplete({ options, setOptions }) {

  // const classes = useStyles();

  const [inputValue, setInputValue] = useState("");
  const [pages, setPages] = useState(null);
  const [value, setValue] = useState("");
  // console.log("inputValue : ", inputValue);

  useEffect(() => {

    if (inputValue !== "") {

      const page = async () => {
        setPages(await getPages(inputValue));
      };

      page();
    } else {
      setOptions([]);
    }

  }, [inputValue]);

  useEffect(() => {

    if (pages < 10) {
      setOptions([]);

      for (let i = 1; i <= pages; i++) {
        const getdata = async () => {
          let arr = await getOptions(i, inputValue);
          setOptions((prev) => [...prev, ...arr]);
        };
        getdata();
      }
    }
  }, [pages]);

  // console.log("value: ", value);

  // if(inputValue === ""){
  //   setOptions([])
  // }
  // console.log("options", options);

  // console.log("pages: ", pages, "inputValue: ", inputValue);
  return (
    <div style={{minWidth: "20rem", margin: "auto"}}>
      <Autocomplete
        // classes={classes}
        renderOption={(props, option) => {
          return (
            <li {...props} key={option.id}>
              {option.name}
            </li>
          );
        } }

        // disablePortal={true}
        clearOnBlur={false}

        filterOptions={(options) => options}

        options={options}
        // value={}
        onChange={(event, newValue) => {
          setValue(newValue);
        } }
        inputValue={inputValue}
        onInputChange={(e, newValue) => setInputValue(newValue)}
        renderInput={(params) => <TextField {...params} label="search character" sx={{ input: { color: 'white' } }}/>} />
    </div>
  );
}

export default MuiAutocomplete;

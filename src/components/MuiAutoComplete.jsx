import { useEffect, useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import getPages from "../util/getPages.js";
import getOptions from "../util/getOptions.js";
import styles from "./MuiAutocomplete.module.css";

function MuiAutocomplete({ options, setOptions }) {
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
    <div style={{ minWidth: "20rem", margin: "auto" }}>
      <Autocomplete
      // open={true}
        componentsProps={{
          paper: {
            sx: {
              backgroundColor: "transparent",
              color: "green",
            },
          },
          noOptions:{
            sx:{
                 color: "green",
            }
         
          }
          // listbox: {
          //   sx: {
          //     color: "green",
          //   },
          // },
        }}
       
        renderOption={(props, option) => {
          return (
            <li
              sx={{
                backgroundColor: "red",
                color: "orange",
              }}
              {...props}
              key={option.id}
            >
              {option.name}
            </li>
          );
        }}
        clearOnBlur={false}
        filterOptions={(options) => options}
        options={options}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(e, newValue) => setInputValue(newValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="search character"
            sx={{ input: { color: "red" }, button: { color: "white" } }}
          ></TextField>
        )}
      />
    </div>
  );
}

export default MuiAutocomplete;

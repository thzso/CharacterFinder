import { useEffect, useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import getPages from "../util/getPages.js";
import getOptions from "../util/getOptions.js";

const  SearchInput = ({ options, setOptions })=> {
  const [inputValue, setInputValue] = useState("");
  const [pages, setPages] = useState(null);
  const [value, setValue]= useState("")

  


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

  return (
    <div style={{ minWidth: "20rem", margin: "auto" }}>
      <Autocomplete
      value={value}
      isOptionEqualToValue={(option, value) => option.id === value.id}

        componentsProps={{
          paper: {
            sx: {
              backgroundColor: "rgb(255 255 255 / 85%)",
            },
          },
        }}
        ListboxProps={{
          className: "myCustomList",
        }}
        renderOption={(props, option) => {
          return (
            <li

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
        //onchange helyett kipróbálva
        onChange={(e, newValue) => {
          setValue(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(e, newValue) => setInputValue(newValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="search character"
            sx={{ button: { color: "#df7fd5" } }}
          ></TextField>
        )}
      />
    </div>
  );
}

export default SearchInput;

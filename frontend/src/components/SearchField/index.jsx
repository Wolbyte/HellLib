"use client";

import * as React from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchField(props) {
  return (
    <form
      action="/search/books"
      method="get"
      style={{ display: "flex", ...props.sx }}
    >
      <Button variant="contained" type="submit" color="primary" sx={{ mr: 1 }}>
        <SearchIcon />
      </Button>
      <TextField
        id="search_bar"
        type="search"
        name="q"
        defaultValue={props.value}
        className="text"
        label="جست‌وجوی کتاب"
        variant="outlined"
        placeholder="چیزی بنویسید..."
        size="small"
        fullWidth
      />
    </form>
  );
}

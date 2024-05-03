"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchField() {
  return (
    <form action="/Pokh" style={{ display: "flex" }}>
      <Button variant="contained" type="submit" color="primary" sx={{ mr: 1 }}>
        <SearchIcon />
      </Button>
      <TextField
        name="q"
        id="search_bar"
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

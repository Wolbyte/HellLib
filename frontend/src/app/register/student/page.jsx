"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { faToEnDigit, getCookie } from "@/helpers";

function RegisterationField({
  name,
  label,
  onChange,
  validationFn = (value) => {
    return { valid: true, value, msg: null };
  },
}) {
  const [value, setValue] = React.useState("");
  const [errorMsg, setErrorMsg] = React.useState(null);

  return (
    <TextField
      name={name}
      label={label}
      error={errorMsg != null}
      value={value}
      helperText={errorMsg}
      required
      onChange={(e) => {
        const validationRes = validationFn(e.target.value);

        setValue(validationRes.value);
        setErrorMsg(validationRes.msg);

        if (typeof onChange == "function") {
          if (validationRes.valid) {
            onChange(validationRes.value);
          } else {
            onChange(null);
          }
        }
      }}
    />
  );
}

const StudentRegistrationPage = React.memo(() => {
  const [firstNameField, setFirstNameField] = React.useState(null);
  const [lastNameField, setLastNameField] = React.useState(null);
  const [classNumberField, setClassNumberField] = React.useState(null);
  const [nationalCodeField, setNationalCodeField] = React.useState(null);

  const [errorMsg, setErrorMsg] = React.useState(null);
  const [msg, setMsg] = React.useState(null);

  async function submitForm() {
    if (
      firstNameField == null ||
      lastNameField == null ||
      classNumberField == null ||
      nationalCodeField == null
    )
      return;

    setErrorMsg(null);
    setMsg(null);

    const csrftoken = getCookie("csrftoken");

    const res = await fetch("/api/students/", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken,
      },
      body: JSON.stringify({
        first_name: firstNameField,
        last_name: lastNameField,
        class_number: classNumberField,
        national_code: nationalCodeField,
      }),
    });

    if (res.status != 201) {
      const resData = await res.json();

      if (resData["national_code"].toString().includes("exists")) {
        setErrorMsg("این دانش‌ٰآموز پیشتر ثبت شده است.");
      }
    } else {
      setMsg("نام‌نویسی انجام شد");
    }
  }

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          border: "1px solid #ccc",
          borderRadius: "8px",
          backgroundColor: "#fff",
          width: "100%",
          maxWidth: "2500px",
          height: "60vh",
          minHeight: 280,
        }}
      >
        {/* Right white section */}
        <Box
          sx={{
            width: "80%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "24px",
            position: "relative",
          }}
        >
          <Box
            sx={{
              marginBottom: "16px",
              color: "#2196f3",
              fontSize: "24px",
              fontWeight: "bold",
            }}
          >
            افزودن دانش‌آموز
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "16px",
              marginBottom: "16px",
            }}
          >
            <RegisterationField label="نام" onChange={setFirstNameField} />
            <RegisterationField
              label="نام‌خانوادگی"
              onChange={setLastNameField}
            />
            <RegisterationField
              label="شماره‌ی کلاسی"
              onChange={setClassNumberField}
              validationFn={(value) => {
                value = faToEnDigit(value).replace(/\D/g, "").substr(0, 10);

                return { valid: true, value, msg: null };
              }}
            />
            <RegisterationField
              label="کدملی"
              onChange={setNationalCodeField}
              validationFn={(value) => {
                let valid = true;
                let msg = null;

                value = faToEnDigit(value).replace(/\D/g, "").substr(0, 10);

                if (value.length != 10) {
                  valid = false;
                  msg = "کدملی باید ۱۰ رقمی باشد";
                }

                return { valid, value, msg };
              }}
            />
          </Box>

          {msg ? (
            <Typography color="green" gutterBottom>
              {msg}
            </Typography>
          ) : null}

          {errorMsg ? (
            <Typography color="error" gutterBottom>
              {errorMsg}
            </Typography>
          ) : null}

          <Box>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              onClick={submitForm}
            >
              تایید
            </Button>
          </Box>
        </Box>

        {/* Left blue section */}
        <Box
          sx={{
            width: "20%",
            backgroundColor: "#2196f3",
            borderRadius: "0px 8px 8px 0px",
          }}
        />
      </Box>
    </Box>
  );
});

StudentRegistrationPage.displayName = "StudentRegistrationPage";

export default StudentRegistrationPage;

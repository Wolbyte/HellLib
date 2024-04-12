import Image from "next/image";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

export default function Home() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1} p={2}>
        <Grid item xs={12}>
          <Typography
            align="center"
            noWrap
            variant="h3"
            p={2}
            sx={{ backgroundColor: "warning.main", borderRadius: "5px" }}
          >
            xs = 12 --{">"} 100% (12/12)
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography
            align="center"
            noWrap
            variant="h4"
            p={2}
            sx={{ backgroundColor: "success.main", borderRadius: "5px" }}
          >
            xs = 6 --{">"} 50% (6/12)
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography
            align="center"
            variant="h4"
            p={2}
            sx={{ backgroundColor: "error.main", borderRadius: "5px" }}
          >
            پروژه وزیرمتن یک خانواده تایپ‌فیس فارسی-عربی با ۹ وزن است که در سال
            ۱۳۹۴ با نام «وزیر» آغاز شد و در طول این سال‌ها طراحی و توسعه آن
            ادامه یافت. فونت وزیرمتن شکلی ساده و روان دارد و می‌توان از آن در
            اغلب زمینه‌ها استفاده کرد. برای حروف لاتین از فونت Roboto استفاده
            شده است. این یک نرم افزار آزاد و متن‌باز است.
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

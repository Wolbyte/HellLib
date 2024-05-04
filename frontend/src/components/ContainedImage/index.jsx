import Box from "@mui/material/Box";
import Image from "next/image";

export default function ContainedImage({
  src,
  alt,
  width = 128,
  height = 128,
  gutterBottom = false,
}) {
  return (
    <Box
      sx={{
        position: "relative",
        width: width,
        height: height,
        mb: gutterBottom === true ? 2 : 0,
      }}
    >
      <Image src={src} alt={alt} fill />
    </Box>
  );
}

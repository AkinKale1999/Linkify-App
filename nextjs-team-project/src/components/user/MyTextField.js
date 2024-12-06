import TextField from "@mui/material/TextField";

export default function MyTextField({ label, value }) {


  return(
  <TextField label={label} defaultValue={value} />
);
}

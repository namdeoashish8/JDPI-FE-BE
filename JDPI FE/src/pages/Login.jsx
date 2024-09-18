import { Box, Button, TextField } from "@mui/material";
import { useContext, useState } from "react";
import snackbar from "../utility/snackbar";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setusername] = useState("");
  const [password, setPwd] = useState("");

  const {setUserInfo} = useContext(UserContext);
  const navigate = useNavigate();


  const submit = async () => {
    console.log(username, password);
    
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/api/v1/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      }
    );

    const data = await response.json();
    if (response.status == 200) {
      //in data what is userInfo print that(same we need to provide to context to remove login button)
      console.log(data?.userInfo);
      // now we should set this userInfo in the context
      setUserInfo(data?.userInfo);//we will use this set value in header to remove login buttons

      snackbar("success", data.message);
      resetForm();
      navigate("/dashboard");// Navigate to the dashboard after login
    } else {
      snackbar("error", data.error);
    }
  };

  const resetForm = () => {
    setusername("");
    setPwd("");
  };

  return (
    <div className="login-container baskervville-sc-regular">
      <Box className="login-box" component="form" noValidate autoComplete="off">
        <h3>Enter details to login</h3>
        <TextField
          id="standard-basic"
          label="Username"
          variant="standard"
          type="username"
          sx={{ marginBottom: "8px" }}
          required
          fullWidth
          value={username}
          onChange={(e) => setusername(e.target.value)}
        />
        <TextField
          id="standard-basic"
          label="Password"
          variant="standard"
          type="password"
          sx={{ marginBottom: "8px" }}
          required
          fullWidth
          value={password}
          onChange={(e) => setPwd(e.target.value)}
        />

        <Button variant="contained" fullWidth onClick={submit}>
          {" "}
          Login
        </Button>
      </Box>
    </div>
  );
};

export default Login;

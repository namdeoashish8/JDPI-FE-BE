import { Box, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import snackbar from '../utility/snackbar'
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
      const [name, setName] = useState('');
      const [email, setEmail] = useState('');
      const [phone, setPhone] = useState('');
      const [username, setusername] = useState('');
      const [password, setPwd] = useState('');
      const navigate = useNavigate();

      const submit = async()=>{
        console.log(name, email, phone, username, password);  
        console.log(`Base URL: ${import.meta.env.VITE_BASE_URL}`); 
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/auth/signup`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body:JSON.stringify({
            name, email, phone, username, password
          } )
        });
    
        const data = await response.json();
        if(response.status==201){
          snackbar('success', 'SignUp Successful');
          resetForm();
          navigate("/login");// Navigate to the login after dashboard
        }
        else{
          snackbar('error', data.error);
        }
      }
    
      const resetForm=()=>{
        setName('')
        setPhone('')
        setEmail('')
        setusername('')
        setPwd('')
      }

  return (
    <div className="signup-container baskervville-sc-regular">
      <Box
        className="signup-box"
        component="form"
        noValidate
        autoComplete="off"
      >
        <h3>Enter details to signup</h3>
        <TextField
          id="standard-basic"
          label="Full name"
          variant="standard"
          required
          fullWidth
          sx={{marginBottom: '8px'}}
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <TextField
          id="standard-basic"
          label="Phone Number"
          variant="standard"
          type="number"
          required
          sx={{marginBottom: '8px'}}
          fullWidth
          value={phone}
          onChange={e => setPhone(e.target.value)}
        />
        <TextField
          id="standard-basic"
          label="Email"
          variant="standard"
          type="email"
          sx={{marginBottom: '8px'}}
          fullWidth
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <TextField
          id="standard-basic"
          label="Username"
          variant="standard"
          type="username"
          sx={{marginBottom: '8px'}}
          required
          fullWidth
          value={username}
          onChange={e => setusername(e.target.value)}
        />
        <TextField
          id="standard-basic"
          label="Password"
          variant="standard"
          type="password"
          sx={{marginBottom: '8px'}}
          required
          fullWidth
          value={password}
          onChange={e => setPwd(e.target.value)}
        />

        <Button variant="contained" fullWidth onClick={submit}> SignUp</Button>
      </Box>
    </div>
  );
};

export default Signup;

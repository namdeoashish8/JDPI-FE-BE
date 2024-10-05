import { Box, Button } from "@mui/material";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { userInfo } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <div>
      {userInfo == undefined ? ( //using if else to show/hide login button
        navigate("/verify-loginSignup") // Navigate to the login after dashboard
      ) : (
        <div className="profile-container">
          <h1 className="title">Your Details below-</h1>
          <Box className="profile-Box">
            <div>
              <h2>Name: {userInfo.name}</h2>
              <h2>Phone: {userInfo.phone}</h2>
              <h2>Email: {userInfo.email}</h2>
              <h2>User name: {userInfo.username}</h2>
            </div>
            <div className="profile-Buttons">
              <Button variant="contained">Update Information</Button>
              <Button variant="contained">Delete credentials</Button>
            </div>
          </Box>
        </div>
      )}
    </div>
  );
};

export default Profile;

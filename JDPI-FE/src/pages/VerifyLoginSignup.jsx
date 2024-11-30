import { Box } from "@mui/material";
import { Link } from "react-router-dom";

const VerifyLoginSignup = () => {
  return (
    <div>
        <div className=" logincheck-container baskervville-sc-regular">
          <Link to="/login" className="home-box-link">
            <Box className="loginCheck-box">
              <h2>Please click here to login</h2>
            </Box>
          </Link>
          <Link to="/signup" className="home-box-link">
            <Box className="loginCheck-box">
              <h2>Please click here to SignUp</h2>
            </Box>
          </Link>
        </div>
    </div>
  )
}

export default VerifyLoginSignup

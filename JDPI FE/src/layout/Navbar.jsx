import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Navbar = () => {
  const logo = "../src/assets/JDPI2.jpg";
  const { userInfo } = useContext(UserContext);

//   console.log(userInfo);

  return (
    <nav>
      <div className="nav-container baskervville-sc-regular">
        <Link to={"/"}>
          <div className="nav-logocontain">
            <img src={logo} alt="JDPI" />
            <h1>JD PVS Infra-Resources</h1>
          </div>
        </Link>
        <div className="nav-right">
          {userInfo == undefined ? (//using if else to show/hide login button
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
            </>
          ) : (
            <>
              <p>Welcome {userInfo.name}</p>
              <Link to="/logout">Logout</Link>
              <Link to="/profile">MyProfile</Link>
            </>
            
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

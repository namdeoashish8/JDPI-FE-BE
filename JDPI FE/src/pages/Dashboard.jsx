import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import BackHandTwoToneIcon from "@mui/icons-material/BackHandTwoTone";
import AddToQueueTwoToneIcon from "@mui/icons-material/AddToQueueTwoTone";
import CurrencyRupeeRoundedIcon from "@mui/icons-material/CurrencyRupeeRounded";
import PrecisionManufacturingSharpIcon from "@mui/icons-material/PrecisionManufacturingSharp";
import QueryStatsSharpIcon from "@mui/icons-material/QueryStatsSharp";
import AssessmentSharpIcon from "@mui/icons-material/AssessmentSharp";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import SoupKitchenRoundedIcon from "@mui/icons-material/SoupKitchenRounded";
import EngineeringTwoToneIcon from "@mui/icons-material/EngineeringTwoTone";
import ManageHistoryTwoToneIcon from "@mui/icons-material/ManageHistoryTwoTone";
import GroupsTwoToneIcon from "@mui/icons-material/GroupsTwoTone";

const Dashboard = () => {
  const { userInfo } = useContext(UserContext);

  return (
    <div className="baskervville-sc-regular">
      {userInfo == undefined ? ( //using if else to show/hide login button
        <div className=" logincheck-container">
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
      ) : (
        <div className="home-container">
          <h1 className="title">Dashboard</h1>
          <div className="box-container">
            <Link to="/mark-attendance" className="home-box-link">
              <Box className="home-box">
                <h2>
                  <BackHandTwoToneIcon /> Mark Attendance
                </h2>
                <p>Employees can check in/out </p>
              </Box>
            </Link>
            <Link to="/daily-dispatch" className="home-box-link">
              <Box className="home-box">
                <h2>
                  <AddToQueueTwoToneIcon /> Daily dispatch
                </h2>
                <p>
                  log daily dispatches of sand, their destinations, and
                  transport details
                </p>
              </Box>
            </Link>
            <Link to="/daily-expense" className="home-box-link">
              <Box className="home-box">
                <h2>
                  <CurrencyRupeeRoundedIcon /> Daily Expenses
                </h2>
                <p>Fuel, kitchen supplies, employee benefits</p>
              </Box>
            </Link>
            <Link to="/machine-inventory" className="home-box-link">
              <Box className="home-box">
                <h2>
                  <PrecisionManufacturingSharpIcon /> Machine & Parts Inventory
                </h2>
                <p>Machinery and spare parts</p>
              </Box>
            </Link>
          </div>
          <div className="box-container">
            <Link to="/view-attendance" className="home-box-link">
              <Box className="home-box">
                <h2>
                  View Attendance <QueryStatsSharpIcon />
                </h2>
                <p>Attendance records and total work hours</p>
              </Box>
            </Link>
            <Link to="/sales-reports" className="home-box-link">
              <Box className="home-box">
                <h2>
                  Monthly Sales Reports <AssessmentSharpIcon />
                </h2>
                <p>Quantities, Destinations, and Revenue</p>
              </Box>
            </Link>
            <Link to="/expense-reports" className="home-box-link">
              <Box className="home-box">
                <h2>
                  <AssessmentOutlinedIcon /> Expense Reports
                </h2>
                <p>Reports based on daily, weekly, or monthly expenses</p>
              </Box>
            </Link>
            <Link to="/kitchen-inventory" className="home-box-link">
              <Box className="home-box">
                <h2>
                  Kitchen Inventory <SoupKitchenRoundedIcon />
                </h2>
                <p>Track kitchen supplies</p>
              </Box>
            </Link>
          </div>
          <div className="box-container">
            <Link to="/attendance-reports" className="home-box-link">
              <Box className="home-box">
                <h2>
                  Attendance Reports <AssessmentOutlinedIcon />
                </h2>
                <p>Admin Access Required</p>
              </Box>
            </Link>
            <Link to="/maintenance-log" className="home-box-link">
              <Box className="home-box">
                <h2>
                  Maintenance Logs <EngineeringTwoToneIcon />
                </h2>
                <p>Repairs, Part replacements</p>
              </Box>
            </Link>
            <Link to="/maintenance-schedule" className="home-box-link">
              <Box className="home-box">
                <h2>
                  Scheduled Maintenance <ManageHistoryTwoToneIcon />
                </h2>
                <p>Lorem ipsum dolor sit amet.</p>
              </Box>
            </Link>
            <Link to="/manage-staff" className="home-box-link">
              <Box className="home-box">
                <h2>
                  Manage Staff <GroupsTwoToneIcon />
                </h2>
                <p>Update the employee/staff list</p>
              </Box>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

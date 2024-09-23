import { Route, Routes } from "react-router-dom";
import "./App.css";
import Signup from "./pages/Signup";
import MainLayout from "./layout/MainLayout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ScheduleMaintain from "./pages/dashboardPages/ScheduleMaintain";
import MarkAttendance from "./pages/dashboardPages/MarkAttendance";
import StaffManage from "./pages/dashboardPages/StaffManage";
import Maintenance from "./pages/dashboardPages/Maintenance";
import AttendanceReport from "./pages/dashboardPages/AttendanceReport";
import KitchenInvent from "./pages/dashboardPages/KitchenInvent";
import ExpenseReport from "./pages/dashboardPages/ExpenseReport";
import SalesReport from "./pages/dashboardPages/SalesReport";
import ViewAttendance from "./pages/dashboardPages/ViewAttendance";
import MachInvent from "./pages/dashboardPages/MachInvent";
import DailyExpenselog from "./pages/dashboardPages/DailyExpenselog";
import DailyDispatch from "./pages/dashboardPages/DailyDispatch";

function App() {
  return (
      <Routes>
        <Route path='/' element={<MainLayout/>}>
        <Route path='/signup' element={<Signup/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/mark-attendance' element={<MarkAttendance/>} />
        <Route path='/daily-dispatch' element={<DailyDispatch/>} />
        <Route path='/daily-expense' element={<DailyExpenselog/>} /> 
        <Route path='/machine-inventory' element={<MachInvent/>} />
        <Route path='/view-attendance' element={<ViewAttendance/>} />
        <Route path='/sales-reports' element={<SalesReport/>} />
        <Route path='expense-reports' element={<ExpenseReport/>} />
        <Route path='/kitchen-inventory' element={<KitchenInvent/>} />
        <Route path='/attendance-reports' element={<AttendanceReport/>} />
        <Route path='/maintenance-log' element={<Maintenance/>} />
        <Route path='/maintenance-schedule' element={<ScheduleMaintain/>} />
        <Route path='/manage-staff' element={<StaffManage/>} />
      </Route>
    </Routes>
  );
}

export default App;

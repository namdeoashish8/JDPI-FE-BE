import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useTable } from "react-table";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import { enqueueSnackbar } from "notistack";
import snackbar from "../../utility/snackbar";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";

const StaffManage = () => {
  const [staffData, setStaffData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [deactivateOpen, setDeactivateOpen] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    phone: "",
    role: "",
    status: "",
    gender: "",
  });
  const [updateEmployee, setUpdateEmployee] = useState({
    name: "",
    phone: "",
    role: "",
  });
  const [deactivateEmp, setDeactivateEmp] = useState({
    phone: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    role: "",
    status: "",
    gender: "",
  });
  //errrs during update
  const [updateErrors, setUpdateErrors] = useState({
    name: "",
    phone: "",
    role: "",
  });

  const [deactivateErrors, setDeactivateErrors] = useState({
    phone: "",
  });
  // Fetch data from the backend
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/v1/staff/getEmployee`
      );
      if (response.status === 200 && response.data.employees) {
        setStaffData(response.data.employees);
      } else {
        throw new Error("Invalid format of data from server");
      }
    } catch (error) {
      console.error("Error in fetching staff data", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Phone",
        accessor: "phone",
      },
      {
        Header: "Role",
        accessor: "role",
      },
      {
        Header: "Status",
        accessor: "status",
      },
      {
        Header: "Gender",
        accessor: "gender",
      },
    ],
    []
  );

  const data = useMemo(
    () => (Array.isArray(staffData) ? staffData : []),
    [staffData]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickUpdate = () => {
    setUpdateOpen(true);
  };
  const handleClickDeactivate = () => {
    setDeactivateOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    //Reset form data when dialog closes
    setNewEmployee({
      name: "",
      phone: "",
      role: "",
      status: "",
      gender: "",
    });
    setErrors({
      name: "",
      phone: "",
      role: "",
      status: "",
      gender: "",
    });
  };

  //to handle update close popup
  const handleUpdateClose = () => {
    setUpdateOpen(false);
    //resetting the form
    setUpdateEmployee({
      name: "",
      phone: "",
      role: "",
    });
    setUpdateErrors({
      name: "",
      phone: "",
      role: "",
    });
  };
  const handleDeactivateClose = () => {
    setDeactivateOpen(false);
    //resetting the form
    setDeactivateEmp({
      phone: "",
    });
    setDeactivateErrors({
      phone: "",
    });
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee({ ...newEmployee, [name]: value });
  };
  const handleUpdateInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateEmployee({ ...updateEmployee, [name]: value });
  };

  const handleDeactivateInputChange = (e) => {
    const { name, value } = e.target;
    setDeactivateEmp({ ...deactivateEmp, [name]: value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      !newEmployee.name ||
      !newEmployee.phone ||
      !newEmployee.role ||
      !newEmployee.status ||
      !newEmployee.gender
    ) {
      enqueueSnackbar("Please fill the details before submiting", {
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
        variant: "error",
      });
    }
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v1/staff/addEmployee`,
        newEmployee
      );
      console.log(response.data);
      if (response.status === 201) {
        setStaffData((prevData) => [...prevData, response.data]);
        // Reset form fields and close the dialog after submission
        setNewEmployee({
          name: "",
          phone: "",
          role: "",
          status: "",
          gender: "",
        });
        handleClose(); // Close the dialog after successful submission
        enqueueSnackbar("Employee added successfully", {
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
          variant: "success",
        });
      }
    } catch (error) {
      console.log(error);
      if (error.response.data && error.response.data.error) {
        const errorMessage = error.response.data.error;
        if (errorMessage.includes("name")) {
          setErrors((prev) => ({ ...prev, name: errorMessage }));
        }
        if (errorMessage.includes("phone")) {
          setErrors((prev) => ({ ...prev, phone: errorMessage }));
        }
        if (errorMessage.includes("role")) {
          setErrors((prev) => ({ ...prev, role: errorMessage }));
        }
        if (errorMessage.includes("status")) {
          setErrors((prev) => ({ ...prev, status: errorMessage }));
        }
        if (errorMessage.includes("gender")) {
          setErrors((prev) => ({ ...prev, gender: errorMessage }));
        }
        enqueueSnackbar(errorMessage, {
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
          variant: "error",
        });
      } else {
        enqueueSnackbar("Error adding new employee", {
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
          variant: "error",
        });
      }
    }
  };

  const handleUpdateSubmit = async (event) => {
    event.preventDefault();
    if (!updateEmployee.name || !updateEmployee.phone || !updateEmployee.role) {
      snackbar('error','Please fill the details before submiting')
    }
    try {
      //Create backend for updateEmployee route
      const response = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/api/v1/staff/updateEmployee`,
        updateEmployee
      );
      console.log(response.data);
      if (response.status === 200) {
        // Reset form fields and close the dialog after submission
        setUpdateEmployee({
          name: "",
          phone: "",
          role: "",
        });
        fetchData();
        handleUpdateClose(); // Close the dialog after successful submission
        snackbar('success','Employee updated successfully')
      }
    } catch (error) {
      console.log(error);
      if (error.response.data && error.response.data.error) {
        const errorMessage = error.response.data.error;
        if (errorMessage.includes("name")) {
          setUpdateErrors((prev) => ({ ...prev, name: errorMessage }));
        }
        if (errorMessage.includes("phone")) {
          setUpdateErrors((prev) => ({ ...prev, phone: errorMessage }));
        }
        if (errorMessage.includes("role")) {
          setUpdateErrors((prev) => ({ ...prev, role: errorMessage }));
        }
        enqueueSnackbar('error',errorMessage);
      } else {
        enqueueSnackbar('error','Error while updating employee');
      }
    }
  };

  const handleDeactivateSubmit = async (event) => {
    event.preventDefault();
    if (!deactivateEmp.phone) {
    snackbar('error','Please fill the details before submiting')
    }
    try {
      //Create backend for updateEmployee route
      const response = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/api/v1/staff/deactivate`,
        deactivateEmp
      );
      console.log(response.data);
      if (response.status === 200) {
        // Reset form fields and close the dialog after submission
        setDeactivateEmp({
          phone: "",
        });
        fetchData();
        handleDeactivateClose(); // Close the dialog after successful submission
        snackbar('success',"Employee deactivated successfully")
      }
    } catch (error) {
      console.log(error);
      if (error.response.data && error.response.data.error) {
        const errorMessage = error.response.data.error;
        if (errorMessage.includes("phone")) {
          deactivateErrors((prev) => ({ ...prev, phone: errorMessage }));
        }
        snackbar('error',errorMessage);
      } else {
        snackbar('error','Error while deactivate employee');
      }
    }
  };
  return (
    <div className="staff-container">
      <div className="header-container">
        <h2 className="baskervville-sc-regular">Staff Management</h2>
      </div>
      <div className="manage-container">
        {/* Dialog for adding employee */}
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add Employee</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please fill the employee details.
            </DialogContentText>
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="name"
              label="Name"
              value={newEmployee.name}
              onChange={handleInputChange}
              error={!!errors.name}
              helperText={errors.name}
              fullWidth
            />
            <TextField
              required
              margin="dense"
              id="phone"
              name="phone"
              label="Phone Number"
              value={newEmployee.phone}
              onChange={handleInputChange}
              error={!!errors.phone}
              helperText={errors.phone}
              fullWidth
            />
            <InputLabel id="demo-simple-select-label">Select Role</InputLabel>
            <Select
              required
              labelid="demo-simple-select"
              margin="dense"
              id="role"
              name="role"
              value={newEmployee.role}
              onChange={handleInputChange}
              error={!!errors.role}
              fullWidth
            >
              <MenuItem value="">Select Role</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="manager">Manager</MenuItem>
              <MenuItem value="driver">Driver</MenuItem>
              <MenuItem value="supervisor">Supervisor</MenuItem>
              <MenuItem value="helper">Helper</MenuItem>
              <MenuItem value="operator">Operator</MenuItem>
              <MenuItem value="chef">Chef</MenuItem>
              <MenuItem value="security">Security</MenuItem>
            </Select>
            {errors.role && <p style={{ color: "red" }}>{errors.role}</p>}
            <InputLabel id="demo-simple-select-label">Select Status</InputLabel>
            <Select
              required
              labelid="demo-simple-select"
              margin="dense"
              id="status"
              name="status"
              label="Status"
              value={newEmployee.status}
              onChange={handleInputChange}
              error={!!errors.status}
              fullWidth
            >
              <MenuItem value="">Select Status</MenuItem>
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Deactivated">deactivated</MenuItem>
            </Select>
            {errors.status && <p style={{ color: "red" }}>{errors.status}</p>}
            <InputLabel id="demo-simple-select-label">Select Gender</InputLabel>
            <Select
              required
              margin="dense"
              id="gender"
              name="gender"
              label="Gender"
              value={newEmployee.gender}
              onChange={handleInputChange}
              error={!!errors.gender}
              fullWidth
            >
              <MenuItem value="">Select Gender</MenuItem>
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
            </Select>
            {errors.gender && <p style={{ color: "red" }}>{errors.gender}</p>}
          </DialogContent>
          <DialogActions>
            <Stack direction="row" spacing={2}>
              <Button
                onClick={handleClose}
                variant="outlined"
                startIcon={<DeleteIcon />}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                variant="contained"
                endIcon={<SendIcon />}
              >
                Submit
              </Button>
            </Stack>
          </DialogActions>
        </Dialog>

        {/* Dialogue box to update employee*/}
        <Dialog open={updateOpen} onClose={handleUpdateClose}>
          <DialogTitle>Update Employee details</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please update the employee details.
            </DialogContentText>
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="name"
              label="Name"
              value={updateEmployee.name}
              onChange={handleUpdateInputChange}
              error={!!updateErrors.name}
              helperText={updateErrors.name}
              fullWidth
            />
            <TextField
              required
              margin="dense"
              id="phone"
              name="phone"
              label="Phone Number"
              value={updateEmployee.phone}
              onChange={handleUpdateInputChange}
              error={!!updateErrors.phone}
              helperText={updateErrors.phone}
              fullWidth
            />
            <InputLabel id="demo-simple-select-label">Select Role</InputLabel>
            <Select
              required
              labelid="demo-simple-select"
              margin="dense"
              id="role"
              name="role"
              value={updateEmployee.role}
              onChange={handleUpdateInputChange}
              error={!!updateErrors.role}
              fullWidth
            >
              <MenuItem value="">Select Role</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="manager">Manager</MenuItem>
              <MenuItem value="driver">Driver</MenuItem>
              <MenuItem value="supervisor">Supervisor</MenuItem>
              <MenuItem value="helper">Helper</MenuItem>
              <MenuItem value="operator">Operator</MenuItem>
              <MenuItem value="chef">Chef</MenuItem>
              <MenuItem value="security">Security</MenuItem>
            </Select>
            {updateErrors.role && (
              <p style={{ color: "red" }}>{updateErrors.role}</p>
            )}
          </DialogContent>
          <DialogActions>
            <Stack direction="row" spacing={2}>
              <Button
                onClick={handleUpdateClose}
                variant="outlined"
                startIcon={<DeleteIcon />}
              >
                Cancel
              </Button>
              <Button
                onClick={handleUpdateSubmit}
                variant="contained"
                endIcon={<SendIcon />}
              >
                Submit
              </Button>
            </Stack>
          </DialogActions>
        </Dialog>

        {/*Dialogue box to deactivate employee*/}
        <Dialog open={deactivateOpen} onClose={handleDeactivateClose}>
          <DialogTitle>Deactivate Employee</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please write phone number to deactivate an employee.
            </DialogContentText>
            <TextField
              required
              margin="dense"
              id="phone"
              name="phone"
              label="Phone Number"
              value={deactivateEmp.phone}
              onChange={handleDeactivateInputChange}
              error={!!deactivateErrors.phone}
              helperText={deactivateErrors.phone}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Stack direction="row" spacing={2}>
              <Button
                onClick={handleDeactivateClose}
                variant="outlined"
                startIcon={<DeleteIcon />}
              >
                Cancel
              </Button>
              <Button
                onClick={handleDeactivateSubmit}
                variant="contained"
                endIcon={<SendIcon />}
              >
                Submit
              </Button>
            </Stack>
          </DialogActions>
        </Dialog>
        {/* Table */}

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div className="emptable-container">
            <table className="table" {...getTableProps()}>
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr
                    {...headerGroup.getHeaderGroupProps()}
                    key={headerGroup.id}
                  >
                    {headerGroup.headers.map((column) => (
                      <th {...column.getHeaderProps()} key={column.id}>
                        {column.render("Header")}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()} key={row.id}>
                      {row.cells.map((cell) => (
                        <td {...cell.getCellProps()} key={cell.column.id}>
                          {cell.render("Cell")}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
        <div className="buttons-container">
          <Button
            variant="contained"
            color="success"
            size="medium"
            onClick={handleClickOpen}
          >
            Add Employee
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="medium"
            onClick={handleClickUpdate}
          >
            Update Employee
          </Button>
          <Button
            variant="contained"
            color="error"
            size="medium"
            onClick={handleClickDeactivate}
          >
            Deactivate Employee
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StaffManage;

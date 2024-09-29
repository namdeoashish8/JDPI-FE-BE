import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useTable } from "react-table";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";


const StaffManage = () => {
  const [staffData, setStaffData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    phone: "",
    role: "",
    status: "",
    gender: "",
  });

  // Fetch data from the backend
  useEffect(() => {
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

  const handleClose = () => {
    setOpen(false);
    // Reset form data when dialog closes
    // setNewEmployee({
    //   name: "",
    //   phone: "",
    //   role: "",
    //   status: "",
    //   gender: "",
    // });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee({ ...newEmployee, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v1/staff/addEmployee`,
        newEmployee
      );
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
      }
    } catch (error) {
      console.error("Error adding new employee", error);
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
              fullWidth
            />
            <TextField
              required
              margin="dense"
              id="role"
              name="role"
              label="Role"
              value={newEmployee.role}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              required
              margin="dense"
              id="status"
              name="status"
              label="Status"
              value={newEmployee.status}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              required
              margin="dense"
              id="gender"
              name="gender"
              label="Gender"
              value={newEmployee.gender}
              onChange={handleInputChange}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            {/* <Button onClick={handleClose} variant="outlined">
              Cancel
            </Button>
            <Button onClick={handleSubmit} variant="outlined" type="submit">
              Submit
            </Button> */}
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

        {/* Table */}

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div className="emptable-container">
           
            <table className = "table"
              {...getTableProps()}
            >
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr
                    {...headerGroup.getHeaderGroupProps()}
                    key={headerGroup.id}
                  >
                    {headerGroup.headers.map((column) => (
                      <th
                        {...column.getHeaderProps()}
                        key={column.id}
                      >
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
                        <td
                          {...cell.getCellProps()}
                          key={cell.column.id}
                        >
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
          <Button variant="contained" color="success" size="medium" onClick={handleClickOpen}>
            Add Employee
          </Button>
          <Button variant="contained" color="error" size="medium" >
            Deactivate Employee
          </Button>
          <Button variant="contained"  color="secondary" size="medium" >
            Update Employee
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StaffManage;

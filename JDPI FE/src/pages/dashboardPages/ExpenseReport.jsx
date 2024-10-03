// import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import { useMemo, useState } from "react";
import { useTable } from "react-table";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import snackbar from "../../utility/snackbar";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

const ExpenseReport = () => {
  const [itemCategory, setitemCategory] = useState("");
  let expenseStartDateVar = Date();
  let expenseEndDateVar = Date();
  const [expenseStartDate, setStartDate] = useState(dayjs(expenseStartDateVar));
  const [expenseEndDate, setEndDate] = useState(dayjs(expenseEndDateVar));
  const [openTable, setOpenTable] = useState(false);
  const [expenseRecords, setExpenseRecords] = useState({
    itemName: "",
    itemPrice: "",
    itemQuantity: "",
    boughtDate: "",
    itemCategory: "",
    remarks: "",
  });

  const handleCloseButton = async () => {
    setOpenTable(false);
    resetForm();
  };

  // Fetch data from the backend
  const fetchAllExpense = async (event) => {
    setOpenTable(true); //Will render the table

    event.preventDefault();

    // Validate the date fields
    if (!expenseStartDate || !expenseEndDate) {
      snackbar("error", "Please fill in both start and end dates.");
      return; // Stop the form submission if dates are missing
    }
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/v1/expenses/viewExpense`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            itemCategory: itemCategory,
            expenseStartDate: expenseStartDate.toISOString(),
            expenseEndDate: expenseEndDate.toISOString(),
          }),
        }
      );

      const data = await response.json();
      console.log(data);
      if (response.status == 200) {
        setExpenseRecords(data.expenseRecords);
        if (data.expenseRecords && data.expenseRecords.length > 0) {
          // console.log(data.message)
          snackbar("success", data.message);
          // resetForm();
        } else {
          snackbar("error", "No Expense records found.");
        }
      } else {
        console.log(data.error);
        snackbar("error", data.error);
      }
    } catch (error) {
      console.error("Error in fetching expense data", error);
    }
  };

  const resetForm = () => {
    setitemCategory("");
    setStartDate(dayjs(null));
    setEndDate(dayjs(null));
  };

  //Inputting data to the table itemName, itemPrice, itemQuantity, boughtDate, itemCategory, remarks
  const columns = useMemo(
    () => [
      {
        Header: "item",
        accessor: "itemName",
      },
      {
        Header: "item Price",
        accessor: "itemPrice",
      },
      {
        Header: "Buying Date",
        accessor: (row) => dayjs(row.boughtDate).format("YYYY-MM-DD"), // Format the date
      },
      {
        Header: "Quantity",
        accessor: "itemQuantity",
      },
      {
        Header: "Category",
        accessor: "itemCategory",
      },
      {
        Header: "Remarks",
        accessor: "remarks",
      },
    ],
    []
  );
  const expenseData = useMemo(
    () => (Array.isArray(expenseRecords) ? expenseRecords : []),
    [expenseRecords]
  );
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: expenseData });

  return (
    <div className="viewExpense-container baskervville-sc-regular">
      <h2>Viewing the expenses</h2>
      <div className="viewExpense-subcontainer">
        <div className="viewExpenseForm-box">
          <h2>Please fill below fields to view expenses</h2>
          <InputLabel
            id="demo-simple-select-label"
            sx={{
              fontWeight: 500,
              marginBottom: "5px",
              display: "block", // Ensures label is on top of select input
              textAlign: "left", // Align label to the left
            }}
          >
            Expense Category
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="ExpenseCategory"
            onChange={(e) => setitemCategory(e.target.value)}
            value={itemCategory || ""}
            sx={{
              width: "260px",
              marginBottom: "8px",
              fontWeight: "400",
              display: "block",
              textAlign: "left",
            }}
          >
            <MenuItem value={"Machine Parts"}>Machine Parts</MenuItem>
            <MenuItem value={"Office"}>Office</MenuItem>
            <MenuItem value={"Stationary"}>Stationary</MenuItem>
            <MenuItem value={"Kitchen"}>Kitchen</MenuItem>
            <MenuItem value={"Water"}>Water</MenuItem>
            <MenuItem value={"Fuel"}>Fuel</MenuItem>
            <MenuItem value={"others"}>others</MenuItem>
          </Select>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker", "DesktopDatePicker"]}>
              <div>
                <InputLabel
                  sx={{
                    fontWeight: 500,
                    marginBottom: "8px",
                    display: "block",
                  }}
                >
                  Start Date
                </InputLabel>
                <DemoItem>
                  <DesktopDatePicker
                    value={expenseStartDate}
                    required
                    onChange={(newValue) => setStartDate(newValue)}
                    sx={{
                      width: "260px",
                      marginBottom: "16px",
                    }}
                  />
                </DemoItem>
                <InputLabel
                  sx={{
                    fontWeight: 500,
                    marginBottom: "8px",
                    display: "block",
                  }}
                >
                  Start Date
                </InputLabel>
                <DemoItem>
                  <DesktopDatePicker
                    value={expenseEndDate}
                    required
                    onChange={(newValue) => setEndDate(newValue)}
                    sx={{
                      width: "260px",
                      marginBottom: "16px",
                    }}
                  />
                </DemoItem>
              </div>
            </DemoContainer>
          </LocalizationProvider>
          <Button
            variant="contained"
            sx={{
              marginTop: "20px",
              marginBottom: "20px",
            }}
            onClick={fetchAllExpense}
          >
            View Expenses
          </Button>
        </div>
        {/* Table */}
        {!openTable ? (
          <div className="emptyTable attendanceTable">
            <h2>Submit employee details to view attendance</h2>
          </div>
        ) : (
          <div className="attendanceTable">
            <h2>Actual employee details to view attendance</h2>
            <table
              {...getTableProps()}
              style={{
                border: "1px solid black",
                margin: "auto",
                width: "95%",
                fontFamily: "Arial, sans-serif",
              }}
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
                        style={{ border: "1px solid black", padding: "10px" }}
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
                          style={{
                            border: "1px solid black",
                            padding: "10px",
                            fontSize: "12px",
                          }}
                        >
                          {cell.render("Cell")}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <Button onClick={handleCloseButton}>Close</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpenseReport;

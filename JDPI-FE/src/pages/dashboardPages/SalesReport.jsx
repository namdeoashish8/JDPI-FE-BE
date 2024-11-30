import InputLabel from "@mui/material/InputLabel";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { useMemo, useState } from "react";
import { useTable } from "react-table";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Button } from "@mui/material";
import snackbar from "../../utility/snackbar";

const SalesReport = () => {
  let salesStartDateVar = Date();
  let salesEndDateVar = Date();
  const [salesStartDate, setStartDate] = useState(dayjs(salesStartDateVar));
  const [salesEndDate, setEndDate] = useState(dayjs(salesEndDateVar));
  const [minQuantity, setminQuantity] = useState("");
  const [openTable, setOpenTable] = useState(false);
  const [salesRecords, setSalesRecords] = useState({
    dispatchItem: "", dispatchDate: "", slipNumber: "", dispatchQuantity: "", custName: "", dispatchVehicleNum: "",
  });


  // Fetch data from the backend - Full modification required
  const fetchAllExpense = async (event) => {
    setOpenTable(true); //Will render the table

    event.preventDefault();

    // Validate the date fields
    if (!salesStartDate || !salesEndDate) {
      snackbar("error", "Please fill in both start and end dates.");
      return; // Stop the form submission if dates are missing
    }
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/v1/sales/get-Sales`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            minQuantity: minQuantity,
            salesStartDate: salesStartDate.toISOString(),
            salesEndDate: salesEndDate.toISOString(),
          }),
        }
      );

      const data = await response.json();
      console.log(data);
      if (response.status == 200) {
        setSalesRecords(data.salesRecords);
        if (data.salesRecords && data.salesRecords.length > 0) {
          // console.log(data.message)
          snackbar("success", data.message);
          // resetForm();
        } else {
          snackbar("error", "No Sales records found.");
        }
      } else {
        console.log(data.error);
        snackbar("error", data.error);
      }
    } catch (error) {
      console.error("Error in fetching sales data", error);
    }
  };

  const handleCloseButton = async () => {
    setOpenTable(false);
    resetForm();
  };

  const resetForm = () => {
    setminQuantity("");
    setStartDate(dayjs(null));
    setEndDate(dayjs(null));
  };

    //Inputting data to the table dispatchItem, dispatchDate, slipNumber, dispatchQuantity, custName, dispatchVehicleNum
    const columns = useMemo(
      () => [
        {
          Header: "Product",
          accessor: "dispatchItem",
        },
        {
          Header: "Dispatch Date",
          accessor: (row) => dayjs(row.dispatchDate).format("YYYY-MM-DD"), // Format the date
        },
        {
          Header: "Quantity",
          accessor: "dispatchQuantity",
        },
        {
          Header: "Customer Name",
          accessor: "custName",
        },
        {
          Header: "Slip Number",
          accessor: "slipNumber",
        },
        {
          Header: "Vehicle Number",
          accessor: "dispatchVehicleNum",
        },
      ],
      []
    );
    const salesData = useMemo(
      () => (Array.isArray(salesRecords) ? salesRecords : []),
      [salesRecords]
    );
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
      useTable({ columns, data: salesData });

  return (
    <div className="viewExpense-container baskervville-sc-regular">
      <h2>Viewing the expenses</h2>
      <div className="viewExpense-subcontainer">
        <div className="viewExpenseForm-box">
          <h2>Please fill below to view sales reports</h2>
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
                  Sales Start Date
                </InputLabel>
                <DemoItem>
                  <DesktopDatePicker
                    value={salesStartDate}
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
                  Sales End Date
                </InputLabel>
                <DemoItem>
                  <DesktopDatePicker
                    value={salesEndDate}
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
          <InputLabel
            id="demo-simple-select-label"
            sx={{
              fontWeight: 500,
              marginBottom: "5px",
              display: "block", // Ensures label is on top of select input
              textAlign: "left", // Align label to the left
            }}
          >
            Sales Minimum Quanity (in Sq.Ft)
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="ExpenseCategory"
            onChange={(e) => setminQuantity(e.target.value)}
            value={minQuantity || ""}
            sx={{
              width: "260px",
              marginBottom: "8px",
              fontWeight: "400",
              display: "block",
              textAlign: "left",
            }}
          >
            <MenuItem value={100}>100</MenuItem>
            <MenuItem value={200}>200</MenuItem>
            <MenuItem value={500}>500</MenuItem>
            <MenuItem value={800}>800</MenuItem>
            <MenuItem value={1000}>1000</MenuItem>
          </Select>
          <Button
            variant="contained"
            sx={{
              marginTop: "20px",
              marginBottom: "20px",
            }}
            onClick={fetchAllExpense}
          >
            View Sales
          </Button>
        </div>
        {/* Table */}
        {!openTable ? (
          <div className="emptyTable attendanceTable">
            <h2>Submit Filters to view Sales</h2>
          </div>
        ) : (
          <div className="attendanceTable">
            <h2>Sales are as below</h2>
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

export default SalesReport;

import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import snackbar from "../../utility/snackbar";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { useState } from "react";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

const DailyExpenselog = () => {
  // itemName, itemPrice, itemQuantity, boughtDate, itemCategory, remarks
  let boughtDateVar = Date();
  const [boughtDate, setBoughtDate] = useState(dayjs(boughtDateVar));
  const [itemName, setItemName] = useState();
  const [itemPrice, setItemPrice] = useState();
  const [itemQuantity, setItemQuantity] = useState();
  const [itemCategory, setItemCategory] = useState();
  const [remarks, setRemarks] = useState();

  const resetForm = () => {
    setItemPrice("");
    setItemName("");
    setBoughtDate(dayjs());
    setItemQuantity("");
    setItemCategory("");
    setRemarks("");
  };


  const submitExpense = async () => {
    console.log(
      itemName,
      itemPrice,
      itemQuantity,
      boughtDate,
      itemCategory,
      remarks
    );

    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/api/v1/expenses/addExpense`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          itemName,
          itemPrice,
          itemQuantity,
          boughtDate: boughtDate.format("YYYY-MM-DD"),
          itemCategory,
          remarks,
        }),
      }
    );
    const data = await response.json();
    console.log(data);
    if (response.status == 200) {
      snackbar("success", data.message);
      resetForm();
    } else {
      console.log(data.error);
      snackbar("error", data.error);
    }
  };

  return (
    <div className="expenseform-container baskervville-sc-regular">
      <h2>Fill in below details to add the todays expenenditure</h2>
      <div className="expenseform-subContainer">
        <div className="expenseform-subContainer2">
          <div className="expense-textFields">
            <TextField
              id="standard-basic"
              label="Item Name"
              variant="outlined"
              type="String"
              sx={{ width: "280px", marginBottom: "8px" }}
              required
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
            <TextField
              id="standard-basic"
              label="Item Price"
              variant="outlined"
              sx={{ width: "280px", marginBottom: "8px" }}
              type="Number"
              required
              value={itemPrice}
              onChange={(e) => setItemPrice(e.target.value)}
            />
            <TextField
              id="standard-basic"
              label="Item Quantity"
              variant="outlined"
              sx={{ width: "280px", marginBottom: "8px" }}
              type="Number"
              required
              fullWidth
              value={itemQuantity}
              onChange={(e) => setItemQuantity(e.target.value)}
            />
          </div>
          <div className="expense-dateCat">
            <InputLabel id="demo-simple-select-label">Item Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="ItemCategory"
              // onChange={handleItemCategory}
              onChange={(e) => setItemCategory(e.target.value)}
              value={itemCategory}
              sx={{ width: "280px", marginBottom: "8px" }}
            >
              <MenuItem value={"Machine Parts"}>Machine Parts</MenuItem>
              <MenuItem value={"Office"}>Office</MenuItem>
              <MenuItem value={"Stationary"}>Stationary</MenuItem>
              <MenuItem value={"Kitchen"}>Kitchen</MenuItem>
              <MenuItem value={"Water"}>Water</MenuItem>
              <MenuItem value={"Fuel"}>Fuel</MenuItem>
              <MenuItem value={"others"}>others</MenuItem>
            </Select>
            <div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker", "DesktopDatePicker"]}>
                  <div>
                    <DemoItem label="Date of item purchase or Expense">
                      <DesktopDatePicker
                        value={boughtDate}
                        onChange={(newValue) => setBoughtDate(newValue)}
                      />
                    </DemoItem>
                  </div>
                </DemoContainer>
              </LocalizationProvider>
            </div>
          </div>
        </div>
        <TextField
          id="standard-basic"
          label="Remarks (upto 20 words)"
          variant="standard"
          type="String"
          sx={{ width: "280px", marginBottom: "15px" }}
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
        />
        <Button
          variant="contained"
          sx={{
            padding: "5px",
            marginTop: "8px",
            width: "200px",
          }}
          onClick={submitExpense}
        >
          {" "}
          Submit
        </Button>
      </div>
    </div>
  );
};

export default DailyExpenselog;

import { useState } from "react";
import {
  Button,
  Box,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  FormHelperText,
} from "@mui/material";
const Inventory = () => {
  const [inventory, setInventory] = useState({
    itemName: "",
    itemCategory: "",
    itemQuantity: "",
    itemMeasurement:"",
    inventoryAddDate:"",
    remarks: "",
  });

  const handleSubmit = () => {};
  const handleInventoryData = (e) => {
    const { name, value } = e.target;
    setInventory({ ...inventory, [name]: value });
  };
  return (
    <div className="inventory-container">
      <h2 className="baskervville-sc-regular">ADD/Update Inventory</h2>
      <div className="inventory-form">
        <Box
          className="inventory-fields"
          component="form"
          noValidate
          autoComplete="off"
        >
          <TextField
            id="itemName"
            required
            sx={{ width: "280px", marginBottom: "8px" }}
            label="Item Name"
            name="itemName"
            value={inventory.itemName}
            onChange={handleInventoryData}
          />
          <FormControl>
            <InputLabel id="demo-simple-select-helper-label">
              Item Category
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="itemCategory"
              name="itemCategory"
              sx={{ width: "280px", marginBottom: "8px" }}
              value={inventory.itemCategory}
              onChange={handleInventoryData}
              label="Item Category"
            >
              <MenuItem value="Machine">Machine</MenuItem>
              <MenuItem value="Parts">Parts</MenuItem>
              <MenuItem value="Office">Office</MenuItem>
              <MenuItem value="Stationary">Stationary</MenuItem>
              <MenuItem value="Tools">Tools</MenuItem>
              <MenuItem value="Kitchen">Kitchen</MenuItem>
              <MenuItem value="Water">Water</MenuItem>
              <MenuItem value="Fuel">Fuel</MenuItem>
              <MenuItem value="Others">Others</MenuItem>
            </Select>
            <FormHelperText>Please select your Item category</FormHelperText>
          </FormControl>
          <TextField
            id="itemQuantity"
            required
            sx={{ width: "280px", marginBottom: "8px" }}
            name="itemQuantity"
            label="Item Quantity"
            value={inventory.itemQuantity}
            onChange={handleInventoryData}
          />
          <TextField
            id="itemMeasurement"
            required
            sx={{ width: "280px", marginBottom: "8px" }}
            name="itemMeasurement"
            label="Item Measurement"
            value={inventory.itemMeasurement}
            onChange={handleInventoryData}
          />
          <TextField
            id="inventoryAddDate"
            required
            sx={{ width: "280px", marginBottom: "8px" }}
            name="inventoryAddDate"
            label="Item Add date"
            value={inventory.inventoryAddDate}
            onChange={handleInventoryData}
          />
          <TextField
            id="remarks"
            required
            sx={{ width: "280px", marginBottom: "8px" }}
            name="remarks"
            label="Remarks"
            value={inventory.remarks}
            onChange={handleInventoryData}
          />
        </Box>
        <div className="buttons-container">
          {/* <Button variant="contained" color="secondary"></Button> */}
          <Button
            variant="contained"
            sx={{
              marginTop: "20px",
              marginBottom: "20px",
            }}
            onClick={handleSubmit}
          >
            Add Inventory
          </Button>
        </div>
      </div>
    </div>
  );
};
export default Inventory;

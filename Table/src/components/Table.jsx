import React, { useState } from "react";
import "./Table.css";

const Table = () => {
  const label1Options = ["Option", "Option", "Option","Option","Option"];
  const label2Options = ["Option1", "Option2", "Option Z"];

  const [rows, setRows] = useState([
    { label1: "", label2: [[]] }, // Each row starts with a single dropdown for label2
  ]);

  // Handle single selection for Label 1
  const handleLabel1Change = (rowIndex, value) => {
    const updatedRows = [...rows];
    updatedRows[rowIndex].label1 = value;
    setRows(updatedRows);
  };

  // Handle multiple selection for Label 2
  const handleLabel2Change = (rowIndex, dropdownIndex, value) => {
    const updatedRows = [...rows];
    const label2Selections = updatedRows[rowIndex].label2[dropdownIndex];
    if (label2Selections.includes(value)) {
      updatedRows[rowIndex].label2[dropdownIndex] = label2Selections.filter(
        (item) => item !== value
      );
    } else {
      updatedRows[rowIndex].label2[dropdownIndex] = [...label2Selections, value];
    }
    setRows(updatedRows);
  };

  // Add new row to the table
  const addNewRow = () => {
    setRows([...rows, { label1: "", label2: [[]] }]);
  };

  // Add new dropdown in Label 2 for a specific row
  const addLabel2Dropdown = (rowIndex) => {
    const updatedRows = [...rows];
    updatedRows[rowIndex].label2.push([]);
    setRows(updatedRows);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Label 1</th>
            <th>Label 2</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {/* Single-select dropdown for Label 1 */}
              <td>
                <select
                  value={row.label1}
                  onChange={(e) => handleLabel1Change(rowIndex, e.target.value)}
                >
                  <option value="" disabled>
                    Select Label 1
                  </option>
                  {label1Options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </td>

              {/* Multiple-select dropdowns for Label 2 */}
              <td>
                {row.label2.map((selections, dropdownIndex) => (
                  <div key={dropdownIndex} style={{ marginBottom: "8px" }}>
                    <div className="dropdown">
                      <button className="dropdown-btn ">
                        {selections.length > 0
                          ? `Selected: ${selections.join(", ")}`
                          : "Select Label 2"}
                      </button>
                      <div className="dropdown-content">
                        {label2Options.map((option) => (
                          <label key={option}>
                            <input
                              type="checkbox"
                              checked={selections.includes(option)}
                              onChange={() =>
                                handleLabel2Change(rowIndex, dropdownIndex, option)
                              }
                            />
                            {option}
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
                {/* +Add button to add another Label 2 dropdown */}
                <button onClick={() => addLabel2Dropdown(rowIndex)}>+Add</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Button to add new row */}
      <button onClick={addNewRow} style={{ marginTop: "16px" }}>
        AddNewRow
      </button>
    </div>
  );
};

export default Table;

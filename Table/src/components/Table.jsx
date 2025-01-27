import React, { useState } from "react";
import "./Table.css";

const Table = () => {
  const [label1Options] = useState(["Option", "Option", "Option", "Option", "Option"]);
  const [label2Options, setLabel2Options] = useState([
    "Option1",
    "Option2",
    "Option3",
    "Option4",
    "Option5",
  ]);
  const [newOption, setNewOption] = useState("");

  const [rows, setRows] = useState([
    { label1: "", label2: [[]] },
  ]);

  const handleLabel1Change = (rowIndex, value) => {
    const updatedRows = [...rows];
    updatedRows[rowIndex].label1 = value;
    setRows(updatedRows);
  };

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

  const addNewRow = () => {
    setRows([...rows, { label1: "", label2: [[]] }]);
  };

  const addLabel2Dropdown = (rowIndex) => {
    const updatedRows = [...rows];
    updatedRows[rowIndex].label2.push([]);
    setRows(updatedRows);
  };

  const handleAddOption = () => {
    if (newOption.trim() !== "" && !label2Options.includes(newOption)) {
      setLabel2Options([...label2Options, newOption]);
      setNewOption("");
    }
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
              <td>
                <select
                  value={row.label1}
                  onChange={(e) => handleLabel1Change(rowIndex, e.target.value)}
                >
                  <option value="" disabled>
                    Selected Option
                  </option>
                  {label1Options.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                {row.label2.map((selections, dropdownIndex) => (
                  <div key={dropdownIndex} style={{ marginBottom: "8px" }}>
                    <div className="dropdown">
                      <button className="dropdown-btn">
                        {selections.length > 0
                          ? `Selected: ${selections.join(", ")}`
                          : "Selected Options"}
                      </button>
                      <div className="dropdown-content">
                        {[
                          ...selections,
                          ...label2Options.filter((option) => !selections.includes(option)),
                        ].map((option) => (
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
                <div style={{ alignItems: "center" }}>
                  <input
                    type="text"
                    value={newOption}
                    onChange={(e) => setNewOption(e.target.value)}
                    placeholder="Add new item"
                    style={{ marginRight: "5px" }}
                  />
                  <button
                    onClick={handleAddOption}
                    style={{
                      backgroundColor: "black",
                      color: "white",
                      marginLeft: "5px",borderRadius:"5px",padding:"2px"
                    }}
                  >
                    + Add
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={addNewRow}
        style={{
          marginTop: "16px",
          marginLeft: "980px",
          backgroundColor: "black",
          color: "white",borderRadius:"5px",padding:"2px",width:"120px"
        }}
      >
        + Add New Row
      </button>
    </div>
  );
};

export default Table;

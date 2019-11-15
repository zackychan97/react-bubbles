import React, { useState } from "react";
import axios from "axios";

//import util
import axiosWithAuth from '../utils/AxiosWithAuth'
import AxiosWithAuth from "../utils/AxiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
console.log(updateColors)


  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = color => {
    console.log(color)
    setEditing(true);
    setColorToEdit(color);
  };


  const saveEdit = e => {
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    e.preventDefault();
    console.log(e)
    AxiosWithAuth()
      .put(`/api/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        console.log(res)
        let newArray = colors.filter(color => color.id !== res.data.id)
        updateColors([...newArray, res.data])
        setEditing(false)
      })
      .catch(err => console.log(err.response))  
  };

  const deleteColor = color => {
    // make a delete request to delete this color

    console.log(color)

    AxiosWithAuth()
      .delete(`api/colors/${color.id}`)
      .then (deleteColor => {
        console.log(deleteColor)
        updateColors(color.filter(colorItem.id !== color.id))
        setEditing(false)
      })
      .catch(err => console.log(`There was an error deleting.`, err))
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={() => deleteColor(color)}>
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;

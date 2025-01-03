import React from "react";
import "./ListItem.css";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ListItem = ({ list_id, list_number, current_container, name, description, setListItems, setListItems2, setListItemsIn3, showThirdList, showArrows }) => {

  const handleAddListItemsTo3Container = (curr_container, move) => {
    if (showThirdList === false) {
      return;
    }

    if (curr_container === 1 && move === "move_right") {
      setListItems((prevListItems) => prevListItems.filter(item => item.id !== list_id));
      setListItemsIn3((prevListItemsIn3) => [{ id: list_id, current_container: 3, list_number, name, description }, ...prevListItemsIn3]);
      return;
    }
    if (curr_container === 3 && move === "move_right") {
      setListItemsIn3((prevListItemsIn3) => prevListItemsIn3.filter(item => item.id !== list_id));
      setListItems2((prevListItemsIn2) => [{ id: list_id, current_container: 2, list_number, name, description }, ...prevListItemsIn2]);
      return;
    }
    if (curr_container === 2 && move === "move_left") {
      setListItems2((prevListItemsIn2) => prevListItemsIn2.filter(item => item.id !== list_id));
      setListItemsIn3((prevListItemsIn3) => [{ id: list_id, current_container: 3, list_number, name, description }, ...prevListItemsIn3]);
      return;
    }
    if (curr_container === 3 && move === "move_left") {
      setListItemsIn3((prevListItemsIn3) => prevListItemsIn3.filter(item => item.id !== list_id));
      setListItems((prevListItemsIn1) => [{ id: list_id, current_container: 1, list_number, name, description }, ...prevListItemsIn1]);
      return;
    }
  }

  return (
    <div className={`list_item ${list_number === 2 ? 'reverse' : ''}`}>
      {showArrows && current_container === 2 && (
        <div className="arrow left-arrow" onClick={() => {
          handleAddListItemsTo3Container(current_container, "move_left");
        }}>
          <ArrowBackIcon className="arrow-icon" style={{ fontSize: '16px' }} />
        </div>
      )}

      <div className="item_info">
        <span>{name}</span>
        <span>{description}</span>
      </div>

      {showArrows && current_container === 1 && (
        <div className="arrow right-arrow" onClick={() => {
          handleAddListItemsTo3Container(current_container, "move_right");
        }}>
          <ArrowForwardIcon className="arrow-icon" style={{ fontSize: '16px' }} />
        </div>
      )}

      {showArrows && current_container === 3 && (
        <div className="both-arrows">
          <div className="arrow left-arrow" onClick={() => { handleAddListItemsTo3Container(current_container, "move_left"); }}>
            <ArrowBackIcon className="arrow-icon" style={{ fontSize: '16px' }} />
          </div>
          <div className="arrow right-arrow" onClick={() => {
            handleAddListItemsTo3Container(current_container, "move_right");
          }}>
            <ArrowForwardIcon className="arrow-icon" style={{ fontSize: '16px' }} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ListItem;
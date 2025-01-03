import React from "react";
import "./ListContainer.css";
import ListItem from "../ListItem/ListItem";

const ListContainer = ({ listItems, listNumber, isListItemChecked, setIsListItemChecked, setListItems, setListItems2, setListItemsIn3, showThirdList, showArrows }) => {

  const handleCheckboxChange = () => {
    setIsListItemChecked(!isListItemChecked);
  };

  return (
    <div className="list_container">
      <div className="list_header">
        <input
          type="checkbox"
          name="list"
          checked={isListItemChecked}
          onChange={handleCheckboxChange}
        />
        <span>{`list ${listNumber}  (${listItems.length})`}</span>
      </div>
      <div className="list_items">
        {listItems.map((eachItem) => (
          <ListItem key={eachItem.id} list_id={eachItem.id} current_container={eachItem.current_container} list_number={eachItem.list_number} name={eachItem.name} description={eachItem.description} setListItems={setListItems} setListItems2={setListItems2} setListItemsIn3={setListItemsIn3} showThirdList={showThirdList} showArrows={showArrows} />
        ))}
      </div>
    </div>
  );
};

export default ListContainer;
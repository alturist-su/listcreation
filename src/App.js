import React, { Fragment, useEffect, useState } from "react";
import "./App.css";
import ListContainer from "./component/ListContainer/ListContainer";
import FailedView from "./component/FailedView/FailedView";

const API_URL = "https://apis.ccbp.in/list-creation/lists";

function App() {
  const [listItems, setListItems] = useState([]);
  const [listItems2, setListItems2] = useState([]);
  const [listItemsIn3, setListItemsIn3] = useState([]);

  const [loading, setLoading] = useState(false);
  const [originalListItems, setOriginalListItems] = useState([]);
  const [originalListItems2, setOriginalListItems2] = useState([]);
  const [originalListItemsIn3, setOriginalListItemsIn3] = useState([]);
  const [showAllLists, setShowAllLists] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchListItems = async () => {
      const response = await fetch(API_URL);

      if (!response.ok) {
        setLoading(false);
        return;
      }

      const data = await response.json();
      const lists = data.lists;

      const list1 = [];
      const list2 = [];

      if (Array.isArray(lists)) {
        lists.forEach((item) => {
          if (item.list_number === 1) {
            item.current_container = 1;
            list1.push(item);
          } else if (item.list_number === 2) {
            item.current_container = 2;
            list2.push(item);
          }
        });
      }
      setListItems(list1);
      setListItems2(list2);
      setOriginalListItems(list1);
      setOriginalListItems2(list2);

      setLoading(false);
    };
    fetchListItems();
  }, []);

  const [showThirdList, setShowThirdList] = useState(false);
  const [isListItem1Checked, setIsListItem1Checked] = useState(false);
  const [isListItem2Checked, setIsListItem2Checked] = useState(false);
  const [showFailedView, setShowFailedView] = useState(false);
  const [showArrows, setShowArrows] = useState(false);

  const handleCreateNewList = () => {
    if (isListItem1Checked && isListItem2Checked) {
      setShowThirdList(true);
      setShowAllLists(false);
      setShowArrows(true);
    } else {
      setShowFailedView(true);
    }
  };

  const handleCancel = () => {
    setListItems(originalListItems);
    setListItems2(originalListItems2);
    setListItemsIn3(originalListItemsIn3);
    setShowThirdList(false);
    setShowAllLists(true);
    setShowArrows(false);
    setIsListItem1Checked(false);
    setIsListItem2Checked(false);
  };

  const handleUpdate = () => {
    setOriginalListItems(listItems);
    setOriginalListItems2(listItems2);
    setOriginalListItemsIn3(listItemsIn3);
    setShowThirdList(true);
    setShowAllLists(true);
    setShowArrows(false);
    setIsListItem1Checked(false);
    setIsListItem2Checked(false);
  };

  return (
    <div className="app">
      {loading ? (
        <div className="loader">
          <img
            className="icon"
            src="https://cdn.pixabay.com/animation/2022/11/04/09/42/09-42-03-510_512.gif"
            alt="Loading"
          />
        </div>
      ) : (
        <Fragment>
          <div className="app_header">
            <h1>List Creation</h1>
            {showAllLists ? (
              <button className="button" onClick={handleCreateNewList}>
                Create a New List
              </button>
            ) : (
              <>
                <button className="button" onClick={handleUpdate}>
                  Update
                </button>
                <button className="button" onClick={handleCancel}>
                  Cancel
                </button>
              </>
            )}
          </div>
          <div className={`parent-list-container ${showFailedView ? 'center-failed-view' : ''}`}>
            {showFailedView ? (
              <FailedView setShowFailedView={setShowFailedView} />
            ) : (
              <>
                <ListContainer
                  listItems={listItems}
                  listNumber={1}
                  isListItemChecked={isListItem1Checked}
                  setIsListItemChecked={setIsListItem1Checked}
                  setListItems={setListItems}
                  listItems2={listItems2}
                  setListItems2={setListItems2}
                  setListItemsIn3={setListItemsIn3}
                  showThirdList={showThirdList}
                  showArrows={showArrows}
                />
                {showThirdList && (
                  <ListContainer
                    listItems={listItemsIn3}
                    listNumber={3}
                    listItems2={listItems2}
                    setListItems={setListItems}
                    setListItems2={setListItems2}
                    setListItemsIn3={setListItemsIn3}
                    showArrows={showArrows}

                  />
                )}
                <ListContainer
                  listItems={listItems2}
                  listNumber={2}
                  isListItemChecked={isListItem2Checked}
                  setIsListItemChecked={setIsListItem2Checked}
                  listItems2={listItems2}
                  setListItems={setListItems}
                  setListItems2={setListItems2}
                  setListItemsIn3={setListItemsIn3}
                  showThirdList={showThirdList}
                  showArrows={showArrows}

                />
              </>
            )}
          </div>
        </Fragment>
      )}
    </div>
  );
}

export default App;
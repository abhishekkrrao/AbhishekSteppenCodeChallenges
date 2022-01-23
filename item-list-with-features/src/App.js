import { ItemList } from "./ItemList.jsx"
import { v4 as uuidv4 } from 'uuid';
import React from 'react';
import "bulma/css/bulma.min.css"
import "./App.css";
const initialList = [];
const listReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return {
        ...state,
        list: state.list.concat({ name: action.name, id: action.id }),
      };
    default:
      throw new Error();
  }
};
function App() {
  return (
    <section className="section">
      <AddItems></AddItems>
    </section>
  )
}

export default App;

function useRunAfterUpdate() {
  const afterPaintRef = React.useRef(null);
  React.useLayoutEffect(() => {
    if (afterPaintRef.current) {
      afterPaintRef.current();
      afterPaintRef.current = null;
    }
  });
  const runAfterUpdate = fn => (afterPaintRef.current = fn);
  return runAfterUpdate;
}

function filterOut(text, cursor) {
  const beforeCursor = text.slice(0, cursor);
  const afterCursor = text.slice(cursor, text.length);

  const filterdBeforeCursor = strip(beforeCursor);
  const filterAfterCursor = strip(afterCursor);

  const newText = filterdBeforeCursor + filterAfterCursor;
  const newCursor = filterdBeforeCursor.length;

  return [newText, newCursor];
}


function AddItems() {

  const [listData, dispatchListData] = React.useReducer(listReducer, {
    list: initialList,
    isShowList: true,
  });


  const [name, setName] = React.useState("");

  const runAfterUpdate = useRunAfterUpdate();

  const handleNameChange = evt => {
    debugger;
    const input = evt.target;
    const text = input.value;
    console.log("text",text)
    if (text === "") {
      return;
    }
    const cursor = input.selectionStart;

    const [newName, newCursor] = filterOut(text, cursor);

    setName(newName);

    runAfterUpdate(() => {
      input.selectionStart = newCursor;
      input.selectionEnd = newCursor;
    });
  };
  function onAdd() {
    dispatchListData({ type: 'ADD_ITEM', name, id: uuidv4() });
    setName('');
  }

  return (
    <div>
      <input
        style={{ height: 48, width: 300 }}
        placeholder="Enter Item"
        value={name}
        onChange={handleNameChange}
      />
      <button style={{ width: 120, background: "#000", color: "#FFF", height: 38, padding: 5, borderRadius: 25, marginLeft: 20 }} type="button" onClick={onAdd}>
        Add
      </button>
      {listData.list.length == 0 && <div>{"No item in list !!!"}</div>}
      <ItemList data={listData.list} />
    </div>
  );
}
const strip = value => value.replace(/[^a-zA-Z\s]/g, "");

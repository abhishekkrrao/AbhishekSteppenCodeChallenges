import { useEffect, useState } from "react";

export const TwoPaneList = ({ data }) => {

  const [items, setItems] = useState([]);

  const onContentClick = (objItem) => {
    let index = data.indexOf(objItem);
    let u = data.map((el, pos) => {
      if (pos === index && el.isChecked === false) {
        data[pos].isChecked = true;
      } else if (pos === index && el.isChecked === true) {
        data[pos].isChecked = false;
      } else {
        data[pos].isChecked = false;
      }
      return el;
    });
    setItems(u);
  }
  useEffect(() => {
    setItems(data);
  }, [data]);

  return (
    <ul>
      {items.map((item, index) => (
        <div
          key={index.toString()}
          style={{ flex: 1, display: "flex", flexDirection: "row" }}
          className="containerPane">
          <li
            className="leftPaneStyle"
            onClick={() => { onContentClick(item) }}
            style={{ width: 300, height: "auto", padding: 5, background: "#e7e7e7", borderRadius: 5, marginTop: 10 }}
            key={index.toString()}>
            {item.title}
          </li>
          <div
            style={{ display: "flex", flexDirection: "column", flex: 1 }}
            className="mRightPane">
            <div>
              {item.isChecked.toString()}
            </div>
            {item.isChecked && item.content.map((subContent, pos) => (<p
              style={{ marginTop: 5, background: "#CCC", marginLeft: 10, borderRadius: 6, padding: 10 }}
              className="rightPaneStyle"
              key={pos.toString()}>{subContent}</p>)
            )}
          </div>
        </div>

      ))}
    </ul>
  );
}


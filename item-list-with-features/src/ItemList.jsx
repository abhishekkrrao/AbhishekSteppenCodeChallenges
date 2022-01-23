import { useEffect, useState } from "react";

export const ItemList = ({ data }) => {

  const [items, setItems] = useState([]);
  const onContentClick = (objItem) => {
    let l = data;
    let index = l.indexOf(objItem);
    if (index > -1) {
      l.splice(index, 1);
    }
    console.log(l);
    setItems(l);
  }

  useEffect(() => { setItems(data) }, [data]);
  return (
    <ul>
      {items.map((item, index) => (
        <div
          key={index.toString()}
          style={{ flex: 1, flexDirection: "row", display: "flex" }}>
          <li
            key={index.toString()}
            style={{ flex: 0.3, height: "auto", padding: 5, background: "#e7e7e7", borderRadius: 5, marginTop: 10 }}
            key={item.id}>
            {item.name}
          </li>
          <p
            key={index.toString()}
            onClick={() => { onContentClick(item) }}
            style={{
              flex: 0.2, background: "#CCC",
              height: 38, borderRadius: 25, display: "flex", justifyContent: "center",
              textAlign: "center", marginLeft: 5, marginTop: 10, alignItems: "center"
            }}>
            Remove Item
          </p>
        </div>
      ))}
    </ul>
  );
}

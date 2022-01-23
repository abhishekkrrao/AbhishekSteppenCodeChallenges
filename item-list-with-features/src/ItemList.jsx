export const ItemList = ({ data }) => {
  return (
    <ul>
      {data.map((item) => (
        <li style={{ width: 300, height: "auto", padding: 5, background: "#e7e7e7", borderRadius: 5, marginTop: 10 }} key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}

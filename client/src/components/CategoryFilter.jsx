const CATEGORIES = ["All", "Electronics", "Clothing", "Books", "Food", "Sports", "Toys"];

const CategoryFilter = ({ selected, onSelect }) => {
  return (
    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", margin: "20px 0" }}>
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat === "All" ? "" : cat)}
          style={{
            padding: "8px 16px",
            borderRadius: "20px",
            border: "none",
            cursor: "pointer",
            backgroundColor: selected === (cat === "All" ? "" : cat) ? "#000" : "#eee",
            color: selected === (cat === "All" ? "" : cat) ? "#fff" : "#000",
          }}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
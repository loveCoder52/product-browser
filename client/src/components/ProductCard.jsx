const ProductCard = ({ product }) => {
  return (
    <div style={{
      border: "1px solid #eee",
      borderRadius: "10px",
      padding: "16px",
      display: "flex",
      flexDirection: "column",
      gap: "8px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
    }}>
      <h3 style={{ margin: 0, fontSize: "16px" }}>{product.name}</h3>
      <span style={{
        backgroundColor: "#f0f0f0",
        padding: "4px 10px",
        borderRadius: "12px",
        fontSize: "12px",
        width: "fit-content"
      }}>
        {product.category}
      </span>
      <p style={{ margin: 0, fontWeight: "bold", fontSize: "18px" }}>
        ₹{product.price.toLocaleString()}
      </p>
    </div>
  );
};

export default ProductCard;
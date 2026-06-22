import { useState } from "react";
import useProducts from "./hooks/useProducts";
import CategoryFilter from "./components/CategoryFilter";
import ProductCard from "./components/ProductCard";

const App = () => {
  const [category, setCategory] = useState("");
  const { products, loading, error, hasNextPage, loadMore } = useProducts(category);

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>

      <h1>🛍️ Products</h1>

      <CategoryFilter selected={category} onSelect={setCategory} />

      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Products Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        gap: "16px",
        marginTop: "20px"
      }}>
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      {/* Loading */}
      {loading && <p style={{ textAlign: "center", margin: "20px 0" }}>⏳ Loading...</p>}

      {/* Load More Button */}
      {hasNextPage && !loading && (
        <div style={{ textAlign: "center", margin: "30px 0" }}>
          <button
            onClick={loadMore}
            style={{
              padding: "12px 32px",
              fontSize: "16px",
              borderRadius: "8px",
              border: "none",
              backgroundColor: "#000",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            Load More
          </button>
        </div>
      )}

      {/* No more products */}
      {!hasNextPage && !loading && products.length > 0 && (
        <p style={{ textAlign: "center", color: "#999", margin: "20px 0" }}>
          ✅ All products loaded
        </p>
      )}

    </div>
  );
};

export default App;
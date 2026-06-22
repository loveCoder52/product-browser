import { useState, useEffect, useCallback } from "react";
import { fetchProducts } from "../api/product.api";

const useProducts = (category) => {
  const [products, setProducts]       = useState([]);
  const [cursor, setCursor]           = useState(null);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [loading, setLoading]         = useState(false);
  const [error, setError]             = useState(null);

  // ✅ Jab category change ho — reset sab kuch
  useEffect(() => {
    setProducts([]);
    setCursor(null);
    setHasNextPage(false);
    loadProducts(null, true);
  }, [category]);

  const loadProducts = useCallback(async (currentCursor, reset = false) => {
    try {
      setLoading(true);
      setError(null);

      const data = await fetchProducts({
        category,
        cursor: currentCursor,
      });

      setProducts((prev) => reset ? data.data : [...prev, ...data.data]);
      setCursor(data.nextCursor);
      setHasNextPage(data.hasNextPage);

    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [category]);

  // ✅ Load more — next page
  const loadMore = () => {
    if (!loading && hasNextPage) {
      loadProducts(cursor);
    }
  };

  return { products, loading, error, hasNextPage, loadMore };
};

export default useProducts;
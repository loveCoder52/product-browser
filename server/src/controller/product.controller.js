import Product from "../model/product.model.js";

export const getProducts = async (req, res) => {
  try {
    const { category, cursor, limit = 20 } = req.query;

    const pageLimit = parseInt(limit);

    // ✅ Build filter
    const filter = {};

    // Category filter
    if (category) {
      filter.category = category;
    }

    // Cursor filter — fetch products older than last seen createdAt
    if (cursor) {
      filter.createdAt = { $lt: new Date(cursor) };
    }

    // ✅ Fetch products newest first
    const products = await Product.find(filter)
      .sort({ createdAt: -1 })
      .limit(pageLimit + 1) // fetch one extra to check if next page exists
      .lean();               // faster than full mongoose objects

    // ✅ Check if there's a next page
    const hasNextPage = products.length > pageLimit;

    // Remove the extra product we fetched
    if (hasNextPage) {
      products.pop();
    }

    // ✅ Next cursor = createdAt of last product in current page
    const nextCursor =
      hasNextPage ? products[products.length - 1].createdAt : null;

    res.status(200).json({
      success: true,
      count: products.length,
      hasNextPage,
      nextCursor,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
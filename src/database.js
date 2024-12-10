import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
}).promise();

// Get all categories
export async function getCategories() {
  const [rows] = await pool.query("SELECT * FROM categories");
  return rows;
}

// Get category by ID
export async function getCategoryById(id) {
  const [rows] = await pool.query("SELECT * FROM categories WHERE categoryID = ?", [id]);
  return rows[0];
}

// Create category
export async function createCategory(categoryName) {
  const [result] = await pool.query("INSERT INTO categories (categoryName) VALUES (?)", [categoryName]);
  const id = result.insertId;
  return getCategoryById(id);
}

// Get all products
export async function getProducts() {
  const [rows] = await pool.query("SELECT c.categoryName, p.productID, p.productName, p.unitPrice, p.unitValue, p.unitOfMeasurement FROM categories c RIGHT JOIN products p ON c.categoryID = p.categoryID ORDER BY c.categoryName, p.productName;");
  return rows;
}

// Get product by ID
export async function getProductById(id) {
  const [rows] = await pool.query("SELECT * FROM products WHERE productID = ?", [id]);
  return rows[0];
}

// Create category
export async function createProduct(productName, categoryID, unitPrice, unitValue, unitOfMeasurement) {
  const [result] = await pool.query("INSERT INTO products (productName, categoryID, unitPrice, unitValue, unitOfMeasurement) VALUES (?, ?, ?, ?, ?)", [productName, categoryID, unitPrice, unitValue, unitOfMeasurement]);
  const id = result.insertId;
  return getProductById(id);
}

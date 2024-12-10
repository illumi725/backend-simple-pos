import express from "express";
import dotenv from "dotenv";
import { getCategories, getCategoryById, createCategory, createProduct, getProducts, getProductById } from "./database.js";

dotenv.config();

const app = express();

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || '5001';

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Success!');
});

app.get("/categories", async (req, res) => {
  const categories = await getCategories();
  res.send(categories);
})

app.get("/categories/:id", async (req, res) => {
  const id = req.params.id;
  const category = await getCategoryById(id);
  res.send(category);
})

app.post("/categories", async (req, res) => {
  const {categoryName} = req.body;
  const category = await createCategory(categoryName);
  res.status(201).send(category);
})

app.get("/products", async (req, res) => {
  const products = await getProducts();
  res.send(products);
})

app.get("/products/:id", async (req, res) => {
  const id = req.params.id;
  const product = await getProductById(id);
  res.send(product);
})

app.post("/products", async (req, res) => {
  const {productName, categoryID, unitPrice, unitValue, unitOfMeasurement} = req.body;
  const productDetails = await createProduct(productName, categoryID, unitPrice, unitValue, unitOfMeasurement);
  res.status(201).send(productDetails)
})

app.use((err, req, res, next)=> {
  console.error(err.stack)
  res.status(500).send('Oops! Something went wrong!');
})

// app.listen(PORT, HOST, ()=>{
//   console.log(`Server runng on http://${HOST}:${PORT}`);
// })

app.listen(PORT, () => {
  console.log(`Server runng on ${PORT}`);
})

// export default app();
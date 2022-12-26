const Product = require("../models/product")

const getProducts = async (req, res) => {
  const products = await Product.find()
  res.status(200).json({ ok: true, data: products })
}
const createProduct = async (req, res) => {
  await Product.create({ ...req.body, createdBy: req.user._id })
  res.status(201).json({ ok: true })
}
const editProduct = async (req, res) => {
  const { id } = req.params
  await Product.findByIdAndUpdate(id, req.body)
  res.status(200).json({ ok: true })
}
const annulProduct = async (req, res) => {
  const { id } = req.params
  await Product.findByIdAndUpdate(id, {
    annulled: true,
    annulledBy: req.user._id,
  })
  res.status(200).json({ ok: true })
}

module.exports = { getProducts, createProduct, editProduct, annulProduct }

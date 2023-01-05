const Product = require('../models/product')
const updateBlob = require('../helpers/updateBlob')

const getProducts = async (req, res) => {
  const products = await Product.find()
  res.status(200).json({ ok: true, data: products })
}
const createProduct = async (req, res) => {
  const productInfo = JSON.parse(req.body.data)

  const createdProduct = await Product.create({
    ...productInfo,
    createdBy: req.user._id,
  })

  if (req.file) {
    const blobName = await updateBlob({
      buffer: req.file.buffer,
      fileName: `${createdProduct._id}`,
      containerName: 'products',
    })
    createdProduct.imageUrl = `https://cyl.blob.core.windows.net/products/${blobName}`
    await createdProduct.save()
  }

  res.status(201).json({
    ok: true,
    swalConfig: {
      title: 'Listo',
      html: 'Producto creada con éxito',
      icon: 'success',
      timer: 1200,
      showConfirmButton: false,
    },
    data: createdProduct,
  })
}
const editProduct = async (req, res) => {
  const { id } = req.params

  const productInfo = JSON.parse(req.body.data)
  const updatedProduct = await Product.findByIdAndUpdate(id, productInfo)

  if (req.file) {
    const blobName = await updateBlob({
      buffer: req.file.buffer,
      fileName: `${updatedProduct._id}`,
      containerName: 'products',
    })
    updatedProduct.imageUrl = `https://cyl.blob.core.windows.net/products/${blobName}`
    await updatedProduct.save()
  }

  res.status(200).json({
    ok: true,
    swalConfig: {
      title: 'Listo',
      html: 'Producto editado con éxito',
      icon: 'success',
      timer: 1200,
      showConfirmButton: false,
    },
  })
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

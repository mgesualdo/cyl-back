const Person = require('../models/person')
const updateBlob = require('../helpers/updateBlob')

const getPersons = async (req, res) => {
  const persons = await Person.find({ annulled: false })
  res.status(200).json({ ok: true, data: persons })
}
const getBusiness = async (req, res) => {
  const persons = await Person.find({
    annulled: false,
    isClient: true,
    type: 'Empresa',
  })
  res.status(200).json({ ok: true, data: persons })
}

const createPerson = async (req, res) => {
  console.log({ files: req.files, file: req.file, body: req.body })
  const personInfo = JSON.parse(req.body.data)

  const createdPerson = await Person.create({
    ...personInfo,
    createdBy: req.user._id,
  })

  if (req.file) {
    const blobName = await updateBlob({
      buffer: req.file.buffer,
      fileName: `${createdPerson._id}`,
      containerName: 'persons',
    })
    createdPerson.imageUrl = `https://cyl.blob.core.windows.net/persons/${blobName}`
    await createdPerson.save()
  }

  res.status(201).json({
    ok: true,
    swalConfig: {
      title: 'Listo',
      html: 'Persona creada con éxito',
      icon: 'success',
      timer: 1200,
      showConfirmButton: false,
    },
    data: createdPerson,
  })
}

const editPerson = async (req, res) => {
  const { id } = req.params
  const personInfo = JSON.parse(req.body.data)

  const updatedPerson = await Person.findByIdAndUpdate(id, personInfo)

  if (req.file) {
    const blobName = await updateBlob({
      buffer: req.file.buffer,
      fileName: `${updatedPerson._id}`,
      containerName: 'persons',
    })
    updatedPerson.imageUrl = `https://cyl.blob.core.windows.net/persons/${blobName}`
    await updatedPerson.save()
  }

  res.status(200).json({
    ok: true,
    swalConfig: {
      title: 'Listo',
      html: 'Persona editada con éxito',
      icon: 'success',
      timer: 1200,
      showConfirmButton: false,
    },
  })
}

const annulPerson = async (req, res) => {
  const { id } = req.params
  await Person.findByIdAndUpdate(id, {
    annulled: true,
    annulledBy: req.user._id,
  })
  res.status(200).json({
    ok: true,
    swalConfig: {
      title: 'Listo',
      html: 'Persona anulada con éxito',
      icon: 'success',
      timer: 1200,
      showConfirmButton: false,
    },
    data: id,
  })
}

module.exports = {
  getPersons,
  createPerson,
  editPerson,
  annulPerson,
  getBusiness,
}

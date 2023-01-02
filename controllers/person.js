const Person = require("../models/person")

const getPersons = async (req, res) => {
  const persons = await Person.find({ annulled: false })
  res.status(200).json({ ok: true, data: persons })
}
const createPerson = async (req, res) => {
  const createdPerson = await Person.create({
    ...req.body,
    createdBy: req.user._id,
  })
  res.status(201).json({
    ok: true,
    swalConfig: {
      title: "Listo",
      html: "Persona creada con éxito",
      icon: "success",
      timer: 1200,
      showConfirmButton: false,
    },
    data: createdPerson,
  })
}
const editPerson = async (req, res) => {
  const { id } = req.params
  console.log("EDITANDO")
  await Person.findByIdAndUpdate(id, req.body)
  res.status(200).json({
    ok: true,
    swalConfig: {
      title: "Listo",
      html: "Persona editada con éxito",
      icon: "success",
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
      title: "Listo",
      html: "Persona anulada con éxito",
      icon: "success",
      timer: 1200,
      showConfirmButton: false,
    },
    data: id,
  })
}

module.exports = { getPersons, createPerson, editPerson, annulPerson }

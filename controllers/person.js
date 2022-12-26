const Person = require("../models/person")

const getPersons = async (req, res) => {
  const persons = await Person.find()
  res.status(200).json({ ok: true, data: persons })
}
const createPerson = async (req, res) => {
  await Person.create({ ...req.body, createdBy: req.user._id })
  res.status(201).json({ ok: true })
}
const editPerson = async (req, res) => {
  const { id } = req.params
  await Person.findByIdAndUpdate(id, req.body)
  res.status(200).json({ ok: true })
}
const annulPerson = async (req, res) => {
  const { id } = req.params
  await Person.findByIdAndUpdate(id, {
    annulled: true,
    annulledBy: req.user._id,
  })
  res.status(200).json({ ok: true })
}

module.exports = { getPersons, createPerson, editPerson, annulPerson }

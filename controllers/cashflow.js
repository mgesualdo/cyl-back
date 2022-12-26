const createFullDate = require("../helpers/createFullDate")
const { updateBlob } = require("../helpers/updateBlob")
const { Attachment } = require("../models/attachment")
const Cashflow = require("../models/cashflow")
const { blobsBaseUrl } = require("../utils/config")

const getCashflows = async (req, res) => {
  const cashflows = await Cashflow.find()
  res.status(200).json({ ok: true, data: cashflows })
}
const createCashflow = async (req, res) => {
  await Cashflow.create({
    ...req.body,
    createdBy: req.user._id,
    fullCreatedDate: createFullDate(),
    fullUpdatedDate: createFullDate(),
  })
  res.status(201).json({ ok: true })
}

const annulCashflow = async (req, res) => {
  const { id } = req.params
  await Cashflow.findByIdAndUpdate(id, {
    annulled: true,
    annulledBy: req.user._id,
    fullUpdatedDate: createFullDate(),
  })
  res.status(200).json({ ok: true })
}

const addAttachment = async (req, res) => {
  const { id } = req.params
  const { description, ext } = req.body

  const newAttachment = new Attachment({
    description,
    createdBy: req.user._id,
  })

  const blobName = await updateBlob({
    buffer: req.file.buffer,
    containerName: "attachments",
    fileName: newAttachment._id,
    fileExt: ext,
  })

  newAttachment.blobUrl = `${blobsBaseUrl}/${blobName}`

  await Cashflow.findByIdAndUpdate(id, {
    $addToSet: { attachments: newAttachment },
  })

  res.status(200).json({
    ok: true,
    createdAttachment: newAttachment,
  })
}

module.exports = { getCashflows, createCashflow, annulCashflow, addAttachment }

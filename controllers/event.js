const createFullDate = require("../helpers/createFullDate")
const { updateBlob } = require("../helpers/updateBlob")
const { Attachment } = require("../models/attachment")
const { Comment } = require("../models/comment")
const Event = require("../models/event")
const { blobsBaseUrl } = require("../utils/config")

const getEvents = async (req, res) => {
  const events = await Event.find()
  res.status(200).json({ ok: true, data: events })
}
const createEvent = async (req, res) => {
  const { type, products, totalAmount, supplier, comment } = req.body
  const newEvent = new Event({
    type,
    products,
    totalAmount,
    supplier,
    comments: !!comment ? [{ text: comment }] : [],
    fullCreatedDate: createFullDate(),
    fullUpdatedDate: createFullDate(),
  })

  await Event.create(newEvent)

  res.status(201).json({ ok: true })
}
const editEvent = async (req, res) => {
  const { id } = req.params
  await Event.findByIdAndUpdate(id, {
    ...req.body,
    fullUpdatedDate: createFullDate(),
  })
  res.status(200).json({ ok: true })
}
const annulEvent = async (req, res) => {
  const { id } = req.params
  await Event.findByIdAndUpdate(id, {
    annulled: true,
    annulledBy: req.user._id,
    fullUpdatedDate: createFullDate(),
  })
  res.status(200).json({ ok: true })
}

const addAttachment = async (req, res) => {
  const { id } = req.params
  console.log({ body: req.body })
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

  await Event.findByIdAndUpdate(id, {
    $addToSet: { attachments: newAttachment },
  })

  res.status(200).json({
    ok: true,
    createdAttachment: newAttachment,
  })
}

const addComment = async (req, res) => {
  const { id } = req.params
  const { text } = req.body

  const newComment = new Comment({
    text,
    createdBy: req.user._id,
  })

  await Event.findByIdAndUpdate(id, {
    $addToSet: { comments: newComment },
  })

  res.status(200).json({
    ok: true,
    createdComment: newComment,
  })
}

module.exports = {
  getEvents,
  createEvent,
  editEvent,
  annulEvent,
  addAttachment,
  addComment,
}

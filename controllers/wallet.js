const Wallet = require("../models/wallet")

const getWallets = async (req, res) => {
  const wallets = await Wallet.find()
  res.status(200).json({ ok: true, data: wallets })
}
const createWallet = async (req, res) => {
  await Wallet.create({ ...req.body, createdBy: req.user._id })
  res.status(201).json({ ok: true })
}
const editWallet = async (req, res) => {
  const { id } = req.params
  await Wallet.findByIdAndUpdate(id, req.body)
  res.status(200).json({ ok: true })
}
const annulWallet = async (req, res) => {
  const { id } = req.params
  await Wallet.findByIdAndUpdate(id, {
    annulled: true,
    annulledBy: req.user._id,
  })
  res.status(200).json({ ok: true })
}

module.exports = { getWallets, createWallet, editWallet, annulWallet }

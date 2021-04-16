
export default async (req, res) => {
  console.log(req.query.date)
  res.status(200).json({ date: req.query.date})
}
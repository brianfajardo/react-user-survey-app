const requireCredits = (req, res, next) => {

  if (req.user.credits < 1) {
    return res.send({ error: 'Insufficient funds. Purchase more credits to create a new survey.' }).status(403)
  }

  return next()
}

module.exports = requireCredits
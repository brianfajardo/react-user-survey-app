// Top-level require login check

const requireLogin = (req, res, next) => {
  if (!req.user) {
    return res.send({ error: 'You must log in with Google+' }).status(401)
  }

  return next()
}

module.exports = requireLogin
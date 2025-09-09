const validateDomain = require('../middlewares/validateDomain');
const randomGenerator = require('../middlewares/randomGenerator');

const express = require("express");
const router = express.Router();


router.get('/', (req, res) => {
  res.render('form', data);
});

router.post('/submit', validateDomain, (req, res) => {
  const domain = req.body.domain.trim();
  req.session.domain = domain;
  res.redirect('/decision');
});

router.get('/decision', randomGenerator, (req, res) => {
  const { decision, number, formattedDate } = req.randomResult;
  const domain = req.session.domain;

  if (!domain) {
    return res.redirect('/');
  }

  res.render("decision", { decision, number, formattedDate, domain });
});

module.exports = router;
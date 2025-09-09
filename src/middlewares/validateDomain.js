const domainRegex = /^(?=.{1,253}$)(?:[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?\.)+[A-Za-z]{2,63}$/;

function validateDomain(req, res, next) {
  const domain = req.body.domain?.trim();

  if (!domain) {
    return res.render('form', {
      error: 'Domain is required.',
    });
  }

  if (!domainRegex.test(domain)) {
    return res.render('form', {
      error: 'Invalid domain format. Example: example.com',
    });
  }

  next();
}

module.exports = validateDomain;
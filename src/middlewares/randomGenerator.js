function randomGenerator(req, res, next) {
  const decision = Math.random() < 0.5; // 50/50 chance

  let number = null;
  let generated_at = null;

  if (decision) {
    number = Math.floor(Math.random() * 3) + 1;

    const now = new Date();
    const past90 = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000); // 90 days before today
    const randomTime = new Date(
      past90.getTime() + Math.random() * (now.getTime() - past90.getTime()) // present + 0.0-1.0 * (present - 90 days before today)
    );

    // MM/DD/YYYY HH:mm:ss
    generated_at = randomTime.toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  }

  req.randomResult = { decision, number, generated_at };

  next();
}

module.exports = randomGenerator;
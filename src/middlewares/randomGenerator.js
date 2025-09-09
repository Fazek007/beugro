const DomainDecision = require('../models/DomainDecision');

async function randomGenerator(req, res, next) {
    try {
        const domain = req.session.domain;
        if (!domain) {
            return res.status(400).send("Domain is required!");
        }

        let record = await DomainDecision.findOne({ domain });

        if (record) {
            // Already exists then reuse
            req.randomResult = {
                decision: record.decision,
                number: record.number,
                formattedDate: record.generated_at
                    ? record.generated_at.toLocaleString("en-US", { //its stored as Date so must convert to readable string
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                    })
                    : null,
            };
            return next();
        }
        const decision = Math.random() < 0.5; // 50/50 chance

        let number = null;
        let formattedDate = null;

        if (decision) {
            number = Math.floor(Math.random() * 3) + 1;

            const now = new Date();
            const past90 = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000); // 90 days before today
            const generated_at = new Date(
                past90.getTime() + Math.random() * (now.getTime() - past90.getTime()) // present + 0.0-1.0 * (present - 90 days before today)
            );

            record = new DomainDecision({
                domain,
                decision,
                number,
                generated_at
            })
            await record.save();

            // MM/DD/YYYY HH:mm:ss, also convert after saving as Date
            formattedDate = generated_at.toLocaleString("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
            });
        }

        req.randomResult = { decision, number, formattedDate };

        next();
    } catch (err) {
        next(err);
    }
}

module.exports = randomGenerator;
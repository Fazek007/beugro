const DomainDecision = require('../models/DomainDecision');
const { generateDecisionAndNumber, formatDate } = require('../utils/randomUtils');

async function randomGenerator(req, res, next) {
    try {
        const domain = req.session.domain;
        if (!domain) {
            return res.status(400).send("Domain is required!");
        }

        let record = await DomainDecision.findOne({ domain });

        if (record) {
            req.randomResult = {
                decision: record.decision,
                number: record.number,
                formattedDate: formatDate(record.generated_at),
            };
            return next();
        }

        const { decision, number, generated_at } = generateDecisionAndNumber();

        if (decision) {
            record = new DomainDecision({
                domain,
                decision,
                number,
                generated_at,
            });
            await record.save();
        }

        req.randomResult = {
            decision,
            number,
            formattedDate: formatDate(generated_at),
        };

        next();
    } catch (err) {
        next(err);
    }
}

module.exports = randomGenerator;
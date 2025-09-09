function generateDecisionAndNumber() {
    const decision = Math.random() < 0.5;
    let number = null;
    let generated_at = null;

    if (decision) {
        number = Math.floor(Math.random() * 3) + 1;

        const now = new Date();
        const past90 = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
        generated_at = new Date(
            past90.getTime() + Math.random() * (now.getTime() - past90.getTime())
        );
    }

    return { decision, number, generated_at };
}

function formatDate(date) {
    return date
        ? date.toLocaleString("en-US", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
          })
        : null;
}

module.exports = { generateDecisionAndNumber, formatDate };
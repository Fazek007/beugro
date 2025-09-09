const { formatDate } = require('../src/utils/randomUtils');


describe("formatDate", () => {
    test("in case of null is null", () => {
        expect(formatDate(null)).toBeNull();
    });

    test("real date matches format", () => {
        const date = new Date("2024-01-01T12:34:56Z");
        const formatted = formatDate(date);
        expect(formatted).toMatch(/\d{2}\/\d{2}\/\d{4}/); // MM/DD/YYYY
    });
});
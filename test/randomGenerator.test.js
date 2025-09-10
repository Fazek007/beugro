const randomGenerator = require('../src/middlewares/randomGenerator');
const DomainDecision = require('../src/models/domainDecision');
const randomUtils = require('../src/utils/randomUtils');
const { generateDecisionAndNumber } = require('../src/utils/randomUtils');

jest.mock('../src/models/DomainDecision');

describe("randomGenerator", () => {
  let req, res, next;

  beforeEach(() => {
    req = { session: { domain: "test.com" } };
    res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
    next = jest.fn();
    jest.clearAllMocks();
  });

  test("returns 400 if no domain in session", async () => {
    req.session = {};
    await randomGenerator(req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith("Domain is required!");
  });

  test("uses existing record if found", async () => {
    const fakeRecord = {
      decision: true,
      number: 2,
      generated_at: new Date("2024-01-01T12:00:00Z"),
    };
    DomainDecision.findOne.mockResolvedValue(fakeRecord);

    await randomGenerator(req, res, next);

    expect(DomainDecision.findOne).toHaveBeenCalledWith({ domain: "test.com" });
    expect(req.randomResult.decision).toBe(true);
    expect(req.randomResult.number).toBe(2);
    expect(req.randomResult.formattedDate).toMatch(/01\/01\/2024/);
    expect(next).toHaveBeenCalled();
  });

});
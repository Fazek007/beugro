const { generateDecisionAndNumber } = require('../src/utils/randomUtils');

describe("generateDecisionAndNumber", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("should generate decision = false (No case)", () => {
    jest.spyOn(global.Math, "random").mockReturnValue(0.9); // >= 0.5 → decision = false
    const result = generateDecisionAndNumber();
    expect(result.decision).toBe(false);
    expect(result.number).toBeNull();
    expect(result.generated_at).toBeNull();
  });

  test("should generate decision = true (Yes case)", () => {
    jest.spyOn(global.Math, "random")
    .mockReturnValue(0.01) // < 0.5 → decision = true
    const result = generateDecisionAndNumber();
    expect(result.decision).toBe(true);
    expect([1, 2, 3]).toContain(result.number);
    expect(result.generated_at).toBeInstanceOf(Date);
  });
});  

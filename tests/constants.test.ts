import consts from "../src/constants";

describe("constants (STATIC)", () => {
	test("SHOULD match snapshot", () => {
		expect(consts).toMatchSnapshot("constants");
	});
});

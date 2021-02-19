/* eslint-disable max-len */
import { cleanBody } from "../../src/lib/helpers";
import consts from "../../src/constants";

describe("cleanBody (PRE-PARSE)", () => {
	test("GIVEN body SHOULD prune empty lines", () => {
		const result = cleanBody("# Test heading\n\nTest body");
		expect(result).toBe("# Test heading\nTest body");
	});

	test("GIVEN body SHOULD prune markdown list notation", () => {
		const result = cleanBody("# Test heading\n\n- Test item 1\n-   Test item 2");
		expect(result).toBe("# Test heading\nTest item 1\nTest item 2");
	});

	test("GIVEN fallback body SHOULD not change", () => {
		const result = cleanBody(consts.BODY_MISSING);
		expect(result).toBe(consts.BODY_MISSING);
	});
});

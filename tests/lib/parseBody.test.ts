/* eslint-disable max-len */
import consts from "../../src/constants";
import { parseBody } from "../../src/lib/helpers";

describe("parseBody (PARSE)", () => {
	test("GIVEN field SHOULD parse", () => {
		const result = parseBody("# Test heading\nTest item");
		expect(result).toStrictEqual([
			{
				name: "Test heading",
				value: "\nTest item"
			}
		]);
	});

	test("GIVEN fields SHOULD parse", () => {
		const result = parseBody("# Test heading\nTest item\n###### Test heading 2\nTest item 2");
		expect(result).toStrictEqual([
			{
				name: "Test heading",
				value: "\nTest item"
			},
			{
				name: "Test heading 2",
				value: "\nTest item 2"
			}
		]);
	});

	test("GIVEN meta overlap SHOULD parse", () => {
		const result = parseBody("# release-name\n# Test heading\nTest item");
		expect(result).toStrictEqual([
			{
				name: "release-name",
				value: ""
			},
			{
				name: "Test heading",
				value: "\nTest item"
			}
		]);
	});

	test("GIVEN fallback body SHOULD parse", () => {
		const result = parseBody(consts.BODY_MISSING);
		expect(result).toStrictEqual([
			{
				name: "Meta",
				value: "\nThis release has no bundled changelog."
			}
		]);
	});
});

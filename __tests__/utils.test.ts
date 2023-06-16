import { convertAddress } from "../utils/geoLocation";

describe("findLatLong()", () => {
  test("should convert address to lat and long", () => {
    return convertAddress("NW1 4NR").then((data) => {
      const expectedOutput = { lat: 51.52911773333333, long: -0.15403 };
      expect(data).toEqual(expectedOutput);
    });
  });
});

import NodeGeocoder from "node-geocoder";
import { LocationCords } from "../types/CustomTypes";

const options = {
  provider: "openstreetmap" as const,
};

const geocoder = NodeGeocoder(options);

export const convertAddress = (postcode: string) => {
  return geocoder
    .geocode(postcode)
    .then((res) => {
      if (res.length > 0) {
        const { latitude, longitude } = res[0];
        return { lat: latitude, long: longitude } as LocationCords;
      } else {
        throw new Error("No results found.");
      }
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
};

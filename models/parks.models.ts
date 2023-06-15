import db from "../db/connection";
import { Park, ParkRequest } from "../types/CustomTypes";
import { convertAddress } from "../utils/geoLocation";

export const getAllParks = (): Promise<Park[]> => {
  return db
    .collection("parks")
    .get()
    .then((snapshot) => {
      if (!snapshot.empty) {
        return snapshot.docs.map((doc) => {
          const id = doc.id;
          const data = doc.data();
          return { id, ...data } as Park;
        });
      }
      return Promise.reject({
        status: 404,
        msg: `Parks collection not found`,
      });
    });
};

export const getParkByID = (park_id: string): Promise<Park> => {
  return db
    .collection("parks")
    .doc(park_id)
    .get()
    .then((snapshot) => {
      if (snapshot.exists) {
        return snapshot.data() as Park;
      }
      return Promise.reject({
        status: 404,
        msg: `No park found for park_id: ${park_id}`,
      });
    });
};

export const deleteParkByID = (park_id: string): Promise<void> => {
  return db
    .collection("parks")
    .doc(park_id)
    .get()
    .then((snapshot) => {
      if (snapshot.exists) {
        return db.collection("parks").doc(park_id).delete().then();
      } else {
        return Promise.reject({
          status: 404,
          msg: `No park found for park_id: ${park_id}`,
        });
      }
    });
};

export const addNewPark = (newPark: ParkRequest): Promise<Park> => {
  const parksRef = db.collection("parks");
  return parksRef.get().then((snapshot) => {
    const pid = `park_${snapshot.size + 1}`;
    const postCode = newPark.address.postCode;
    return convertAddress(postCode).then((cords) => {
      const returnPark = {
        id: pid,
        current_average_rating: 0,
        current_review_count: 0,
        location: cords,
        ...newPark,
      };
      return parksRef
        .doc(pid)
        .set(newPark)
        .then(() => {
          return returnPark as Park;
        });
    });
  });
};

import db from "../db/connection";
import { Park } from "../types/CustomTypes";
import { calculateAverageRating } from "../utils/calculateAverageRating";

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

export const addNewPark = (newPark: Park): Promise<Park> => {
  const parksRef = db.collection("parks");
  return parksRef.get().then((snapshot) => {
    const pid = `park_${snapshot.size + 1}`;
    return parksRef
      .doc(pid)
      .set(newPark)
      .then(() => {
        return { park_id: pid, ...newPark } as Park;
      });
  });
};

export const updateParkAverageRating = (
  park_id: string,
  newRating: number,
  newSafety: number
): Promise<Park> => {
  const parkRef = db.collection("parks").doc(park_id);
  return parkRef.get().then((snapshot) => {
    if (snapshot.exists) {
      const newParkData = { ...snapshot.data() };
      newParkData.current_review_count++;
      newParkData.current_average_rating = calculateAverageRating(
        newParkData.current_review_count,
        newParkData.current_average_rating,
        newRating,
        newSafety
      );
      return parkRef.update(newParkData).then(() => newParkData as Park);
    }
    return Promise.reject({
      status: 404,
      msg: `No park found for park_id: ${park_id}`,
    });
  });
};

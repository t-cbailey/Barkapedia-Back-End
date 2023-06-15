import db from "../db/connection";
import { Park } from "../types/CustomTypes";

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

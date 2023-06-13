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

export const addNewPark = (): Promise<void> => {
  const data = {
    park_name: "hello world",
  };
  return db.collection("parks").doc().set(data).then();

}






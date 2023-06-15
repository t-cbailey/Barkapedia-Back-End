import db from "../db/connection";
import { Park } from "../types/CustomTypes";
import { ParsedQs } from "qs";
import { QuerySnapshot, DocumentData } from "firebase/firestore";

export const getAllParks = (
  city: string | string[] | ParsedQs | ParsedQs[] | undefined
): Promise<Park[]> => {
  let query: any = db.collection("parks");
  if (city) {
    query = query.where("address.city", "==", city);
  }

  return query.get().then((snapshot: QuerySnapshot<DocumentData>) => {
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
        return { pid, ...newPark } as Park;
      });
  });
};

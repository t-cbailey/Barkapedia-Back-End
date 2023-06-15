import db from "../db/connection";
import { Park, ParkQuery } from "../types/CustomTypes";

export const getAllParks = (queryOptions: ParkQuery): Promise<Park[]> => {
  let query: FirebaseFirestore.Query<FirebaseFirestore.DocumentData> =
    db.collection("parks");
  if (queryOptions.city) {
    query = query.where("address.city", "==", queryOptions.city);
  }
  if (queryOptions.rating) {
    query = query.where("current_average_rating", ">=", queryOptions.rating);
  }
  if (queryOptions.isFree) {
    query = query.where("features.isFree", "==", queryOptions.isFree);
  }
  if (queryOptions.isWellLit) {
    query = query.where("features.isWellLit", "==", queryOptions.isWellLit);
  }
  if (queryOptions.isFreeParking) {
    query = query.where("features.isFreeParking", "==", queryOptions.isFreeParking);
  }
  if (queryOptions.isParking) {
    query = query.where("features.isParking", "==", queryOptions.isParking);
  }
  if (queryOptions.hasAgilityEquipment) {
    query = query.where("features.hasAgilityEquipment", "==", queryOptions.hasAgilityEquipment);
  }
  if (queryOptions.isFullyEnclosed) {
    query = query.where("features.isFullyEnclosed", "==", queryOptions.isFullyEnclosed);
  }
  if (queryOptions.hasDisabledAccess) {
    query = query.where("features.hasDisabledAccess", "==", queryOptions.hasDisabledAccess);
  }

  return query.get().then((snapshot) => {
    if (!snapshot.empty) {
      return snapshot.docs.map((doc) => {
        const id = doc.id;
        const data = doc.data();
        return { id, ...data } as Park;
      });
    }
    return [];
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

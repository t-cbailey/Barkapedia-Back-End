import db from "../db/connection";
import { calculateAverageRating } from "../utils/calculateAverageRating";
import { orderQuerySplit } from "../utils/parksUtils";
import { Park, ParkRequest, ParkQuery } from "../types/CustomTypes";
import { convertAddress } from "../utils/geoLocation";

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
    query = query.where(
      "features.isFreeParking",
      "==",
      queryOptions.isFreeParking
    );
  }
  if (queryOptions.isParking) {
    query = query.where("features.isParking", "==", queryOptions.isParking);
  }
  if (queryOptions.hasAgilityEquipment) {
    query = query.where(
      "features.hasAgilityEquipment",
      "==",
      queryOptions.hasAgilityEquipment
    );
  }
  if (queryOptions.isFullyEnclosed) {
    query = query.where(
      "features.isFullyEnclosed",
      "==",
      queryOptions.isFullyEnclosed
    );
  }
  if (queryOptions.hasDisabledAccess) {
    query = query.where(
      "features.hasDisabledAccess",
      "==",
      queryOptions.hasDisabledAccess
    );
  }

  if (queryOptions.orderBy !== "undefined") {
    const orderArr = orderQuerySplit(queryOptions.orderBy);
    const order: any = orderArr[1] ? orderArr[1] : "asc";
    query = query.orderBy(orderArr[0], order);
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

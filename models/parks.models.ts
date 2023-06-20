import db from "../db/connection";
import { calculateAverageRating } from "../utils/calculateAverageRating";
import { orderQuerySplit } from "../utils/parksUtils";
import {
  Park,
  ParkRequest,
  ParkQuery,
  ParkUpdateRequest,
} from "../types/CustomTypes";
import { convertAddress } from "../utils/geoLocation";
import { getUserByID } from "./users.models";

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
    const orderArr = orderQuerySplit(queryOptions.orderBy as string);
    const order = orderArr[1] ? orderArr[1] : "asc";
    query = query.orderBy(
      orderArr[0],
      order as FirebaseFirestore.OrderByDirection
    );
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
  const { user_id } = newPark;
  return getUserByID(user_id)
    .then((userData) => {
      if (userData.type === "personal" && !userData.isVerified) {
        return Promise.reject({
          status: 400,
          msg: `User must either be a business account or verified`,
        });
      }
    })
    .then(() => {
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

export const getParksByUserID = (user_id: string): Promise<Park[]> => {
  return db
    .collection("parks")
    .where("user_id", "==", user_id)
    .get()
    .then((snapshot) => {
      if (snapshot.empty) {
        return [];
      } else {
        return snapshot.docs.map((doc) => {
          const id = doc.id;
          const data = doc.data();
          return { id, ...data } as Park;
        });
      }
    })
    .catch(() => {
      return Promise.reject({
        status: 404,
        msg: `Parks collection not found`,
      });
    });
};

export const updateParkByID = (
  updatedParkRequest: ParkUpdateRequest
): Promise<Park> => {
  const { park_id, ...updatedPark } = updatedParkRequest;
  const parkRef = db.collection("parks").doc(park_id);
  return parkRef.get().then((snapshot) => {
    if (snapshot.exists) {
      const newParkData = { ...snapshot.data() };
      return convertAddress(newParkData.address.postCode).then((cords) => {
        newParkData.name = updatedPark.name;
        newParkData.desc = updatedPark.desc;
        newParkData.size = updatedPark.size;
        newParkData.features = updatedPark.features;
        newParkData.opening_hours = updatedPark.opening_hours;
        newParkData.address = updatedPark.address;
        newParkData.location = cords;
        newParkData.image_url = updatedPark.website_url;
        newParkData.phone_number = updatedPark.phone_number;
        return parkRef.update(newParkData).then(() => newParkData as Park);
      });
    }
    return Promise.reject({
      status: 404,
      msg: `No park found with park_id: ${park_id}`,
    });
  });
};

import db from "../db/connection";
import { User } from "../userType";

export const getAllUsers = (): Promise<User[]> => {
  return db
    .collection("users")
    .get()
    .then((snapshot) => {
      if (!snapshot.empty) {
        return snapshot.docs.map((doc) => {
          const id = doc.id;
          const data = doc.data();
          return { id, ...data } as User;
        });
      }
      return Promise.reject({
        status: 404,
        msg: `Users collection not found`,
      });
    });
};

export const getUserByID = (user_id: string): Promise<User> => {
  return db
    .collection("users")
    .doc(user_id)
    .get()
    .then((snapshot) => {
      if (snapshot.exists) {
        const id = snapshot.id;
        const data = snapshot.data();
        return { id, ...data } as User;
      }
      return Promise.reject({
        status: 404,
        msg: `No user found for user_id: ${user_id}`,
      });
    });
};

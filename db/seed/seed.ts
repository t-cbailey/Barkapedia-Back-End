import { ParkRequest, ReviewRequest, UserRequest } from "../../types/CustomTypes";
import db from "../connection";
import * as admin from "firebase-admin";

let parksData: Array<ParkRequest>;
let usersData: Array<UserRequest>;
let reviewsData: Array<ReviewRequest>;

if (process.env.NODE_ENV !== 'production') {
  parksData = require('../data/test-data/parks.json');
  usersData = require('../data/test-data/users.json');
  reviewsData = require('../data/test-data/reviews.json');
} else {
  parksData = require('../data/test-data/production-data/parks-production.json');
  usersData = require('../data/test-data/production-data/users-production.json');
  reviewsData = require('../data/test-data/production-data/reviews-production.json');
}

const auth = admin.auth();

function deleteCollections(): Promise<FirebaseFirestore.WriteResult[][]> {
  return db.listCollections().then((collections) => {
    const parkDeletionPromises = collections.map((collection) =>
      collection.get().then((querySnapshot) => {
        const batch = db.batch();
        querySnapshot.docs.forEach((doc) => {
          batch.delete(doc.ref);
        });
        return batch.commit();
      })
    );
    return Promise.all(parkDeletionPromises);
  });
}

function deleteAllUsers(): Promise<void[]> {
  return auth.listUsers().then((listUsersResult) => {
    const userDeletionPromises = listUsersResult.users.map((userRecord) => {
      return auth.deleteUser(userRecord.uid);
    });
    return Promise.all(userDeletionPromises);
  });
}

function createParks(): Promise<FirebaseFirestore.WriteResult[]> {
  const parkCreationPromises = parksData.map((park, index) => {
    const pid = `park_${index + 1}`;
    return db.collection("parks").doc(pid).set(park);
  });
  return Promise.all(parkCreationPromises);
}

function createReviews(): Promise<FirebaseFirestore.WriteResult[]> {
  const reviewsCreationPromises = reviewsData.map((review, index) => {
    const rid = `review_${index + 1}`;
    return db.collection("reviews").doc(rid).set(review);
  });
  return Promise.all(reviewsCreationPromises);
}

function createUsers(): Promise<FirebaseFirestore.WriteResult[]> {
  const userCreationPromises = usersData.map((user, index) => {
    const uid = `user_${index + 1}`;
    return auth
      .createUser({
        ...user,
        uid: uid,
        
      })
      .then((createdUser) => {
        const { password, ...newUser } = user;
        return db
          .collection("users")
          .doc(createdUser.uid)
          .set(newUser);
      });
  });
  return Promise.all(userCreationPromises);
}

export const seedDatabase = (): Promise<void> => {
  return deleteCollections()
    .then(() => {
      return deleteAllUsers();
    })
    .then(() => {
      return createParks();
    })
    .then(() => {
      return createUsers();
    })
    .then(() => {
      return createReviews()
    })
    .then(() => console.log("Seed successful"))
    .catch((error) => console.error("Error seeding the database:", error));
};

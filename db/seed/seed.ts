import db from "../connection";
import * as admin from "firebase-admin";
import parksData from "../data/test-data/parks.json";
import usersData from "../data/test-data/users.json";
import reviewsData from "../data/test-data/reviews.json";

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
        return db
          .collection("users")
          .doc(createdUser.uid)
          .set(user);
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

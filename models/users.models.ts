import db from "../db/connection";

export function getAllUsers(): Promise<any> {
    return db.collection('users').get().then((snapshot) => snapshot.docs.map((doc) => {
        const id = doc.id;
        const data = doc.data()
        return {id, ...data}
    }))
    }







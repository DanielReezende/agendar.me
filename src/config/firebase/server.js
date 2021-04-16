import firebaseServer from "firebase-admin";


const app = firebaseServer.apps.length
  ? firebaseServer.app()
  : firebaseServer.initializeApp({
    credential: firebaseServer.credential.cert({
      projectId: process.env.PROJECT_ID,
      clientEmail: process.env.CLIENT_EMAIL,
      privateKey: process.env.PRIVATE_KEY
    })
  });


export { firebaseServer };
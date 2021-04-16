import { firebaseServer } from '../../config/firebase/server';

const database = firebaseServer.firestore()
const profile = database.collection('profiles')


export default async (request, response) => {
  const [, token] = request.headers.authorization.split(' ');
  const { user_id } = await firebaseServer.auth().verifyIdToken(token)

  profile.doc(request.body.username).set({
    userId: user_id,
    username: request.body.username
  })

  console.log(user_id)
}
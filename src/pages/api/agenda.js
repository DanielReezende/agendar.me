import { firebaseServer } from '../../config/firebase/server';

const db = firebaseServer.firestore()
const agenda = db.collection('agenda')


export default async (request, response) => {
  const [, token] = request.headers.authorization.split(' ')
 
  if (!token) {
    return response.status(401)
  }

  try {
    const { user_id } = await firebaseServer.auth().verifyIdToken(token)

    const data = await agenda
        .where('userId', '==', user_id)
        .where('day', '==', request.query.date)
        .get()

    return response.status(200).json(data.docs)
    
  } catch (error) {
    console.log('FIREBASE ERROR:', error)
    return response.status(401)
  }

}
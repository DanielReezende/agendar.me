import { firebaseServer } from '../../config/firebase/server';
import { differenceInHours, format, addHours } from 'date-fns'

const db = firebaseServer.firestore()
const profile = db.collection('profile')
const agenda = db.collection('agenda')

const startTime = new Date(2021, 1, 1, 8, 0)
const finalTime = new Date(2021, 1, 1, 17, 0)
const totalHours = differenceInHours(finalTime, startTime)

const timeBlocks = []

for (let blockIndex = 0; blockIndex <= totalHours; blockIndex++) {
  const time = format(addHours(startTime, blockIndex), 'HH:mm');

  timeBlocks.push(time)
}


export default async (request, response) => {

  console.log(timeBlocks)
  try {
    // const { user_id } = await profile
    //   .where('username', '==', request.query.username)
    //   .get()

    // const data = await agenda
    //   .where('userId', '==', user_id)
    //   .where('day', '==', request.query.date)
    //   .get()

    return response.status(200).json(timeBlocks)

  } catch (error) {
    console.log('FIREBASE ERROR:', error)
    return response.status(401)
  }
}
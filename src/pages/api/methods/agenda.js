import axios from "axios";
import { format } from 'date-fns'

export const getAgenda = async (day) => {
  const { data } = await axios({
    method: 'GET',
    // headers: { Authorization: `Bearer ${token}` },
    url: '/api/agenda',
    params: { date: format(day, 'yyyy-MM-dd'), }
  })
}
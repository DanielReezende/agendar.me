import axios from "axios";
import { format } from 'date-fns';

export const getScheule = async (day) => {
  return axios({
    method: 'GET',
    url: '/api/schedule',
    params: { date: format(day, 'yyyy-MM-dd'), username: window.location.pathname }
  })
}
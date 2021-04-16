import axios from "axios";
import { format } from 'date-fns';

import { getToken } from '../../../config/firebase/client';

export const getAgenda = async (day) => {
  const token = await getToken();

  return axios({
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
    url: '/api/agenda',
    params: { date: format(day, 'yyyy-MM-dd'), }
  })
}
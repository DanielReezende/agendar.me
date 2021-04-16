import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { addDays, subDays } from 'date-fns';
import { FiLogOut, FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { useFetch } from '@refetty/react';


import { useAuth } from '../hooks/useAuth';
import { getScheule } from './api/methods/schedule';
import { formatDate } from '../utils/formatDate';

import styles from './schedule.module.scss';
import TimeBlock from '../components/TimeBlock';

export default function Schedule() {
  const { auth, logout } = useAuth();
  const router = useRouter();

  const [day, setDay] = useState(() => new Date());
  const [data, { loading }, fetch] = useFetch(getScheule, { lazy: true })

  useEffect(() => {
    fetch(day)
  }, [day])


  const beforeDay = () => setDay(prevState => subDays(prevState, 1))
  const afterDay = () => setDay(prevState => addDays(prevState, 1))

  return (
    <>
      <Head>
        <title> Schedule | Agendar.me </title>
      </Head>
      <main className={styles.container}>
        <img src="images/logo.svg" alt="Agendar.me logo" />

        <section>
          <div className={styles.days}>
            <button onClick={beforeDay}>
              <FiArrowLeft size={20} />
            </button>
            <span>{formatDate(day, "PPPP")}</span>
            <button onClick={afterDay}>
              <FiArrowRight size={20} />
            </button>
          </div>

          <div className={styles.times}>
            {data?.map(time => <TimeBlock key={time} time={time} agendado={time === '13:00' ? true : false}/>)}
          </div>
        </section>
      </main>
    </>

  );
}
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { addDays, subDays } from 'date-fns';
import { FiLogOut, FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { useFetch } from '@refetty/react';


import { useAuth } from '../hooks/useAuth';
import { getAgenda } from './api/methods/agenda';
import { formatDate } from '../utils/formatDate';

import styles from './agenda.module.scss';

export default function Agenda() {
  const { auth, logout } = useAuth();
  const router = useRouter();

  const [day, setDay] = useState(() => new Date());
  const [data, { loading }, fetch] = useFetch(getAgenda, { lazy: true })

  useEffect(() => {
    fetch(day)
  }, [day])


  useEffect(() => {
    !auth.user && router.push('/login')
  }, [auth.user])

  const beforeDay = () => setDay(prevState => subDays(prevState, 1))
  const afterDay = () => setDay(prevState => addDays(prevState, 1))

  return (
    <>
      <Head>
        <title> Agenda | Agendar.me </title>
      </Head>
      <main className={styles.container}>
        <header>
          <img src="images/logo.svg" alt="Agendar.me logo" />
          <button type="button" onClick={logout}>
            <FiLogOut size={20} />
          </button>
        </header>

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

        </section>
      </main>
    </>
   
  );
}
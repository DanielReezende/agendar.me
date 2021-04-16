import { useEffect } from "react";
import Head from 'next/head';
import Link from 'next/link';

import { useRouter } from 'next/router';

import { useFormik } from 'formik';
import * as yup from 'yup';

import styles from './login.module.scss';
import { useAuth } from '../hooks/useAuth';

const validationSchema = yup.object().shape({
  email: yup.string().email('E-mail inválido').required('Preenchimento obrigatório'),
  password: yup.string().required('Preenchimento obrigatório'),
})

export default function Login() {
  const { auth, login } = useAuth()
  const router = useRouter();

  useEffect(() => {
    auth.user && router.push('/agenda')
  }, [auth.user])


  const formik = useFormik({
    onSubmit: async (values, form) => {
      try {
        await login(values.email, values.password);
      } catch (error) {
        console.log(error)
      }
    },
    validationSchema,
    initialValues: {
      email: '',
      username: '',
      password: '',
    }
  })

  return (
    <>
      <Head>
        <title> SignIn | Agendar.me </title>
      </Head>
      <main className={styles.container}>
        <img src="images/logo.svg" alt="Agendar.me logo" />

        <p>Crie sua agenda compartilhada</p>

        <form onSubmit={formik.handleSubmit} >
          <label htmlFor="email">E-mail</label>
          <input
            type="text"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
          {formik.touched.email && <span>{formik.errors.email}</span>}

          <label htmlFor="password">Senha</label>
          <input
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
          {formik.touched.password && <span>{formik.errors.password}</span>}


          <button type="submit">Entrar</button>
          <span className={styles.link_singup}>
            Não tem uma conta?<Link href="/signup">Inscreva-se</Link>
          </span>
        </form>
      </main>
    </>
  )
}




import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useFormik } from 'formik';
import * as yup from 'yup';

import styles from './signup.module.scss';
import { useAuth } from '../hooks/useAuth';
import { useEffect } from 'react';

const validationSchema = yup.object().shape({
  email: yup.string().email('E-mail inválido').required('Preenchimento obrigatório'),
  password: yup.string().required('Preenchimento obrigatório'),
  username: yup.string().required('Preenchimento obrigatório')
})

export default function SignUp() {
  const { auth, signUp } = useAuth();
  const router = useRouter();

  const formik = useFormik({
    onSubmit: async (values, form) => {
      try {
        await signUp(values.email, values.password, values.username);
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

  useEffect(() => {
    auth.user && router.push('/agenda')
  }, [auth.user])


  return (
    <>
      <Head>
        <title> SignUp | Agendar.me </title>
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

          <div className={styles.input_link}>
            <div>
              <label htmlFor="username">agendar.me/</label>
              <input
                type="text"
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              />
            </div>
            {formik.touched.username && <span>{formik.errors.username}</span>}
          </div>



          <button type="submit">Cadastrar</button>
          <span className={styles.link_singin}>
            Já tem uma conta?<Link href="/login">Acesse</Link>
          </span>
        </form>
      </main>
    </>
  )
}

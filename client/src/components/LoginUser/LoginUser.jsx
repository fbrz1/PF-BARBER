import React from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';
import * as Yup from "yup"
import Cookies from 'universal-cookie';
import  { Redirect } from 'react-router-dom'


import styles from '../LoginUser/LoginUser.module.css'

export default function LoginUser() {
    const history = useHistory();

    let axiosConfig = {
        withCredentials: true,
      }


    const formik = useFormik({
        initialValues: {
            user: "",
            password: "",

        },

        validationSchema: Yup.object({

            user: Yup.string()
                .max(15, "Must be 15 character or less")
                .required('Required'),


            password: Yup.string()
                .required('No password provided.')
                .min(2, 'Password is too short - should be 8 chars minimum.')
                .max(15, "Must be between 8 and 15 character"),





        }),

        onSubmit: async (values) => {

            console.log(values)
            await axios.post('http://localhost:3001/auth/login', values).then(cred=> document.cookie = `token=${cred.data.data}; max-age=${500*500}; path=/; samesite=strict`
            )

            history.push('/')
        }
    })

    const cookies = new Cookies()

if(cookies.get('token')) {
    return <Redirect to='/'  />
} else {
    return (
        <>

            <div className={styles.conteiner}>


                <form onSubmit={formik.handleSubmit}>

                    {/* <!-- user input //nickname --> */}

                    <div>
                        <br /><br /><br /><br />
                        <input id="user" name="user" type="text" placeholder='Nickname'
                            class="form-control form-control-lg"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.user}
                        />

                        {formik.touched.user && formik.errors.user ? <p>{formik.errors.user}</p> : null}
                    </div>



                    {/* <!-- Password input --> */}
                    <div class="form-outline mb-4">
                        <input id="password" name="password" type="text" placeholder='*******'
                            class="form-control form-control-lg"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password} />
                    </div>

                    {/* <!-- submit --> */}

                    <button type='submit' class="btn btn-primary btn-lg btn-block" onChange={formik.handleChange} onBlur={formik.handleBlur}> Submit</button>


                </form>
                <div>
        <h1>Hola soy la cookie JWT {cookies.get('token')}</h1>
      </div>

            </div>



        </>


    )
}
}
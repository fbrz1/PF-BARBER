import React from 'react';
import axios from 'axios';
import { useFormik, yupToFormErrors } from 'formik';
import { useHistory } from 'react-router-dom';
import * as Yup from "yup"
import styles from '../Register/Register.module.css';
import Cookies from 'universal-cookie';
import  { Redirect } from 'react-router-dom'


export default function Register() {
    const history = useHistory();
    const phoneRegex = RegExp(
        /^((\+|)[0-9]{1,3}(-|\s)[0-9]{2,4}(-|\s)[0-9]{6,8})$/,
    );

    const cookies = new Cookies()


    const formik = useFormik({
        initialValues: {
            name: "",
            lastname: "",
            email: "",
            password: "",
            phone: "",
            user: "",
            genre: "",

        },



        validationSchema: Yup.object({

            // nickname: Yup.string()
            // .max(15, "Must be 15 character or less")
            // .required('Required'),

            name: Yup.string()
                .max(15, "Must be 15 character or less")
                .required('Required'),
            lastname: Yup.string()
                .max(20, "Must be 20 character or less")
                .required('Required'),
            email: Yup.string()
                .email("Invalud email address")
                .required('Required'),
            password: Yup.string()
                .required('No password provided.')
                .min(8, 'Password is too short - should be 8 chars minimum.')
                .max(15, "Must be between 8 and 15 character"),

            phone: Yup.string().matches(phoneRegex, "Invalid phone").required("Phone is required")

            


        }),


        onSubmit: async (values) => {

            console.log(values)
            console.log(await axios.post('http://localhost:3001/auth/register', values))
            history.push('/login')

        }

    })
console.log(formik)

if(cookies.get('token')) {
    return <Redirect to='/'  />
} else {

    return (
        <>
        <div className={styles.background}>
        <div className={styles.conteiner}>
            <h1>Create Account</h1>
            <form onSubmit={formik.handleSubmit}>

                <div>
                    <input id="user" name="user" type="text" placeholder='Nickname'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.user}
                    />

                    {formik.touched.user && formik.errors.user ? <p>{formik.errors.user}</p> : null}
                </div>

                <div>
                    <input id="name" name="name" type="text" placeholder='Name....'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}
                    />

                    {formik.touched.name && formik.errors.name ? <p>{formik.errors.name}</p> : null}
                </div>

                <div>
                    <input id="lastname" name="lastname" type="text" placeholder='Lastname..'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.lastname} />

                    {formik.touched.lastname && formik.errors.lastname ? <p>{formik.errors.lastname}</p> : null}
                </div>

                <div>
                    <input id="email" name="email" type="text" placeholder='jb@gmail.com'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email} />
                    {formik.touched.email && formik.errors.email ? <p>{formik.errors.email}</p> : null}
                </div>

                <div>
                    <input id="password" name="password" type="text" placeholder='*******'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password} />

                    {formik.touched.password && formik.errors.password ? <p>{formik.errors.password}</p> : null}
                </div>

                <div>
                    <input id="phone" name="phone" type="text" placeholder='54 341 3746374'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.phone} />
                    {formik.touched.phone && formik.errors.phone ? <p>{formik.errors.phone}</p> : null}
                </div>

                <div><br />
                


                    {/* <label><input type='radio' id="genre" name='genre' value='man'/>Men</label> 
                   <label><input type='radio' id="genre" name='genre' value='woman'/>Woman</label>
                    <label><input type='radio' id="genre" name='genre' value='binarie' />Non-binary</label>  */}

                    <select id="genre" name='genre' onChange={formik.handleChange}
                        onBlur={formik.handleBlur}  value={formik.values.genre}>
                        <option type="string" id="genre" name='genre'  value='man'>Men</option>
                        <option type="string" id="genre" name='genre'  value='woman'>Woman</option>
                        <option type="string" id="genre" name='genre'  value='binarie'>Non-binary</option>
                    </select>

                    {/* <input id="genre" name="genre" type="string" placeholder='genre'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.genre} />
                    {formik.touched.genre && formik.errors.genre ? <p>{formik.errors.genre}</p> : null} */}
                </div><br />

                <button type='submit' onChange={formik.handleChange} onBlur={formik.handleBlur} class="btn btn-primary btn-lg btn-block"> Submit</button>
                
            </form>
            </div>
            </div>
        </>

        // john
    )
}
}
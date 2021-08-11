import React, { useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './LoginPage.scss'
import { useFormik } from "formik";
import { useHistory } from 'react-router-dom';
import * as Yup from "yup";

import { login } from '../../Store/Actions/userActions'
import Error from "../Shared/Error/Error";
import { checkCredentials } from '../../Api/usersAPI';

const LoginPage = () => {
  const [ failedAuth, setFailedAuth ] = useState(false)
  const history = useHistory();
  const dispatch = useDispatch()

    const validationSchema = Yup.object({
        login: Yup.string()
          .min(3, `Too short, should be longer than 3 characters`)
          .required("Required!"),
        password: Yup.string().required("Required!")
      });

      const sumbitHandler = async (values) => {
        
        const loggedInUser  = await checkCredentials(values)
        console.log('isAuthorised is ', loggedInUser)

        dispatch(login(values))
        
        if (loggedInUser) { 
          history.push('/albums')
        } else {
          setFailedAuth(true);
          setTimeout(() => setFailedAuth(false) , 3000)
        }
      }

      const formik = useFormik({
        initialValues: {
          login: "",
          password: "",
        },
        onSubmit: async (values) => {
          sumbitHandler(values)
        },
        validationSchema
      });

    return (
        <div>
          <form onSubmit={formik.handleSubmit} className="login__form">
            { failedAuth ? <Error errorMessage="Credentials are wrong. Try again."/> : <br/>}
            <h2 className="login__form__title">Login page</h2>
            <div className="input__item">
              <label htmlFor="login" className="input__item__label">Login</label>
              <input
                type="text"
                id="login"
                name="login"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.login}
              ></input>
              {formik.errors.login && formik.touched.login ? (
                <Error errorMessage={formik.errors.login} />
              ) : (
                <br />
              )}
            </div>
      <div className="input__item">
        <label htmlFor="password" className="input__item__label">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        ></input>
        {formik.errors.password && formik.touched.password ? (
          <Error errorMessage={formik.errors.password} />
        ) : (
          <br />
        )}
      </div>
      <button 
      className="input__item__btn"
      type="submit" 
      >
        Log in
      </button>
    </form>

        </div>
    )
}

export default LoginPage

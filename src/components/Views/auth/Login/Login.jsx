import React from "react";
import { useFormik } from "formik";
import { useNavigate, Link } from "react-router-dom";
import { Switch, FormControlLabel } from "@mui/material";
import * as Yup from "yup";

import { swal } from "../../../../utils/swal";

// import "../Auth.styles.css";

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

export default function Login() {
  const navigate = useNavigate();

  const initialValues = {
    userName: "",
    password: "",
  };

  const required = "* Campo obligatorio";

  const validationSchema = Yup.object().shape({
    userName: Yup.string()
      .min(4, "La cantidad mínima de caracteres es 4")
      .required(required),
    password: Yup.string().required(required),
  });

  const onSubmit = () => {
    const { userName, password } = values;

    fetch(`https:${API_ENDPOINT}auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName,
        password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status_code === 200) {
          localStorage.setItem("token", data?.result?.token);
          localStorage.setItem("userName", data?.result?.user.userName);
          navigate("/", { replace: true });
        } else {
          swal();
        }
      });
  };

  const formik = useFormik({ initialValues, validationSchema, onSubmit });

  const { handleChange, handleSubmit, errors, touched, handleBlur, values } =
    formik;

  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="flex justify-center h-screen">
        <div
          className="hidden bg-cover lg:block lg:w-2/3"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1616763355603-9755a640a287?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)",
          }}
        >
          <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
            <div>
              <h2 className="text-4xl font-bold text-white">Turnero</h2>

              <p className="max-w-xl mt-3 text-gray-300">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. In
                autem ipsa, nulla laboriosam dolores, repellendus perferendis
                libero suscipit nam temporibus molestiae
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
          <div className="flex-1">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-center text-gray-700 dark:text-white">
                Turnero
              </h2>

              <p className="mt-3 text-gray-500 dark:text-gray-300">
                Inicia sesión o crea una cuenta nueva
              </p>
            </div>

            <div className="mt-8">
              <form onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm text-gray-600 dark:text-gray-200"
                  >
                    Nombre de usuario
                  </label>
                  <input
                    type="text"
                    name="userName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.userName}
                    className={
                      errors.userName && touched.userName ? "error" : ""
                    }
                  />
                  {errors.userName && touched.userName && (
                    <span className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                      {errors.userName}{" "}
                    </span>
                  )}
                </div>

                <div className="mt-6">
                  <div className="flex justify-between mb-2">
                    <label
                      htmlFor="password"
                      className="text-sm text-gray-600 dark:text-gray-200"
                    >
                      Telefono
                    </label>
                  </div>

                  <input
                    type="number"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    className={
                      errors.password && touched.password ? "error" : ""
                    }
                  />
                  {errors.password && touched.password && (
                    <span className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                      {errors.password}{" "}
                    </span>
                  )}
                </div>
                <FormControlLabel
                  control={
                    <Switch
                      value={values.switch}
                      onChange={() =>
                        formik.setFieldValue("switch", !formik.values.switch)
                      }
                      name="switch"
                      color="secondary"
                    />
                  }
                  label="¿Sos administrador?"
                  className="block mb-2 text-sm text-gray-600 dark:text-gray-200"
                />

                {values.switch && (
                  <div>
                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                      Por favor, introduce tu credencial
                    </label>
                    <input
                      type="text"
                      name="teamID"
                      value={values.teamID}
                      onChange={handleChange}
                    />
                  </div>
                )}

                <div className="mt-6">
                  <button
                    type="submit"
                    className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                  >
                    Iniciar sesión
                  </button>
                </div>
              </form>

              <p className="mt-6 text-sm text-center text-gray-400">
                No tenes una cuenta?{" "}
                <Link
                  to="/register"
                  href="#"
                  className="text-blue-500 focus:outline-none focus:underline hover:underline"
                >
                  Registrate
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

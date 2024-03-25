import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import AuthContext from '../context/AuthProvider';
import axios from 'axios';
import pelicula3 from '../assets/pelicula 3.png';

const Login = () => {
    const navigate = useNavigate();
    const { setAuth, setEstado } = useContext(AuthContext);
    const [mensaje, setMensaje] = useState({});

    /* Para la validación de errores */
    const { handleSubmit, control, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/login`;
            const respuesta = await axios.post(url, data);
            localStorage.setItem('token', respuesta.data.token);
            setAuth(respuesta.data);
            navigate('/dashboard');
        } catch (error) {
            setMensaje({ respuesta: error.response.data.msg, tipo: false });
            setTimeout(() => {
                setMensaje({});
            }, 3000);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="flex justify-center w-full">
                <div className="md:flex md:w-1/2">
                    <div className="bg-white p-8 rounded-lg shadow-lg md:w-96 mr-4">
                        {Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}
                        <h1 className="text-3xl font-semibold mb-2 text-center uppercase text-gray-500">Welcome back</h1>
                        <small className="text-gray-400 block my-4 text-sm">Welcome back! Please enter your details</small>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <Controller
                                name="email"
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: 'Campo Obligatorio',
                                    pattern: {
                                        value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                        message: 'Invalid email'
                                    }
                                }}
                                render={({ field }) => (
                                    <div>
                                        <label className="block text-sm font-semibold">Email</label>
                                        <input
                                            {...field}
                                            type="email"
                                            placeholder="Enter your email"
                                            maxLength={150}
                                            className={`block w-full rounded-md border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-2 text-gray-500`}
                                        />
                                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                                    </div>
                                )}
                            />
                            <Controller
                                name="password"
                                control={control}
                                defaultValue=""
                                rules={{ required: 'Campo Obligatorio' }}
                                render={({ field }) => (
                                    <div>
                                        <label className="block text-sm font-semibold">Password</label>
                                        <input
                                            {...field}
                                            type="password"
                                            placeholder="********************"
                                            className={`block w-full rounded-md border ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-2 text-gray-500`}
                                        />
                                        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                                    </div>
                                )}
                            />
                            <div>
                                <button className="py-2 w-full block text-center bg-blue-500 text-white border rounded-xl hover:scale-100 duration-300 hover:bg-blue-700">Login</button>
                            </div>
                        </form>

                        <div className="mt-6 text-xs border-b-2 py-4">
                            <Link to="/forgot/id" className="underline text-sm text-gray-400 hover:text-gray-900">Forgot your password?</Link>
                        </div>

                        <div className="mt-3 text-sm flex justify-center">
                            <p>Don't have an account? <Link to="/register" className="text-gray-600 hover:text-gray-900">Register</Link></p>
                        </div>
                    </div>
                </div>
                <div className="hidden md:flex md:w-990px">
                    <img src={pelicula3} alt="Perrito" className="w-full h-full object-cover" />
                </div>
            </div>
        </div>
    );
}

export default Login;

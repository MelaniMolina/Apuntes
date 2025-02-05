import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import Mensaje from '../componets/Alertas/Mensaje';

export const Register = () => {
    const navigate = useNavigate();
    // Inicializa useForm para gestionar el formulario
    const {
        handleSubmit,
        control, // Controla los campos del formulario
        formState: { errors }, // Gestiona los errores
    } = useForm();

    const [form, setForm] = useState({
        nombre: '',
        apellido: '',
        direccion: '',
        telefono: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const [mensaje, setMensaje] = useState({});

    const onSubmit = async (data) => {
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/registro`;
            const respuesta = await axios.post(url, data);
            setMensaje({ respuesta: respuesta.data.msg, tipo: true });
            setForm({});
        } catch (error) {
            setMensaje({ respuesta: error.response.data.msg, tipo: false });
        }
    };

    return (
        <>
            <div className="bg-white flex justify-center items-center w-1/2">
                <div className="md:w-4/5 sm:w-full">
                    {Object.keys(mensaje).length > 0 && (
                        <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
                    )}
                    <h1 className="text-3xl font-semibold mb-2 text-center uppercase text-gray-500">
                        Welcome
                    </h1>
                    <small className="text-gray-400 block my-4 text-sm">
                        Please enter your details
                    </small>
    
                    <div className="bg-gray-200 rounded-xl p-5 mb-5">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-3">
                                <label
                                    htmlFor="nombre"
                                    className="mb-2 block text-sm font-semibold"
                                >
                                    Full name:
                                </label>
                                <Controller
                                    name="nombre"
                                    control={control}
                                    defaultValue=""
                                    rules={{
                                        required: 'Campo Obligatorio',
                                        pattern: {
                                            value: /^[A-Za-z\s]+$/,
                                            message: 'Only letters are accepted',
                                        },
                                    }}
                                    render={({ field }) => (
                                        <div className="mb-3">
                                            <input
                                                {...field}
                                                type="text"
                                                placeholder="Enter your name"
                                                maxLength={20}
                                                className={`block w-full rounded-md border ${errors.nombre ? 'border-red-500' : 'border-gray-300'
                                                    } focus:border-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-700 py-1 px-1.5 text-gray-500`}
                                                required
                                            />
                                            {errors.nombre && <p className="text-red-500 text-sm">{errors.nombre.message}</p>}
                                        </div>
                                    )}
                                />
                            </div>
    
                            <div className="mb-3">
                                <label
                                    className="mb-2 block text-sm font-semibold"
                                    htmlFor="apellido"
                                >
                                    Last name:
                                </label>
                                <Controller
                                    name="apellido"
                                    control={control}
                                    defaultValue=""
                                    rules={{
                                        required: "Campo Obligatorio",
                                        pattern: {
                                            value: /^[A-Za-z\s]+$/,
                                            message: 'Only letters are accepted',
                                        },
                                    }}
                                    render={({ field }) => (
                                        <div className="mb-3">
                                            <input
                                                {...field}
                                                type="text"
                                                placeholder="Enter your last name"
                                                maxLength={20}
                                                className={`block w-full rounded-md border ${errors.apellido ? "border-red-500" : "border-gray-300"
                                                    } focus:border-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-700 py-1 px-1.5 text-gray-500`}
                                                required
                                            />
                                            {errors.apellido && (
                                                <p className="text-red-500 text-sm">{errors.apellido.message}</p>
                                            )}
                                        </div>
                                    )}
                                />
                            </div>
    
                            {/* Resto de los campos similares a los anteriores */}
    
                            <div className="mb-3">
                                <button className="bg-gray-500 text-slate-300 border py-2 w-full rounded-xl mt-5 hover:scale-105 duration-300 hover:bg-gray-900 hover:text-white">
                                    Register
                                </button>
                            </div>
                        </form>
                    </div>
    
                    <div className="mt-5 text-xs border-b-2 py-4"></div>
    
                    <div className="mt-3 text-sm flex justify-between items-center">
                        <p>You already have an account?</p>
                        <Link
                            to="/login"
                            className="py-2 px-5 bg-gray-500 text-slate-300 border rounded-xl hover:scale-110 duration-300 hover:bg-gray-900"
                        >
                            Login
                        </Link>
                    </div>
                </div>
            </div>
    
            <div
                className="w-1/2 h-screen bg-[url('/public/images/catforgot.jpg')] bg-no-repeat bg-cover bg-center sm:block hidden"
            ></div>
        </>
    );
    
};

























import logoDarkMode from '../assets/dark.png'
import pelicula1 from '../assets/pelicula 1.jpg'
import pelicula2 from '../assets/pelicula 2.jpg'
import pelicula3 from '../assets/pelicula 3.png'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export const LandinPage = () => {
    const [darkMode, setDarkMode] = useState(false);
    const movies = [pelicula1, pelicula2, pelicula3];
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((currentSlide + 1) % movies.length);
        }, 5000); // Cambio de película cada 5 segundos

        return () => clearInterval(interval);
    }, [currentSlide, movies.length]);

    const nextSlide = () => {
        setCurrentSlide((currentSlide + 1) % movies.length);
    };

    const prevSlide = () => {
        setCurrentSlide((currentSlide - 1 + movies.length) % movies.length);
    };

    return (
        <div className={darkMode ? "dark min-h-screen flex flex-col justify-between bg-gradient-to-r from-blue-200 to-blue-400" : "min-h-screen flex flex-col justify-between bg-gradient-to-r from-blue-50 to-blue-100"}>
            <header className="bg-transparent px-10 md:px-20 lg:px-40 dark:bg-transparent">
                <nav className='py-4 mb-8 flex justify-between items-center'>
                    <h1 className='text-4xl font-bold dark:text-white mt-4'>CineWeb</h1>
                    <ul className='flex items-center'>
                        <li><img onClick={() => setDarkMode(!darkMode)} className='cursor-pointer' src={logoDarkMode} alt="logo" width={40} height={40} /></li>
                        <li><Link to="/login" className='bg-red-500 text-white px-6 py-2 rounded-full ml-8 hover:bg-red-700 hover:text-white'>Login</Link></li>
                    </ul>
                </nav>

                <div className='text-center'>
                    <h2 className='text-5xl py-8 text-red-600 font-medium md:text-6xl'>¡Bienvenido a CineWeb!</h2>
                    <h3 className='text-2xl py-4 md:text-3xl dark:text-white'>Descubre las mejores películas aquí</h3>
                    <p className='text-md py-5 leading-8 text-gray-800 md:text-xl max-w-lg mx-auto dark:text-white'>Explora nuestra amplia colección de películas y encuentra tus favoritas. ¡No te pierdas de ninguna novedad del cine!</p>
                </div>
            </header>

            <main className="flex-1 bg-transparent px-10 md:px-20 lg:px-40 dark:bg-transparent flex items-center justify-center">
                <div className="relative rounded-lg w-full h-96 overflow-hidden">
                    <img src={movies[currentSlide]} alt="movie-slide" className="w-full h-full object-cover transition duration-500 ease-in-out transform hover:scale-105" />
                    <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
                        <button onClick={prevSlide} className="bg-transparent text-white rounded-full px-3 py-1"><i className="fas fa-chevron-left"></i></button>
                    </div>
                    <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
                        <button onClick={nextSlide} className="bg-transparent text-white rounded-full px-3 py-1"><i className="fas fa-chevron-right"></i></button>
                    </div>
                </div>
            </main>
        </div>
    )
}

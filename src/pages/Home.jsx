import React from "react";
import { Link } from "react-router-dom";
import { FaUsers, FaCogs, FaGlobe } from "react-icons/fa";
import ServerStatus from "../components/ServerStatus";

const Home = () => {
    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center">
            {/* Hero Section */}
            <section className="w-full text-center py-20 bg-cover bg-center relative" style={{ backgroundImage: "url('/assets/hero-bg.jpg')" }}>
                <div className="bg-black bg-opacity-50 p-10 rounded-lg">
                    <h1 className="text-5xl font-bold mb-4 animate-fadeIn">Selamat Datang di AlwiNation SMP</h1>
                    <p className="text-lg text-gray-300 animate-fadeInSlow">Server Minecraft terbaik untuk komunitas!</p>
                    <button className="mt-6 px-8 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
                        Gabung Sekarang
                    </button>
                </div>
            </section>

            {/* Server Status */}
            <ServerStatus />

            {/* Fitur Server */}
            <section className="text-center mt-10 px-6 max-w-5xl">
                <h3 className="text-3xl font-semibold mb-6 text-green-400">Kenapa Main di AlwiNation?</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-6 bg-gray-800 rounded-lg shadow-md flex flex-col items-center">
                        <FaGlobe className="text-green-400 text-4xl mb-3" />
                        <h4 className="font-semibold text-xl">Survival Mode</h4>
                        <p className="text-gray-300 text-sm mt-2">Jelajahi dunia tanpa batas dengan teman-temanmu!</p>
                    </div>
                    <div className="p-6 bg-gray-800 rounded-lg shadow-md flex flex-col items-center">
                        <FaCogs className="text-green-400 text-4xl mb-3" />
                        <h4 className="font-semibold text-xl">Custom Plugins</h4>
                        <p className="text-gray-300 text-sm mt-2">Pengalaman unik dengan fitur eksklusif.</p>
                    </div>
                    <div className="p-6 bg-gray-800 rounded-lg shadow-md flex flex-col items-center">
                        <FaUsers className="text-green-400 text-4xl mb-3" />
                        <h4 className="font-semibold text-xl">Komunitas Aktif</h4>
                        <p className="text-gray-300 text-sm mt-2">Bergabung dengan ratusan pemain setiap hari.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
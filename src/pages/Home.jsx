import React from "react";
import { Link } from "react-router-dom";
import ServerStatus from "../components/ServerStatus";

const Home = () => {
    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
            {/* Hero Section */}
            <section className="text-center">
                <h1 className="text-4xl font-bold mb-4">Selamat Datang di AlwiNation SMP</h1>
                <p className="text-lg">Server Minecraft terbaik untuk komunitas!</p>
                <button className="mt-4 px-6 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded">
                    Gabung Sekarang
                </button>
            </section>

            {/* Server Status */}
            <ServerStatus /> {/* 🔹 Menampilkan status server di Home */}

            {/* Fitur Server */}
            <section className="text-center mt-10">
                <h3 className="text-2xl font-semibold">Kenapa Main di AlwiNation?</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div className="p-4 bg-gray-800 rounded-lg">
                        <h4 className="font-semibold text-xl">Survival Mode</h4>
                        <p>Jelajahi dunia tanpa batas dengan teman-temanmu!</p>
                    </div>
                    <div className="p-4 bg-gray-800 rounded-lg">
                        <h4 className="font-semibold text-xl">Custom Plugins</h4>
                        <p>Pengalaman unik dengan fitur eksklusif.</p>
                    </div>
                    <div className="p-4 bg-gray-800 rounded-lg">
                        <h4 className="font-semibold text-xl">Komunitas Aktif</h4>
                        <p>Bergabung dengan ratusan pemain setiap hari.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
import React from "react";
import { Link } from "react-router-dom";

function Store() {
    return (
        <div className="min-h-screen bg-gray-900 text-white py-10 px-5 md:px-20">
            {/* Banner Promosi */}
            <div className="bg-gradient-to-r from-green-500 to-blue-600 text-center py-10 rounded-lg shadow-lg">
                <h1 className="text-4xl font-bold">Minecraft Store</h1>
                <p className="mt-3 text-lg">Dapatkan item eksklusif, rank, dan kredit dengan promo terbaru!</p>
            </div>

            {/* Promo Terbaru 
            <div className="mt-10">
                <h2 className="text-2xl font-semibold mb-5">Promo Terbaru</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gray-800 p-5 rounded-lg shadow-lg">
                        <h3 className="text-xl font-bold">Rank VIP</h3>
                        <p className="mt-2">Dapatkan akses eksklusif dengan harga spesial!</p>
                    </div>
                    <div className="bg-gray-800 p-5 rounded-lg shadow-lg">
                        <h3 className="text-xl font-bold">Coin Bonus</h3>
                        <p className="mt-2">Beli 1000 kredit, dapat tambahan 200 kredit gratis!</p>
                    </div>
                    <div className="bg-gray-800 p-5 rounded-lg shadow-lg">
                        <h3 className="text-xl font-bold">Bundle Spesial</h3>
                        <p className="mt-2">Dapatkan paket lengkap item dengan harga diskon!</p>
                    </div>
                </div>
            </div>
            */}
            {/* Tombol Redirect */}
            <div className="text-center mt-10">
                <Link to="https://your-store-link.com" target="_blank" rel="noopener noreferrer" className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-bold text-lg shadow-lg transition duration-300">
                    Kunjungi Store Sekarang
                </Link>
            </div>
        </div>
    );
}

export default Store;
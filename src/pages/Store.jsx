import React from "react";

const Store = () => {
    return (
        <div className="container mx-auto p-6 text-center">
            {/* Banner Promosi */}
            <div className="bg-blue-600 text-white p-6 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold">Promo Ramadhan!</h2>
                <p className="mt-2">Di penghujung bulan Ramadhan ini, ada <b>Diskon Up To 70%</b>buat semua rank di <b>Store AlwiNation!</b>.</p>
                <p className="mt-2">Promo berlaku dari <b>20 Maret 2025 - 31 Maret 2025</b>, jadi ini kesempatan terbaik buat kalian untuk upgrade rank dengan harga spesial</p>            
            </div>
            
            {/* Daftar Item Populer */}
            <div className="mt-10">
                <h3 className="text-2xl font-semibold mb-4">Item Populer</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-gray-800 text-white p-4 rounded-lg shadow-lg">
                        <h4 className="text-xl font-bold">Rank VIP</h4>
                        <p className="mt-2">Keuntungan eksklusif di server!</p>
                    </div>
                    <div className="bg-gray-800 text-white p-4 rounded-lg shadow-lg">
                        <h4 className="text-xl font-bold">Rank MVP</h4>
                        <p className="mt-2">Lebih banyak fitur premium!</p>
                    </div>
                    <div className="bg-gray-800 text-white p-4 rounded-lg shadow-lg">
                        <h4 className="text-xl font-bold">500 Kredit</h4>
                        <p className="mt-2">Gunakan untuk membeli item eksklusif!</p>
                    </div>
                </div>
            </div>
            
            {/* Tombol Redirect ke Store */}
            <div className="mt-10">
                <a 
                    href="https://store.alwination.id" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="bg-green-500 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-green-600"
                >
                    Kunjungi Store
                </a>
            </div>
        </div>
    );
};

export default Store;

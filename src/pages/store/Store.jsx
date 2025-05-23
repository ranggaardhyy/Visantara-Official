import React from "react";
import { Link } from "react-router-dom";

function Store() {
  // Style Objects
  const containerStyle = {
    minHeight: "100vh",
    backgroundColor: "#1a202c", // bg-gray-900
    color: "#ffffff",
    padding: "2.5rem 1.25rem", // py-10 px-5
  };

  // Banner Promosi Style
  const bannerStyle = {
    background: "linear-gradient(to right, #48bb78, #4299e1)", // from-green-500 to-blue-600
    textAlign: "center",
    padding: "2.5rem",
    borderRadius: "0.5rem",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  };

  const bannerTitleStyle = {
    fontSize: "2.5rem", // roughly equivalent to text-4xl
    fontWeight: "bold",
  };

  const bannerTextStyle = {
    marginTop: "0.75rem", // mt-3
    fontSize: "1.125rem", // text-lg
  };

  // Tombol Redirect Style
  const buttonContainerStyle = {
    textAlign: "center",
    marginTop: "2.5rem", // mt-10
  };

  const buttonStyle = {
    backgroundColor: "#48bb78", // bg-green-500
    color: "#ffffff",
    padding: "0.75rem 1.5rem", // py-3 px-6
    borderRadius: "0.5rem", // rounded-lg
    fontWeight: "bold",
    fontSize: "1.125rem", // text-lg
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    textDecoration: "none",
    transition: "background-color 0.3s ease",
  };

  return (
    <div style={containerStyle}>
      {/* Banner Promosi */}
      <div style={bannerStyle}>
        <h1 style={bannerTitleStyle}>AlwiNation Store</h1>
        <p style={bannerTextStyle}>
          Dapatkan item eksklusif, rank, dan kredit dengan promo terbaru!
        </p>
      </div>

      {/* Promo Terbaru (bagian ini dikomentari jika tidak digunakan) */}
      
      <div style={{ marginTop: "2.5rem" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: "600", marginBottom: "1.25rem" }}>
          Promo Terbaru
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.5rem" }}>
          <div style={{ backgroundColor: "#2d3748", padding: "1.25rem", borderRadius: "0.5rem", boxShadow: "0px 4px 6px rgba(0,0,0,0.1)" }}>
            <h3 style={{ fontSize: "1.25rem", fontWeight: "bold" }}>Rank VIP</h3>
            <p style={{ marginTop: "0.5rem" }}>Dapatkan akses eksklusif dengan harga spesial!</p>
          </div>
          <div style={{ backgroundColor: "#2d3748", padding: "1.25rem", borderRadius: "0.5rem", boxShadow: "0px 4px 6px rgba(0,0,0,0.1)" }}>
            <h3 style={{ fontSize: "1.25rem", fontWeight: "bold" }}>Coin Bonus</h3>
            <p style={{ marginTop: "0.5rem" }}>Beli 1000 kredit, dapat tambahan 200 kredit gratis!</p>
          </div>
          <div style={{ backgroundColor: "#2d3748", padding: "1.25rem", borderRadius: "0.5rem", boxShadow: "0px 4px 6px rgba(0,0,0,0.1)" }}>
            <h3 style={{ fontSize: "1.25rem", fontWeight: "bold" }}>Bundle Spesial</h3>
            <p style={{ marginTop: "0.5rem" }}>Dapatkan paket lengkap item dengan harga diskon!</p>
          </div>
        </div>
      </div>
      

      {/* Tombol Redirect */}
      <div style={buttonContainerStyle}>
        <Link
          to="https://store.alwination.id"
          target="_blank"
          rel="noopener noreferrer"
          style={buttonStyle}
        >
          Kunjungi Store Sekarang
        </Link>
      </div>
    </div>
  );
}

export default Store;

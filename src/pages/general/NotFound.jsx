import React from "react";

function NotFound() {
    return (
        <div style={{
            backgroundColor: "#121212",
            color: "#ffffff",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            padding: "20px"
        }}>
            <h1 style={{ fontSize: "6rem", marginBottom: "1rem" }}>404</h1>
            <h2 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>Halaman Tidak Ditemukan</h2>
            <p style={{ fontSize: "1.2rem", maxWidth: "600px" }}>
                Ups! Sepertinya halaman yang kamu cari tidak tersedia atau sudah dipindahkan.
            </p>
            <a href="/" style={{
                marginTop: "2rem",
                color: "#ffffff",
                backgroundColor: "#1e88e5",
                padding: "10px 20px",
                borderRadius: "5px",
                textDecoration: "none",
                fontWeight: "bold"
            }}>
                Kembali ke Beranda
            </a>

        </div>
        
    );
}

export default NotFound;

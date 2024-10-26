import React from 'react';
import styled from 'styled-components';

// Container untuk Navbar
const NavbarContainer = styled.div`
  background-color: #05022d; /* warna biru gelap */
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
`;

// Container untuk Logo
const Logo = styled.div`
  display: flex;
  align-items: center;
`;

// Styling gambar logo
const LogoImage = styled.img`
  height: 50px; /* Sesuaikan tinggi logo */
  margin-right: 10px; /* Spasi antara logo dan teks */
`;

// Styling teks logo
const LogoText = styled.div`
  color: white;
  font-size: 24px;
  font-weight: bold;
`;

// Bagian untuk menampilkan ID dan Time
const IDSection = styled.div`
  display: flex;
  align-items: center;
  color: white;
`;

const IDText = styled.div`
  margin-right: 10px;
`;

// Komponen Navbar
const Navbar = () => {
  return (
    <NavbarContainer>
      <Logo>
        <LogoImage src="/gambar/gmat.jpeg" alt="Logo GMAT" /> {/* Pastikan path gambar benar */}
        <LogoText>Gadjah Mada Aerospace Team</LogoText>
      </Logo>
      <IDSection>
        <IDText>ID: 1234</IDText>
        <IDText>Time: 511</IDText>
      </IDSection>
    </NavbarContainer>
  );
};

export default Navbar;

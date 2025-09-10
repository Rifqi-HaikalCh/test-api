import { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import SearchBar from '../molecules/SearchBar';
import ProfileCard from '../molecules/ProfileCard';
import Text from '../atoms/Text';
import Spinner from '../atoms/Spinner';
import { AiOutlineInstagram } from 'react-icons/ai';

const InspectorContainer = styled.div`
    background: white;
    border-radius: 16px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    padding: 32px;
    max-width: 600px;
    width: 100%;
    margin: 0 auto;
`;

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    margin-bottom: 32px;
`;

const InstagramIcon = styled(AiOutlineInstagram)`
    font-size: 32px;
    background: linear-gradient(45deg, #405de6, #5851db, #833ab4, #c13584, #e1306c, #fd1d1d);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
`;

const LoadingContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    padding: 40px 20px;
`;

const ErrorContainer = styled.div`
    background: #fee;
    border: 1px solid #fcc;
    border-radius: 8px;
    padding: 16px;
    margin-top: 16px;
    text-align: center;
`;

const ProfileInspector = () => {
  // State buat nyimpan input username dari user
  const [username, setUsername] = useState('');
  // Data profil yang udah berhasil diambil dari API
  const [profileData, setProfileData] = useState(null);
  // Flag buat kasih tau lagi loading atau ngga
  const [loading, setLoading] = useState(false);
  // Pesan error kalo ada yang salah
  const [error, setError] = useState(null);

  // Fungsi utama buat ambil data profil Instagram
  const handleSearch = async () => {
    // Kalo username kosong, ya gausa lanjut
    if (!username.trim()) return;

    // Reset semua state dulu sebelum mulai request baru
    setLoading(true);
    setError(null);
    setProfileData(null);

    try {
      // Hit API Instagram tools
      const apiUrl = '/api/instagram_tools';
      const response = await axios.get(apiUrl, {
        params: { username: username.trim() },
      });

      // API return struktur: { data: { username, full_name, ... } }
      if (response.data && response.data.data) {
        const apiData = response.data.data;

        // Ambil field yang kita butuhin dari response API
        const formattedProfile = {
          username: apiData.username,
          full_name: apiData.full_name,
          follower_count: apiData.follower_count,
          following_count: apiData.following_count,
          media_count: apiData.media_count,
          is_private: apiData.is_private,
          spam_follower_setting_enabled: apiData.spam_follower_setting_enabled,
        };

        // Kalo berhasil, simpen data ke state
        setProfileData(formattedProfile);
      } else {
        // Kalo format response aneh, kasih error
        throw new Error("Gagal mengambil data, format respons tidak sesuai.");
      }
    } catch (err) {
      // Kalo ada error, tampilin pesan yang user-friendly
      setError(err.message || 'Terjadi kesalahan. Pastikan username benar dan coba lagi.');
    } finally {
      // Apapun hasilnya, matiin loading
      setLoading(false);
    }
  };

  // Handle perubahan input username
  const handleInputChange = (e) => {
    setUsername(e.target.value);
    // Kalo user mulai ngetik lagi, reset error message
    if (error) setError(null);
  };

  return (
    <InspectorContainer>
      <Header>
        <InstagramIcon />
        <Text variant="title">Instagram Profile Inspector</Text>
      </Header>

      <SearchBar
        value={username}
        onChange={handleInputChange}
        onSearch={handleSearch}
        loading={loading}
        placeholder="Enter Instagram username (e.g., dapurbuzzer)"
      />

      {loading && (
        <LoadingContainer>
          <Spinner size="32px" />
          <Text variant="body">Mencari data profil...</Text>
        </LoadingContainer>
      )}

      {error && (
        <ErrorContainer>
          <Text variant="body" style={{ color: '#d63031' }}>
            {error}
          </Text>
        </ErrorContainer>
      )}

      {profileData && !loading && (
        <ProfileCard profileData={profileData} />
      )}
    </InspectorContainer>
  );
};

export default ProfileInspector;

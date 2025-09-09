import styled from 'styled-components';
import Input from '../atoms/Input';
import Button from '../atoms/Button';

const SearchBarContainer = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  align-items: center;
`;

const InputWrapper = styled.div`
  flex: 1;
`;

const SearchBar = ({ 
  value, 
  onChange, 
  onSearch, 
  placeholder = "Enter Instagram username...", 
  loading = false,
  buttonText = "Get Info"
}) => {
  // Handler buat enter key - biar user bisa pencet enter instead of klik tombol
  const handleKeyPress = (e) => {
    // Cuma jalan kalo pencet Enter, ga lagi loading, dan input ga kosong
    if (e.key === 'Enter' && !loading && value.trim()) {
      onSearch();
    }
  };

  return (
    <SearchBarContainer>
      <InputWrapper>
        {/* Input field utama buat username Instagram */}
        <Input
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onKeyPress={handleKeyPress}
          disabled={loading}
        />
      </InputWrapper>
      {/* Tombol search - disabled kalo input kosong atau lagi loading */}
      <Button
        onClick={onSearch}
        disabled={!value.trim() || loading}
        loading={loading}
      >
        {buttonText}
      </Button>
    </SearchBarContainer>
  );

// Komponen SearchBar yang combine input sama button
// User experience-nya udah dipikirkan: bisa enter, ada loading state, dll
};

export default SearchBar;
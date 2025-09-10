import styled, { keyframes } from 'styled-components';

const buttonHover = keyframes`
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.02);
  }
`;

const StyledButton = styled.button`
  padding: 12px 24px;
  background: linear-gradient(135deg, #405de6, #5851db, #833ab4, #c13584);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    animation: ${buttonHover} 0.3s ease forwards;
    box-shadow: 0 8px 25px rgba(64, 93, 230, 0.3);
  }

  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  &:disabled:hover {
    animation: none;
    box-shadow: none;
  }
`;

const Button = ({ children, onClick, disabled, loading, ...props }) => {
  return (
    <StyledButton onClick={onClick} disabled={disabled || loading} {...props}>
      {/* Kalo lagi loading, ganti text jadi "Loading..." biar user tau lagi proses */}
      {loading ? 'Loading...' : children}
    </StyledButton>
  );
};

export default Button;
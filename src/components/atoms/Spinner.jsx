import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const StyledSpinner = styled.div`
  width: ${props => props.$size || '24px'};
  height: ${props => props.$size || '24px'};
  border: 3px solid #f3f3f3;
  border-top: 3px solid #405de6;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  margin: ${props => props.$center ? '0 auto' : '0'};
`;

const Spinner = ({ size, center = false }) => {
  // Simple loading spinner yang spin terus menerus
  // Warnanya disesuaikan dengan warna Instagram (biru)
  return <StyledSpinner $size={size} $center={center} />;
};

export default Spinner;
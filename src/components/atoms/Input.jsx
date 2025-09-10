import styled from 'styled-components';

const StyledInput = styled.input`
  padding: 12px 16px;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.3s ease;
  outline: none;
  width: 100%;
  box-sizing: border-box;

  &:focus {
    border-color: #405de6;
    box-shadow: 0 0 0 3px rgba(64, 93, 230, 0.1);
  }

  &::placeholder {
    color: #8e8e8e;
  }
`;

const Input = ({ placeholder, value, onChange, type = 'text', ...props }) => {
  return (
    <StyledInput
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      {...props}
    />
  );
};

// Komponen input yang simpel tapi elegant
// Udah ada focus state yang kece dengan border biru dan shadow

export default Input;
import styled from 'styled-components';

const StyledText = styled.span`
  color: ${props => {
    switch (props.$variant) {
      case 'title':
        return '#262626';
      case 'subtitle':
        return '#8e8e8e';
      case 'body':
        return '#262626';
      case 'label':
        return '#8e8e8e';
      default:
        return '#262626';
    }
  }};
  
  font-size: ${props => {
    switch (props.$variant) {
      case 'title':
        return '24px';
      case 'subtitle':
        return '16px';
      case 'body':
        return '14px';
      case 'label':
        return '12px';
      default:
        return '14px';
    }
  }};
  
  font-weight: ${props => {
    switch (props.$variant) {
      case 'title':
        return '700';
      case 'subtitle':
        return '600';
      case 'body':
        return '400';
      case 'label':
        return '500';
      default:
        return '400';
    }
  }};
  
  line-height: 1.4;
  display: ${props => props.$block ? 'block' : 'inline'};
  margin: ${props => props.$margin || '0'};
`;

const Text = ({ children, variant = 'body', block = false, margin, ...props }) => {
  return (
    <StyledText $variant={variant} $block={block} $margin={margin} {...props}>
      {children}
    </StyledText>
  );
};

// Komponen Text yang flexible banget
// Bisa jadi title, subtitle, body, atau label - tinggal ganti variant aja
// Design system yang konsisten supaya UI-nya ga berantakan

export default Text;
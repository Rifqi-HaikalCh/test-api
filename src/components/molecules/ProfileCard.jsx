import styled, { keyframes } from 'styled-components';
import Text from '../atoms/Text';

const fadeInUp = keyframes`
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

const CardContainer = styled.div`
    background: white;
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    animation: ${fadeInUp} 0.5s ease-out;
    margin-top: 24px;
`;

const InfoList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
`;

const InfoItem = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 0;
    border-bottom: 1px solid #efefef;

    &:last-child {
        border-bottom: none;
    }
`;

const Label = styled(Text)`
    font-weight: 600;
    color: #555;
`;

const Value = styled(Text)`
    color: #262626;
    text-align: right;
`;

const Badge = styled.span`
    padding: 4px 8px;
    border-radius: 6px;
    font-size: 12px;
    font-weight: 600;
    color: white;
    background-color: ${props => props.$isOn ? '#e74c3c' : '#2ecc71'}; // Merah jika ON, Hijau jika OFF
`;

const ProfileCard = ({ profileData }) => {
  // Destructure semua data profil yang udah kita dapet dari API
  const {
    username,
    full_name,
    follower_count,
    following_count,
    media_count,
    is_private,
    spam_follower_setting_enabled
  } = profileData;

  return (
    <CardContainer>
      <InfoList>
        <InfoItem>
          <Label variant="body">Username:</Label>
          <Value variant="body">@{username}</Value>
        </InfoItem>
        <InfoItem>
          <Label variant="body">Nama Lengkap:</Label>
          <Value variant="body">{full_name}</Value>
        </InfoItem>
        <InfoItem>
          <Label variant="body">Follower Count:</Label>
          {/* Format angka pake locale Indonesia biar ada titiknya (1.000.000) */}
          <Value variant="body">{follower_count.toLocaleString('id-ID')}</Value>
        </InfoItem>
        <InfoItem>
          <Label variant="body">Following Count:</Label>
          <Value variant="body">{following_count.toLocaleString('id-ID')}</Value>
        </InfoItem>
        <InfoItem>
          <Label variant="body">Post Count:</Label>
          <Value variant="body">{media_count.toLocaleString('id-ID')}</Value>
        </InfoItem>
        <InfoItem>
          <Label variant="body">Private:</Label>
          <Value>
            {/* Badge dengan warna dinamis: merah kalo ON, ijo kalo OFF */}
            <Badge $isOn={is_private}>
              {is_private ? 'private is ON' : 'private is OFF'}
            </Badge>
          </Value>
        </InfoItem>
        <InfoItem>
          <Label variant="body">Spam Settings:</Label>
          <Value>
            {/* Spam filter setting - penting buat tau akun ini strict atau ngga */}
            <Badge $isOn={spam_follower_setting_enabled}>
              {spam_follower_setting_enabled ? 'Spam Filter is ON' : 'Spam Filter is OFF'}
            </Badge>
          </Value>
        </InfoItem>
      </InfoList>
    </CardContainer>
  );
};

// Card component yang nampilkin data profil Instagram dalam bentuk list yang rapi
// Animasi fadeInUp bikin pengalaman user lebih smooth
// Badge system buat status (private/spam filter) dengan color coding yang jelas

export default ProfileCard;

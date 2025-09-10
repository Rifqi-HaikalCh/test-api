import styled from 'styled-components';
import ProfileInspector from "./components/organisms/ProfileInspector.jsx";

// Container utama aplikasi dengan background putih bersih
const ContainerAplikasi = styled.div`
  min-height: 100vh;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
`;

// Komponen App utama - entry point aplikasi
function App() {
  return (
    <ContainerAplikasi>
      {/* Cuma ada satu component utama aja - ProfileInspector */}
      <ProfileInspector />
    </ContainerAplikasi>
  );
}

export default App;

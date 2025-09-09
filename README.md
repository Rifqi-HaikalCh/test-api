# Instagram Profile Inspector

A modern React.js application that fetches and displays Instagram user profile information using a clean, minimalist interface. Built with Atomic Design principles and styled-components for a maintainable and scalable codebase.

## 🌟 Features

- **Clean UI/UX**: Minimalist design with Instagram-inspired colors and animations
- **Real-time Search**: Fetch Instagram profile data with username search
- **Responsive Design**: Works seamlessly across different screen sizes
- **Loading States**: Elegant loading spinners and animations
- **Error Handling**: User-friendly error messages
- **Modern Architecture**: Built with Atomic Design methodology

## 🚀 Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd test-api
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173` (or the port shown in your terminal)

### Build for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## 🏗️ Project Structure

This project follows **Atomic Design** principles, organizing components into a hierarchical structure:

```
src/
├── components/
│   ├── atoms/           # Basic building blocks
│   │   ├── Button.jsx   # Reusable button component
│   │   ├── Input.jsx    # Form input component
│   │   ├── Text.jsx     # Typography component
│   │   ├── Image.jsx    # Image component with styling options
│   │   └── Spinner.jsx  # Loading spinner component
│   ├── molecules/       # Simple combinations of atoms
│   │   ├── SearchBar.jsx    # Search input with button
│   │   └── ProfileCard.jsx  # Profile information display
│   ├── organisms/       # Complex UI components
│   │   └── ProfileInspector.jsx # Main application logic
│   ├── templates/       # Page-level layout components
│   └── pages/           # Complete pages
├── App.jsx              # Main application component
└── main.jsx            # Application entry point
```

### Atomic Design Methodology Explained

- **🔸 Atoms**: The smallest, most basic UI elements (buttons, inputs, text, images)
  - Cannot be broken down further without losing functionality
  - Highly reusable across the application
  - Examples: `Button`, `Input`, `Text`, `Image`

- **🔹 Molecules**: Simple combinations of atoms that work together
  - Form a distinct unit of functionality
  - Still relatively simple and reusable
  - Examples: `SearchBar` (Input + Button), `ProfileCard` (Image + Text elements)

- **🔶 Organisms**: Complex components made of molecules and atoms
  - Represent major sections of an interface
  - More specific in purpose and less reusable
  - Examples: `ProfileInspector` (complete feature with search and display)

- **🔷 Templates**: Page-level layouts that organize organisms
  - Define the overall page structure
  - Focus on content placement rather than final content

- **🔸 Pages**: Specific instances of templates with actual content
  - The final, complete user interface
  - Represent what users actually see and interact with

## 🛠️ Technologies Used

- **React 18**: Latest version with modern hooks
- **Vite**: Fast build tool and development server
- **Styled Components**: CSS-in-JS for component styling
- **Axios**: HTTP client for API requests
- **React Icons**: Icon library for UI elements

## 🔌 API Integration & Web Scraping

⚠️ **PENTING - Implementasi API Terbaru**: Aplikasi ini sekarang menggunakan pendekatan **web scraping** untuk mengambil data profil Instagram.

### Cara Kerja API
- **Endpoint**: `https://sprintpedia.id/page/instagram_tools`
- **Method**: GET dengan query parameter
- **Format URL**: `https://sprintpedia.id/page/instagram_tools?username=dapurbuzzer`
- **Response Type**: HTML document (bukan JSON)

### Proses Web Scraping
1. **Request GET** ke endpoint dengan username sebagai query parameter
2. **Receive HTML** response dari server
3. **Parse HTML** menggunakan browser `DOMParser` API
4. **Extract Data** menggunakan CSS selectors:
   - Profile picture: `img.profile-pic, img[alt*="profile"]`
   - Full name: `h1.full-name, h1`
   - Biography: `.bio p, .biography`
   - Follower count: `.follower-count, [class*="follower"]`
   - Following count: `.following-count, [class*="following"]`
   - Verification: `.verified, [class*="verified"]`

### ⚠️ Keterbatasan CORS (Cross-Origin Resource Sharing)

**MASALAH UTAMA**: Request langsung dari browser ke `sprintpedia.id` kemungkinan besar akan **gagal di production** karena kebijakan CORS browser.

**Solusi yang Tersedia**:

1. **Development Mode**: 
   - Aplikasi menggunakan mock HTML server untuk testing
   - Data dummy disediakan untuk demonstrasi fitur

2. **Production Mode (Direkomendasikan)**:
   ```
   Buat server-side proxy yang:
   1. Menerima request dari client
   2. Melakukan web scraping di server
   3. Mengembalikan data JSON yang clean
   4. Menangani CORS headers dengan benar
   ```

3. **Alternative Solutions**:
   - Gunakan browser extension untuk bypass CORS (hanya untuk development)
   - Implementasi serverless function (Vercel, Netlify)
   - Gunakan CORS proxy service (tidak direkomendasikan untuk production)

### Displayed Profile Information

- Profile picture (dengan fallback placeholder)
- Full name dengan verification badge (jika terverifikasi)
- Username yang dicari
- Biography/bio akun
- Follower count (diformat dengan K/M untuk angka besar)
- Following count (diformat dengan K/M untuk angka besar)

## 🎨 Design Features

### Visual Elements
- **Instagram-inspired gradient colors**
- **Smooth animations and transitions**
- **Clean typography and spacing**
- **Responsive card-based layout**
- **Micro-interactions on user actions**

### User Experience
- **Real-time validation and feedback**
- **Loading states with spinners**
- **Error handling with clear messages**
- **Keyboard navigation support (Enter to search)**

## 🧪 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint for code quality

## 📝 Code Style

The project follows modern React best practices:

- Functional components with hooks
- Clean, readable code structure
- Consistent naming conventions
- Proper component separation
- Error boundaries and loading states

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

Built with ❤️ using React.js and Atomic Design principles

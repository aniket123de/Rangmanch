# Rangmanch - Social Media Management Platform

A modern, feature-rich web application for managing social media profiles and content, built with React and styled with Tailwind CSS. Rangmanch provides a comprehensive solution for individuals and businesses to streamline their social media presence with an intuitive, responsive interface.

## 🚀 Features

### Core Features
- **🌓 Dark/Light Mode Toggle**: Seamless theme switching for optimal user experience
- **👤 User Authentication**: Secure login and signup system with form validation
- **📱 Responsive Design**: Mobile-first approach ensuring compatibility across all devices
- **🎨 Modern UI with Animations**: Smooth transitions and micro-interactions powered by Framer Motion
- **🔒 Secure Authentication**: Protected routes and secure session management
- **📊 Social Media Profile Management**: Centralized dashboard for managing multiple social profiles
- **💼 Business Account Support**: Enhanced features for business users and organizations

### User Interface Features
- **Intuitive Navigation**: Clean, organized layout with easy-to-use navigation
- **Interactive Components**: Engaging UI elements with hover states and animations
- **Loading States**: Visual feedback during data fetching and processing
- **Error Handling**: User-friendly error messages and fallback states
- **Accessibility**: WCAG compliant design with proper ARIA labels and keyboard navigation

## 🛠 Tech Stack

### Frontend
- **React.js**: Modern JavaScript library for building user interfaces
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Framer Motion**: Production-ready motion library for React animations
- **React Router**: Declarative routing for React applications
- **Styled Components**: CSS-in-JS library for component-level styling
- **React Icons**: Popular icon library with extensive icon collections

### Development Tools
- **Vite**: Fast build tool and development server
- **ESLint**: Code linting for maintaining code quality
- **Prettier**: Code formatting for consistent style

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js**: Version 14.0 or higher
- **npm**: Version 6.0 or higher (comes with Node.js)
- **Git**: For version control

### Recommended
- **yarn**: Alternative package manager (optional)
- **VS Code**: Recommended IDE with React and Tailwind CSS extensions

## 🚀 Getting Started

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/aniket123de/Rangmanch.git
   cd Rangmanch
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or if you prefer yarn
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or with yarn
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:5173](http://localhost:5173) to view the application

### Environment Setup

Create a `.env` file in the root directory for environment variables:

```env
VITE_API_URL=your_api_url_here
VITE_APP_NAME=Rangmanch
```

## 📁 Project Structure

```
src/
├── assets/                 # Static assets
│   ├── images/            # Image files
│   ├── icons/             # Icon files
│   └── fonts/             # Custom fonts
├── components/            # Reusable components
│   ├── common/           # Common UI components
│   ├── forms/            # Form components
│   ├── layout/           # Layout components
│   └── ui/               # Base UI components
├── context/              # React context providers
│   ├── AuthContext.js    # Authentication context
│   ├── ThemeContext.js   # Theme management context
│   └── UserContext.js    # User data context
├── pages/                # Page components
│   ├── auth/             # Authentication pages
│   ├── dashboard/        # Dashboard pages
│   ├── profile/          # Profile management pages
│   └── settings/         # Settings pages
├── hooks/                # Custom React hooks
├── utils/                # Utility functions
├── services/             # API services
├── animation/            # Animation utilities
│   ├── variants.js       # Framer Motion variants
│   └── transitions.js    # Animation transitions
├── styles/               # Global styles
└── App.jsx               # Main App component
```

## 🎨 Component Architecture

### Core Components

#### Layout Components
- **Header**: Navigation bar with user menu and theme toggle
- **Sidebar**: Navigation sidebar for dashboard pages
- **Footer**: Site footer with links and information

#### UI Components
- **Button**: Reusable button component with variants
- **Input**: Form input components with validation
- **Modal**: Reusable modal component
- **Card**: Content card component
- **Avatar**: User avatar component

#### Feature Components
- **AuthForm**: Login and signup forms
- **ProfileCard**: User profile display
- **SocialMediaCard**: Social media account management
- **Dashboard**: Main dashboard interface

## 🔧 Available Scripts

### Development
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

### Code Quality
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors automatically
- `npm run format` - Format code with Prettier

### Testing
- `npm run test` - Run tests
- `npm run test:coverage` - Run tests with coverage report

## 🎯 Usage Guide

### Authentication Flow

1. **Sign Up**: New users can create an account with email and password
2. **Login**: Existing users can sign in with their credentials
3. **Protected Routes**: Authenticated users can access dashboard and profile pages
4. **Logout**: Users can securely log out from any authenticated page

### Profile Management

1. **View Profile**: Users can view their profile information
2. **Edit Profile**: Update personal information, avatar, and bio
3. **Social Media Integration**: Connect and manage multiple social media accounts
4. **Privacy Settings**: Control visibility and privacy preferences

### Dashboard Features

1. **Overview**: Summary of social media activity and statistics
2. **Content Management**: Create, edit, and schedule posts
3. **Analytics**: View engagement metrics and performance data
4. **Account Management**: Manage connected social media accounts

## 🎨 Theming and Customization

### Theme Configuration

The application supports dark and light themes with the following customization options:

- **Color Palette**: Customizable primary, secondary, and accent colors
- **Typography**: Configurable font families and sizes
- **Spacing**: Consistent spacing system using Tailwind CSS
- **Animations**: Customizable animation timing and easing

### Tailwind CSS Configuration

```javascript
// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          500: '#3b82f6',
          900: '#1e3a8a',
        }
      }
    }
  }
}
```

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deployment Options

1. **Vercel**: Recommended for React applications
2. **Netlify**: Easy deployment with continuous integration
3. **GitHub Pages**: Free hosting for open-source projects
4. **Docker**: Containerized deployment

### Environment Variables

Set the following environment variables for production:

```env
NODE_ENV=production
VITE_API_URL=https://your-api-domain.com
VITE_APP_NAME=Rangmanch
```

## 🤝 Contributing

We welcome contributions to Rangmanch! Please follow these guidelines:

### Development Workflow

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Follow coding standards**
   - Use meaningful commit messages
   - Follow the existing code style
   - Add tests for new features
5. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
6. **Push to your branch**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request**

### Code Style Guidelines

- Use functional components with hooks
- Follow React best practices
- Use TypeScript for type safety (if applicable)
- Write meaningful component and variable names
- Add comments for complex logic
- Ensure responsive design

### Pull Request Process

1. Update the README.md with details of changes if applicable
2. Update the version numbers following SemVer
3. Ensure all tests pass
4. Request review from maintainers

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

Special thanks to the following projects and communities:

- **[React](https://reactjs.org/)** - The library that powers our UI
- **[Tailwind CSS](https://tailwindcss.com/)** - For the amazing utility-first CSS framework
- **[Framer Motion](https://www.framer.com/motion/)** - For beautiful animations
- **[React Router](https://reactrouter.com/)** - For seamless navigation
- **[React Icons](https://react-icons.github.io/react-icons/)** - For the comprehensive icon library
- **[Vite](https://vitejs.dev/)** - For the lightning-fast build tool

## 👥 Team & Credits

This project is developed and maintained by:

- **[Anik Paul](https://github.com/Anik-Paul-toj)** - Founder & CEO
- **[Aniket De](https://github.com/aniket123de)** - Tech Lead
- **[Adrish Basak](https://github.com/bepoooe)** - Head of Product

### Contributors

We appreciate all the contributors who have helped make Rangmanch better:

<a href="https://github.com/Anik-Paul-toj">
  <img src="https://github.com/Anik-Paul-toj.png" width="50" height="50" alt="Anik Paul" title="Anik Paul">
</a>
<a href="https://github.com/aniket123de">
  <img src="https://github.com/aniket123de.png" width="50" height="50" alt="Aniket" title="Aniket">
</a>
<a href="https://github.com/bepoooe">
  <img src="https://github.com/bepoooe.png" width="50" height="50" alt="Bepoooe" title="Bepoooe">
</a>

---

**Made with ❤️ by the Rangmanch Team**

*For more information, visit our [GitHub repository](https://github.com/aniket123de/Rangmanch)*

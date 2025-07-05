# K2K - Organic Food E-Commerce Platform

[![React](https://img.shields.io/badge/React-19.1.0-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2.6-purple.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.4-38B2AC.svg)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-11.6.0-orange.svg)](https://firebase.google.com/)
[![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-2.7.0-purple.svg)](https://redux-toolkit.js.org/)

A modern, full-featured e-commerce platform for organic food products including ghee, oils, and honey. Built with React, TypeScript, and Firebase, featuring a comprehensive admin dashboard, user authentication, and a seamless shopping experience.

## 🌟 Features

### 🛍️ Customer Features
- **Product Catalog**: Browse organic ghee, oils, and honey products
- **Advanced Filtering**: Filter by category, price range, availability, and search
- **Product Details**: Detailed product pages with benefits, images, and variants
- **Shopping Cart**: Persistent cart with quantity management
- **User Authentication**: Phone number and email-based authentication
- **Order Management**: Track orders and view order history
- **Checkout Process**: Multi-step checkout with address and payment
- **Traceability**: Product sourcing and quality assurance information
- **Blog System**: Educational content about organic products
- **Responsive Design**: Mobile-first responsive design

### 👨‍💼 Admin Features
- **Dashboard Analytics**: Sales, orders, and customer insights
- **Product Management**: Add, edit, and manage products with variants
- **Order Management**: Process and track customer orders
- **Customer Management**: View and manage customer accounts
- **Inventory Management**: Stock tracking and variant management
- **Content Management**: Blog and policy page management

### 🎨 UI/UX Features
- **Modern Design**: Clean, professional interface with custom branding
- **Animations**: Smooth transitions and micro-interactions
- **Toast Notifications**: User feedback and status updates
- **Loading States**: Skeleton loaders and loading indicators
- **Error Handling**: Graceful error handling and user feedback

## 🚀 Tech Stack

### Frontend
- **React 19.1.0** - Modern React with latest features
- **TypeScript 5.8.3** - Type-safe development
- **Vite 6.2.6** - Fast build tool and dev server
- **Tailwind CSS 4.1.4** - Utility-first CSS framework
- **Redux Toolkit 2.7.0** - State management
- **React Router DOM 7.5.0** - Client-side routing

### UI Components
- **Shadcn/ui** - Modern component library
- **Radix UI** - Accessible component primitives
- **Framer Motion 12.7.2** - Animation library
- **Lucide React** - Icon library
- **React Icons** - Additional icon sets

### Backend & Services
- **Firebase 11.6.0** - Backend-as-a-Service
  - Authentication
  - Firestore Database
  - Cloud Storage
  - Analytics
- **Axios 1.8.4** - HTTP client

### Forms & Validation
- **React Hook Form 7.55.0** - Form management
- **Zod 3.24.2** - Schema validation
- **Hookform Resolvers 5.0.1** - Form validation integration

### Charts & Analytics
- **ApexCharts 4.5.0** - Interactive charts
- **Chart.js 4.4.8** - Chart library
- **React ApexCharts 1.7.0** - React wrapper
- **React Chart.js 2 5.3.0** - React wrapper

### Additional Libraries
- **Swiper 11.2.6** - Touch slider
- **React Toastify 11.0.5** - Toast notifications
- **Date-fns 4.1.0** - Date utilities
- **React Phone Input 2** - Phone number input

## 📁 Project Structure

```
K2K/
├── public/                    # Static assets
│   ├── assets/               # Images, banners, logos
│   ├── favicon/              # Favicon files
│   └── traceabilityImg/      # Traceability images
├── src/
│   ├── components/           # Reusable components
│   │   ├── admin/           # Admin-specific components
│   │   ├── authComponents/  # Authentication components
│   │   ├── checkout/        # Checkout flow components
│   │   ├── common/          # Shared components
│   │   ├── homePageComponents/ # Homepage components
│   │   ├── kishanParivar/   # Kishan Parivar components
│   │   ├── products/        # Product-related components
│   │   ├── traceability/    # Traceability components
│   │   └── ui/              # Base UI components
│   ├── context/             # React contexts
│   ├── layout/              # Layout components
│   ├── lib/                 # Utility functions
│   ├── mockData/            # Sample data
│   ├── pages/               # Page components
│   │   ├── admin/           # Admin pages
│   │   ├── authPages/       # Authentication pages
│   │   └── policyPages/     # Policy pages
│   ├── services/            # API and service layer
│   │   ├── api/            # API functions
│   │   └── firebase/       # Firebase configuration
│   ├── store/               # Redux store
│   │   └── slices/         # Redux slices
│   ├── types/               # TypeScript type definitions
│   ├── App.tsx              # Main app component
│   ├── AppProvider.tsx      # App-level providers
│   ├── main.tsx            # Entry point
│   └── index.css           # Global styles
├── components.json          # Shadcn/ui configuration
├── tailwind.config.js       # Tailwind configuration
├── vite.config.ts          # Vite configuration
├── netlify.toml            # Netlify deployment config
└── package.json            # Dependencies and scripts
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Firebase project setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd K2K
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Environment Variables
Create a `.env` file in the root directory with your Firebase configuration:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id

# Optional: reCAPTCHA (if using App Check)
VITE_RECAPTCHA_SITE_KEY=your_recaptcha_site_key
```

### 4. Firebase Setup
1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication (Phone and Email/Password providers)
3. Create a Firestore database
4. Set up Cloud Storage
5. Configure security rules for Firestore and Storage
6. Copy the configuration to your `.env` file

### 5. Run Development Server
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

## 📱 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint

# Additional commands
npm run type-check   # TypeScript type checking
```

## 🏗️ Architecture

### State Management
- **Redux Toolkit**: Global state management for cart, authentication, and orders
- **React Context**: Local state for UI components and providers
- **React Hook Form**: Form state management

### Routing
- **React Router DOM**: Client-side routing with nested routes
- **Protected Routes**: Admin routes with authentication guards
- **Public/Private Layouts**: Separate layouts for different user types

### Data Flow
1. **API Layer**: Centralized API functions in `services/api/`
2. **Firebase Integration**: Direct Firebase SDK usage for real-time data
3. **State Updates**: Redux actions trigger UI updates
4. **Form Handling**: React Hook Form with Zod validation

### Component Architecture
- **Atomic Design**: Components organized by complexity and reusability
- **Composition**: Flexible component composition patterns
- **Props Interface**: Strongly typed props with TypeScript
- **Custom Hooks**: Reusable logic extraction

## 🎨 Styling & Design

### Design System
- **Custom Color Palette**: Brand-specific green (#0C6908) and yellow (#fffbe8)
- **Typography**: Multiple font families (Cormorant Garamond, DM Sans, Quando, Titillium Web)
- **Spacing**: Consistent spacing scale using Tailwind utilities
- **Animations**: Custom keyframes and transitions

### Responsive Design
- **Mobile-First**: Designed for mobile devices first
- **Breakpoints**: Tailwind's responsive breakpoints
- **Flexible Layouts**: CSS Grid and Flexbox for adaptive layouts

### Component Styling
- **Tailwind CSS**: Utility-first styling approach
- **CSS Modules**: Scoped styling for complex components
- **Custom Classes**: Brand-specific utility classes

## 🔐 Authentication & Security

### Authentication Methods
- **Phone Authentication**: SMS-based verification
- **Email/Password**: Traditional email authentication
- **Password Reset**: Secure password reset flow

### Security Features
- **Firebase Security Rules**: Database and storage access control
- **Input Validation**: Zod schema validation
- **XSS Protection**: React's built-in XSS protection
- **CSRF Protection**: Firebase's built-in CSRF protection

## 📊 Admin Dashboard

### Analytics & Insights
- **Sales Analytics**: Revenue tracking and trends
- **Order Management**: Order processing and status updates
- **Customer Insights**: Customer behavior and preferences
- **Inventory Tracking**: Stock levels and variant management

### Content Management
- **Product Management**: CRUD operations for products
- **Variant Management**: Product variant creation and editing
- **Blog Management**: Content creation and editing
- **Policy Pages**: Terms, privacy, and shipping policies

## 🚀 Deployment

### Netlify Deployment
The project is configured for Netlify deployment with the following setup:

1. **Build Command**: `npm run build`
2. **Publish Directory**: `dist`
3. **Redirects**: SPA routing configuration in `netlify.toml`

### Environment Variables
Set the following environment variables in your Netlify dashboard:
- All Firebase configuration variables
- Any additional API keys or secrets

### Custom Domain
Configure your custom domain in the Netlify dashboard and update DNS settings accordingly.

## 🧪 Testing

### Manual Testing Checklist
- [ ] User registration and login
- [ ] Product browsing and filtering
- [ ] Shopping cart functionality
- [ ] Checkout process
- [ ] Order placement and tracking
- [ ] Admin dashboard access
- [ ] Product management
- [ ] Order processing
- [ ] Responsive design on different devices

### Performance Testing
- [ ] Lighthouse audit
- [ ] Core Web Vitals
- [ ] Bundle size analysis
- [ ] Loading performance

## 🔧 Configuration

### Tailwind Configuration
Custom configuration in `tailwind.config.js`:
- Custom color palette
- Typography settings
- Animation keyframes
- Font families

### Vite Configuration
Build optimization in `vite.config.ts`:
- Path aliases
- Plugin configuration
- Development server settings

### ESLint Configuration
Code quality rules in `eslint.config.js`:
- React-specific rules
- TypeScript integration
- Code formatting standards

## 📈 Performance Optimization

### Build Optimization
- **Code Splitting**: Automatic route-based code splitting
- **Tree Shaking**: Unused code elimination
- **Minification**: Production build optimization
- **Asset Optimization**: Image and font optimization

### Runtime Optimization
- **Lazy Loading**: Component and route lazy loading
- **Memoization**: React.memo and useMemo for expensive operations
- **Virtual Scrolling**: Large list optimization
- **Image Optimization**: Responsive images and lazy loading

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

### Code Standards
- Follow TypeScript best practices
- Use ESLint for code quality
- Write meaningful commit messages
- Add JSDoc comments for complex functions

## 📄 License

This project is proprietary software. All rights reserved.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🔄 Version History

### v1.0.0 (Current)
- Initial release
- Complete e-commerce functionality
- Admin dashboard
- User authentication
- Product management
- Order processing
- Responsive design

---

**Built with ❤️ for organic food lovers**


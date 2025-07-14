# Hotel Booking Application

A modern, full-stack hotel booking application built with React, TypeScript, and Redux Toolkit. This application provides a comprehensive solution for hotel management and room reservations with a beautiful, responsive user interface.

##  Features

### User Management
- **User Registration & Authentication**: Secure sign-up and login system
- **Personal Area**: User profile management and booking history
- **User Points System**: Loyalty points tracking for users

### Hotel Management
- **Hotel Browsing**: View all available hotels with detailed information
- **Hotel Details**: Comprehensive hotel information including:
  - Hotel name, address, and description
  - Star ratings
  - Room availability
  - User reviews and responses
  - Hotel images
- **Hotel Search & Filtering**: Find hotels based on various criteria

### Room Management
- **Room Browsing**: View available rooms for each hotel
- **Room Details**: Detailed room information including:
  - Room types and amenities
  - Pricing information
  - Availability status
- **Room Booking**: Direct booking functionality

### Booking System
- **Order Management**: Complete booking process with:
  - Check-in and check-out date selection
  - Number of nights calculation
  - Total cost computation
  - Booking confirmation
- **Order History**: Track all user bookings
- **Order Success**: Confirmation pages and receipts

### Additional Features
- **Responsive Design**: Mobile-friendly interface
- **Video Background**: Engaging homepage with video content
- **Material-UI Components**: Modern, accessible UI components
- **Redux State Management**: Centralized state management
- **TypeScript**: Type-safe development

##  Technology Stack

### Frontend
- **React 18.3.1**: Modern React with hooks and functional components
- **TypeScript 5.6.2**: Type-safe JavaScript development
- **Vite 5.0.0**: Fast build tool and development server
- **Redux Toolkit 2.7.0**: State management with RTK Query
- **React Router DOM 6.20.0**: Client-side routing
- **Material-UI 6.2.0**: React component library
- **Axios 1.9.0**: HTTP client for API communication
- **Day.js 1.11.13**: Date manipulation library
- **Anime.js 3.2.2**: Animation library

### Development Tools
- **ESLint 9.15.0**: Code linting and formatting
- **TypeScript ESLint**: TypeScript-specific linting rules

##  Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── NavBar.tsx      # Navigation component
│   ├── HomePageComp.tsx # Homepage with video background
│   ├── AboutComp.tsx   # About page component
│   └── LoginSignUp.tsx # Authentication components
├── features/           # Feature-based components
│   ├── hotel/         # Hotel-related components
│   ├── room/          # Room-related components
│   ├── order/         # Order/booking components
│   └── user/          # User management components
├── models/            # TypeScript interfaces
│   ├── Hotel.ts       # Hotel data model
│   ├── Room.ts        # Room data model
│   ├── User.ts        # User data model
│   └── Order.ts       # Order data model
├── services/          # API service layer
│   ├── hotelService.ts # Hotel API calls
│   ├── userService.ts  # User API calls
│   ├── roomService.ts  # Room API calls
│   └── orderService.ts # Order API calls
├── store/             # Redux store configuration
│   └── store.ts       # Store setup and types
├── routers/           # Routing configuration
│   └── routing.tsx    # Application routes
└── cssComponents/     # Styling files
```

##  Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager
- Backend API server running on `http://localhost:8080`

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd react_project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the application for production
- `npm run lint` - Run ESLint to check code quality
- `npm run preview` - Preview the production build locally

##  Configuration

### Environment Variables
The application connects to a backend API running on `http://localhost:8080`. Make sure your backend server is running and accessible.

### API Endpoints
The application uses the following main API endpoints:
- `/api/hotel/*` - Hotel management endpoints
- `/api/user/*` - User management endpoints
- `/api/room/*` - Room management endpoints
- `/api/order/*` - Order management endpoints

##  UI/UX Features

- **Modern Design**: Clean, professional interface using Material-UI
- **Responsive Layout**: Works seamlessly on desktop, tablet, and mobile
- **Video Background**: Engaging homepage with video content
- **Smooth Animations**: Enhanced user experience with Anime.js
- **Accessible Components**: WCAG compliant UI components

##  Security Features

- **Type Safety**: Full TypeScript implementation for type safety
- **Input Validation**: Form validation and error handling
- **Secure API Communication**: Axios with proper error handling
- **State Management**: Centralized state with Redux Toolkit

##  Browser Support

The application supports all modern browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

##  Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

##  License

This project is licensed under the MIT License - see the LICENSE file for details.

##  Support

For support and questions, please contact the development team or create an issue in the repository.

---

**Built with using React, TypeScript, and Material-UI**

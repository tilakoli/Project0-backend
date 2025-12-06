# Ride Hailing Backend

## Tech Stack
Node.js + Express + TypeScript + MongoDB + JWT

## Project Structure
```
src/
├── config/         # Database connection
├── controllers/    # Business logic
├── middleware/     # Auth, validation, error handling
├── models/         # MongoDB schemas
├── routes/         # API endpoints
├── utils/          # JWT helpers
├── validators/     # Zod schemas
└── server.ts       # Entry point
```

## Key Features

### Authentication
- JWT-based auth (access + refresh tokens)
- Role-based authorization (rider/driver)
- Password hashing with bcrypt
- Token expiry: 1h (access), 7d (refresh)

### User Model
- Common: email, phone, password, role, profile
- Driver-specific: vehicle info (type, plate, model)

### Middleware
- `authenticate`: Verify JWT from Bearer token
- `authorize`: Role-based access control
- `validate`: Zod schema validation
- `errorHandler`: Centralized error handling

### Validation
- Zod schemas for register/login
- Email format, password length, required fields
- Field-specific error messages

## Environment Variables
```env
PORT=3000
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your-secret
JWT_EXPIRES_IN=1h
JWT_REFRESH_SECRET=your-refresh-secret
JWT_REFRESH_EXPIRES_IN=7d
```

## API Endpoints

**POST /api/auth/register** - Create user (rider/driver)  
**POST /api/auth/login** - Login with email/password  
**POST /api/auth/logout** - Logout (protected)  
**GET /api/auth/me** - Get current user (protected)

## Scripts
```bash
npm run dev    # Development with hot reload
npm run build  # Compile TypeScript
npm start      # Run production
```

## Configuration
- **Path Aliases**: Use `@/` instead of `../`
- **TypeScript**: Strict mode enabled
- **Error Handling**: Consistent JSON responses
- **Security**: Hashed passwords, JWT secrets in env

## Next Steps
- Real-time location tracking (Socket.io)
- Trip management system
- Driver-rider matching algorithm
- Payment integration (Stripe)
- Dynamic pricing with surge
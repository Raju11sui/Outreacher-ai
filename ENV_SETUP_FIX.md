# Environment Setup - Fixed Issues

## Issue Fixed: "Invalid URL" Error

### Problem
The application was throwing a `TypeError: Invalid URL` error because the OAuth environment variables were not configured in the `.env` file.

### Root Cause
The `getLoginUrl()` function in `client/src/const.ts` was trying to create a URL using `VITE_OAUTH_PORTAL_URL`, which was undefined, causing the `new URL()` constructor to fail.

### Solution Applied
Updated `.env` file with the following OAuth configuration:

```bash
# OAuth Configuration (Manus OAuth Portal)
OAUTH_SERVER_URL=https://oauth.manus.app
VITE_APP_ID=outreach-iq-dev
VITE_OAUTH_PORTAL_URL=https://oauth.manus.app

# JWT Secret for authentication (required for session management)
JWT_SECRET=development-secret-key-change-in-production-123456789
```

## Environment Variables Explained

### Required for OAuth
- **VITE_OAUTH_PORTAL_URL**: The OAuth portal URL for user authentication
- **VITE_APP_ID**: Your application ID for OAuth
- **OAUTH_SERVER_URL**: Backend OAuth server URL
- **JWT_SECRET**: Secret key for JWT token signing (required for session management)

### Required for AI
- **GOOGLE_GENERATIVE_AI_API_KEY**: Your Google Gemini API key

### Optional
- **DATABASE_URL**: MySQL database connection string (if using database)
- **OWNER_OPEN_ID**: Owner's OpenID for special privileges

## Development vs Production

### Development Setup (Current)
- Using Manus OAuth Portal at `oauth.manus.app`
- App ID: `outreach-iq-dev`
- JWT Secret: Development placeholder (change in production)

### Production Setup
For production deployment:
1. Replace `JWT_SECRET` with a strong, random secret key
2. Set up your own OAuth portal or continue using Manus OAuth
3. Update `VITE_APP_ID` with your production app ID
4. Configure `DATABASE_URL` for persistent storage

## Testing the Fix

1. **Restart the server** (already done automatically when .env changed)
2. **Open http://localhost:3000/** in your browser
3. The OAuth login button should now work without the "Invalid URL" error

## Notes

⚠️ **Important Security Notes:**
- The current JWT_SECRET is for development only
- Never commit your production `.env` file to version control
- Generate a strong random secret for production deployments
- The `.env` file is already in `.gitignore`

✅ **Status**: Environment configuration is now complete and the application should load without errors!

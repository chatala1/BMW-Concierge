# BMW Concierge Deployment Guide

This document outlines the requirements and configuration needed for deploying BMW Concierge with full OAuth and API integration.

## Network Requirements

### Firewall Allowlist

The following URLs need to be added to your firewall allowlist for proper functionality:

1. **Smartcar Dashboard Configuration**
   - `https://smartcar.com/docs/connect/dashboard-config`
   - Required for Smartcar API integration and vehicle connection setup

2. **GitHub OAuth**
   - `https://github.com/login/oauth/authorize`
   - `https://github.com/login/oauth/access_token`
   - `https://api.github.com/user`

3. **Smartcar OAuth**
   - `https://connect.smartcar.com/oauth/authorize`
   - `https://api.smartcar.com/v2.0/`

## Authentication Setup

### GitHub OAuth

1. **OAuth App Configuration**
   - Client ID: `Ov23liNCmhgdtQrBTgfI` (configured)
   - Redirect URI: `https://chatala1.github.io/BMW-Concierge/login.html`
   - Scopes: `user:email`

2. **Security Considerations**
   - ⚠️ **Important**: The current implementation uses demo authentication for GitHub Pages deployment
   - For production deployment with real GitHub OAuth, you need a backend service to handle token exchange
   - Client secrets should NEVER be exposed in client-side code

3. **Production OAuth Options**
   - Deploy serverless functions (Netlify Functions, Vercel, AWS Lambda)
   - Use GitHub Apps instead of OAuth Apps
   - Implement a backend API service
   - Use third-party OAuth proxy services

### Smartcar Integration

1. **API Configuration**
   - Client ID: (to be configured)
   - Redirect URI: `https://chatala1.github.io/BMW-Concierge/smartcar/callback`
   - Scopes: `read_vehicle_info read_location read_odometer control_security control_climate`

2. **Setup Steps**
   - Sign up for Smartcar developer account
   - Create a new application
   - Configure redirect URI
   - Add client ID to application configuration

3. **Vehicle Compatibility**
   - BMW vehicles with ConnectedDrive
   - Vehicle must support Smartcar API
   - User must have active BMW ConnectedDrive subscription

## Environment Configuration

### For GitHub Pages (Current Setup)

```yaml
# _config.yml
github:
  client_id: "Ov23liNCmhgdtQrBTgfI"
  redirect_uri: "https://chatala1.github.io/BMW-Concierge/login.html"

smartcar:
  client_id: "" # Configure with real Smartcar client ID
  redirect_uri: "https://chatala1.github.io/BMW-Concierge/smartcar/callback"
```

### For Production Deployment

Set up environment variables:

```bash
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
SMARTCAR_CLIENT_ID=your_smartcar_client_id
SMARTCAR_CLIENT_SECRET=your_smartcar_client_secret
```

## Testing

### Authentication Flow Test

1. **GitHub OAuth**
   ```
   https://chatala1.github.io/BMW-Concierge/login.html
   ```
   - Click "Continue with GitHub"
   - Should redirect to GitHub OAuth (or show demo mode)
   - After authentication, should redirect back to login page
   - Should show authenticated state

2. **Smartcar Integration**
   ```
   https://chatala1.github.io/BMW-Concierge/protected.html
   ```
   - Access dashboard
   - Click "Connect Vehicle"
   - Should redirect to Smartcar OAuth (or show demo mode)
   - After connection, should redirect to callback page
   - Should show connected vehicle status

### Demo Mode

When real credentials are not configured, the application runs in demo mode:

- **GitHub Authentication**: Simulates successful login with demo user
- **Smartcar Integration**: Displays simulated vehicle data
- **Vehicle Controls**: Shows demo responses for all actions

## Troubleshooting

### Common Issues

1. **OAuth Redirect Mismatch**
   - Ensure redirect URIs match exactly in OAuth app configuration
   - Check for trailing slashes and protocol (http vs https)

2. **CORS Errors**
   - Smartcar API calls may require server-side proxy for CORS
   - Consider using serverless functions for API calls

3. **Authentication Failures**
   - Check client IDs are correct and properly configured
   - Verify OAuth app is active and properly configured
   - Check browser console for detailed error messages

### Debug Mode

Enable debug logging by adding to browser console:

```javascript
localStorage.setItem('bmw_concierge_debug', 'true');
```

This will provide additional logging for authentication and API calls.

## Security Notes

- Never commit client secrets to version control
- Use environment variables for sensitive configuration
- Consider implementing rate limiting for API calls
- Regularly rotate OAuth credentials
- Monitor authentication logs for suspicious activity

## Support

For issues related to:
- **GitHub OAuth**: Check GitHub OAuth documentation
- **Smartcar API**: Refer to Smartcar developer documentation at https://smartcar.com/docs/
- **BMW Concierge**: Create an issue in the GitHub repository
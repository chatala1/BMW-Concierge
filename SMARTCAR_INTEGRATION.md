# Smartcar API Integration

This document describes the Smartcar API integration implemented in BMW Concierge.

## Redirect URI

The OAuth redirect URI for Smartcar integration is:

```
https://chatala1.github.io/BMW-Concierge/smartcar/callback
```

This endpoint is configured to handle OAuth authorization callbacks from Smartcar's API.

## Configuration

To enable Smartcar integration, update the `_config.yml` file with your Smartcar client ID:

```yaml
smartcar:
  client_id: "your_smartcar_client_id_here"
  redirect_uri: "https://chatala1.github.io/BMW-Concierge/smartcar/callback"
  scope: "read_vehicle_info read_location read_odometer control_security control_climate"
```

## Files Added/Modified

### New Files
- `smartcar/index.html` - Documentation page for Smartcar integration
- `smartcar/callback.html` - OAuth callback endpoint

### Modified Files
- `_config.yml` - Added Smartcar configuration
- `assets/js/auth.js` - Extended authentication system to support Smartcar OAuth
- `protected.html` - Added Vehicle Connection section to dashboard

## OAuth Flow

1. User clicks "Connect Vehicle" on the dashboard
2. System initiates OAuth flow with Smartcar
3. User is redirected to Smartcar for authorization
4. Smartcar redirects back to `/smartcar/callback` with authorization code
5. System exchanges code for access token (simulated in demo mode)
6. Dashboard shows connected state with vehicle controls

## Features

- OAuth 2.0 integration with Smartcar API
- Secure state validation during OAuth flow
- Vehicle connection status display
- Demo mode for testing without actual Smartcar credentials
- Real-time dashboard updates
- Error handling and user feedback

## Testing

The implementation includes a demo mode that simulates the OAuth flow for testing purposes when no Smartcar client ID is configured.
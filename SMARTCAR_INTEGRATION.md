# Smartcar API Integration

This document describes the Smartcar API integration implemented in BMW Concierge.

## Redirect URI

The OAuth redirect URI for Smartcar integration is:

```
https://chatala1.github.io/BMW-Concierge/smartcar/callback
```

This endpoint is configured to handle OAuth authorization callbacks from Smartcar's API.

## Configuration

The Smartcar integration is configured with the following settings in `_config.yml`:

```yaml
smartcar:
  client_id: "37a67e2d-bc6d-42be-9b82-6ee450489d2b"
  redirect_uri: "https://chatala1.github.io/BMW-Concierge/smartcar/callback"
  scope: "control_charge control_climate control_navigation control_pin control_security control_trunk read_alerts read_battery read_charge read_charge_events read_charge_locations read_charge_records read_climate read_compass read_diagnostics read_engine_oil read_extended_vehicle_info read_fuel read_location read_odometer read_security read_service_history read_speedometer read_thermometer read_tires read_user_profile read_vehicle_info read_vin"
  mode: "simulated"
```

The comprehensive scope list includes permissions for:
- **Control**: charge, climate, navigation, pin, security, trunk
- **Read Vehicle Info**: battery, charge data, climate, diagnostics, fuel, location, odometer, security, service history, tires, VIN
- **Read Sensor Data**: alerts, compass, speedometer, thermometer, engine oil

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
<img width="50" height="47" alt="BMW-Logo" src="https://github.com/user-attachments/assets/9ba64150-410c-4a1c-90a5-b900e21771eb" />

# MyConcierge
A companion experience to the MyBMW Application. Powered by Smartcar. [^1] [^2]

## Overview

BMW Concierge is a modern web application that provides a comprehensive dashboard experience for BMW vehicle owners. Built with Jekyll and designed with BMW's brand identity, this application demonstrates integration capabilities with vehicle APIs while maintaining transparency about data sources and demo functionality.

**Live Application**: [BMW Concierge Dashboard](https://chatala1.github.io/BMW-Concierge/)

## Core Features

### 1. Vehicle Dashboard
- **Demo Mode**: Transparent simulation of vehicle data for demonstration
- **API Ready**: Structured for future integration with real vehicle APIs  
- **Clear Indicators**: Always shows whether data is simulated or live
- **Real-time Updates**: Dynamic data display with status indicators

### 2. Analytics & Insights
- **Driving Pattern Tracking**: Monitor and analyze driving behavior
- **Efficiency Monitoring**: Track vehicle performance metrics
- **Service Reminders**: Maintenance scheduling and notifications
- **Trip Planning**: Route optimization with charging station integration



### 4. Security Considerations

- TLS verification enabled for all connections
- Certificate validation required
- Network request logging for monitoring
- Exponential backoff for retry strategies

## Usage Instructions

### For End Users

1. **Access the Application**
   ```
   https://chatala1.github.io/BMW-Concierge/
   ```

2. **Authentication**
   - Click "Login with GitHub" for demo authentication
   - Demo mode creates a sample user profile
   - All data displayed is clearly marked as simulated

3. **Dashboard Navigation**
   - Explore vehicle status and analytics
   - Test interactive features and controls
   - Review service reminders and trip planning

### For Developers

1. **Local Development Setup**
   ```bash
   # Install Ruby dependencies
   export PATH="$HOME/.local/share/gem/ruby/3.2.0/bin:$PATH"
   gem install --user-install jekyll bundler minima jekyll-feed
   
   # Build the site
   jekyll build
   
   # Start development server
   jekyll serve --host 0.0.0.0 --port 4000
   ```

2. **Development Server Access**
   - Local URL: `http://localhost:4000/BMW-Concierge/`
   - Auto-regeneration enabled for file changes
   - Build time: ~0.5 seconds (very fast)

3. **Testing Deployment**
   - Push changes to main branch triggers auto-deployment
   - GitHub Actions handles the complete build and deployment process
   - Deployment time: 2-3 minutes from push to live

## Expected Results

### Build Performance
- **Jekyll Build Time**: < 1 second
- **GitHub Actions Deployment**: 2-3 minutes
- **Development Server Startup**: 2-3 seconds

### Functionality Verification
- All dashboard widgets display correctly
- Authentication flow works in demo mode
- Interactive elements respond appropriately
- Mobile-responsive design functions properly

## Troubleshooting

### Build Issues
If builds fail after implementing setup changes:
1. Check workflow logs for network connectivity issues
2. Verify firewall allowlist is properly applied
3. Review dependency status messages
4. Ensure all critical services are accessible

### Local Development Issues
1. **"The minima theme could not be found"**:
   ```bash
   gem install --user-install minima jekyll-feed
   ```

2. **"jekyll: command not found"**:
   ```bash
   export PATH="$HOME/.local/share/gem/ruby/3.2.0/bin:$PATH"
   ```

3. **Development server not accessible**:
   - Ensure using `--host 0.0.0.0` flag
   - Check correct URL: `http://localhost:4000/BMW-Concierge/`

### Expected Warnings
These warnings are normal and can be ignored:
- SASS deprecation warnings about `@import` and color functions
- Console errors about blocked Google Fonts (expected in development)

## Maintenance

### Update Schedule
Update the firewall allowlist when:
- Adding new external dependencies
- Changing API endpoints
- Modifying authentication flows
- Adding new build tools or services

### Monitoring
The implementation includes:
- Automated deployment monitoring
- Network connectivity validation
- Build performance tracking
- Error logging and reporting

## Licensing & Compliance

**GNU General Public License v3.0**

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

### Build Status
[![CI - Branch Protection Checks](https://github.com/chatala1/BMW-Concierge/actions/workflows/ci.yml/badge.svg)](https://github.com/chatala1/BMW-Concierge/actions/workflows/ci.yml)

### Legal Disclaimers
[^1]: All logos and brand names are property of their respective owners, and the use does not imply endorsement of or affiliation with Smartcar.
[^2]: This project is not affiliated with BMW Group, BMW M GmbH, BMW AG or any subsidiaries.

## Support

For technical issues or questions:
1. Review the troubleshooting section above
2. Check existing [GitHub Issues](https://github.com/chatala1/BMW-Concierge/issues)
3. Create a new issue with detailed information about the problem
4. For deployment issues, review the GitHub Actions logs and deployment status

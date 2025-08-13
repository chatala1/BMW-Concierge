<img width="50" height="47" alt="BMW-Logo" src="https://github.com/user-attachments/assets/9ba64150-410c-4a1c-90a5-b900e21771eb" />

# MyConcierge
A companion experience to the MyBMW Application. Powered by Smartcar. [^1] [^2]

**Live Application**: [BMW Concierge Dashboard](https://chatala1.github.io/BMW-Concierge/)

---

## 📚 Documentation

<details open>
<summary><h3>🚗 Overview & Features</h3></summary>

### Overview

BMW Concierge is a modern web application that provides a comprehensive dashboard experience for BMW vehicle owners. Built with Jekyll and designed with BMW's brand identity, this application demonstrates integration capabilities with vehicle APIs while maintaining transparency about data sources and demo functionality.

### Core Features

#### 1. Secure Authentication System
- **GitHub OAuth Integration**: Secure access control with GitHub authentication
- **Session Management**: Robust user session handling and privacy protection
- **Demo Mode**: Transparent simulation for demonstration and development purposes

#### 2. Vehicle Dashboard
- **Demo Mode**: Transparent simulation of vehicle data for demonstration
- **API Ready**: Structured for future integration with real vehicle APIs  
- **Clear Indicators**: Always shows whether data is simulated or live
- **Real-time Updates**: Dynamic data display with status indicators

#### 3. Analytics & Insights
- **Driving Pattern Tracking**: Monitor and analyze driving behavior
- **Efficiency Monitoring**: Track vehicle performance metrics
- **Service Reminders**: Maintenance scheduling and notifications
- **Trip Planning**: Route optimization with charging station integration

#### 4. Transparent Operation
- **Demo Mode Indicators**: Clear labeling when viewing simulated data
- **API Abstraction**: Clean separation between demo and production functionality
- **Future Ready**: Easy configuration switch for real API integration

For detailed information about API transparency and demo mode implementation, see the **API Documentation** tab below.

### Build Status
[![CI - Branch Protection Checks](https://github.com/chatala1/BMW-Concierge/actions/workflows/ci.yml/badge.svg)](https://github.com/chatala1/BMW-Concierge/actions/workflows/ci.yml)

</details>

<details>
<summary><h3>⚙️ Development & Deployment</h3></summary>

### Local Development Setup

#### Quick Start
```bash
# Install Ruby dependencies
export PATH="$HOME/.local/share/gem/ruby/3.2.0/bin:$PATH"
gem install --user-install jekyll bundler minima jekyll-feed

# Build the site
jekyll build

# Start development server
jekyll serve --host 0.0.0.0 --port 4000
```

#### Development Server Access
- Local URL: `http://localhost:4000/BMW-Concierge/`
- Auto-regeneration enabled for file changes
- Build time: ~0.5 seconds (very fast)

### GitHub Actions Setup Implementation

The BMW Concierge application uses GitHub Actions for automated deployment with specific setup requirements to ensure proper functionality before any firewall restrictions are applied.

#### Deployment Configuration Files

##### `.github/workflows/jekyll-gh-pages.yml`
Enhanced Jekyll workflow with pre-firewall setup steps including:
- Environment variable configuration
- Firewall allowlist setup
- Dependency pre-validation
- Network connectivity checks

##### `.github/firewall-config.yml`
Comprehensive firewall configuration defining network allowlist for:
- GitHub services (github.com, api.github.com)
- Authentication endpoints (OAuth flows)
- External APIs (Smartcar, BMW resources)
- Build dependencies (RubyGems, Jekyll)
- GitHub Pages deployment

##### `.github/actions-setup-steps.yml`
Detailed setup steps configuration including:
- Ordered execution steps
- Environment preparation
- Network validation
- Error handling strategies
- Security configurations

#### Setup Steps Execution Order

1. **Environment Variables Configuration**
   - Set JEKYLL_ENV=production
   - Configure BMW_CONCIERGE_VERSION
   - Set Ruby gem paths

2. **Firewall Allowlist Application**
   - GitHub services allowlist
   - Authentication endpoints
   - External API access
   - Build dependencies

3. **Dependency Pre-validation**
   - GitHub API connectivity check
   - RubyGems repository access
   - Optional service availability

4. **Build Environment Preparation**
   - Ruby version verification
   - Jekyll environment setup
   - Asset compilation preparation

### Network Dependencies

#### Critical (Required)
- **GitHub API** (`api.github.com`) - OAuth authentication
- **RubyGems** (`rubygems.org`) - Jekyll dependencies
- **GitHub Services** (`github.com`) - Repository access

#### Optional (Non-blocking)
- **Smartcar API** (`smartcar.com`) - Vehicle integration
- **BMW Resources** (`bmw.com`) - Brand links

### Network Requirements & Firewall Allowlist

The following URLs need to be added to your firewall allowlist for proper functionality:

#### Smartcar Dashboard Configuration
- `https://smartcar.com/docs/connect/dashboard-config`
- Required for Smartcar API integration and vehicle connection setup

#### GitHub OAuth
- `https://github.com/login/oauth/authorize`
- `https://github.com/login/oauth/access_token`
- `https://api.github.com/user`

#### Smartcar OAuth
- `https://connect.smartcar.com/oauth/authorize`
- `https://auth.smartcar.com/oauth/token`
- `https://api.smartcar.com/`

### Security Considerations

- TLS verification enabled for all connections
- Certificate validation required
- Network request logging for monitoring
- Exponential backoff for retry strategies

### Testing Deployment
- Push changes to main branch triggers auto-deployment
- GitHub Actions handles the complete build and deployment process
- Deployment time: 2-3 minutes from push to live

### Troubleshooting

#### Build Issues
If builds fail after implementing setup changes:
1. Check workflow logs for network connectivity issues
2. Verify firewall allowlist is properly applied
3. Review dependency status messages
4. Ensure all critical services are accessible

#### Local Development Issues
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

#### Expected Warnings
These warnings are normal and can be ignored:
- SASS deprecation warnings about `@import` and color functions
- Console errors about blocked Google Fonts (expected in development)

</details>

<details>
<summary><h3>🔌 API Documentation</h3></summary>

### API Transparency and Demo Mode Implementation

This document describes the implementation of API transparency features and demo mode indicators to address the fake API functionality concerns.

#### Issue Addressed

The BMW Concierge dashboard was displaying dynamically changing data that appeared to come from real APIs but was actually simulated/fake data. This created confusion about whether the application was truly connected to vehicle APIs.

#### Solution Implemented

##### 1. Vehicle API Abstraction Layer

Created a new `VehicleAPI` class in `/assets/js/vehicle-api.js` that provides:

- **Clean API Interface**: Standardized methods for vehicle data operations
- **Demo Mode Detection**: Automatically detects when no real API credentials are configured
- **Real vs Demo Transparency**: Clear indicators of data source in all responses
- **Future-Ready Structure**: Easy to swap demo implementations for real API calls

##### 2. Demo Mode Indicators

- **Visual Indicators**: All dashboard widgets show "DEMO MODE" badges when displaying simulated data
- **Data Source Labels**: Clear labeling of whether data comes from real APIs or simulation
- **Console Logging**: Detailed logging of API calls and data sources for developers

#### Smartcar API Integration

##### Redirect URI

The OAuth redirect URI for Smartcar integration is:

```
https://chatala1.github.io/BMW-Concierge/smartcar/callback
```

This endpoint is configured to handle OAuth authorization callbacks from Smartcar's API.

##### Configuration

To enable Smartcar integration, update the `_config.yml` file with your Smartcar client ID:

```yaml
smartcar:
  client_id: "your-smartcar-client-id"
  redirect_uri: "https://chatala1.github.io/BMW-Concierge/smartcar/callback"
```

##### Implementation Details

The Smartcar integration provides:
- **Vehicle Authentication**: OAuth flow for vehicle access
- **Real-time Data**: Live vehicle status when connected
- **API Fallback**: Graceful degradation to demo mode when no real connection

#### API Development Guidelines

When developing with the API abstraction layer:

1. **Always Check Demo Mode**: Use the `isDemoMode()` method to determine data source
2. **Provide Fallbacks**: Ensure demo data is available for all API endpoints
3. **Label Data Sources**: Always indicate to users whether data is real or simulated
4. **Handle Errors Gracefully**: Provide meaningful error messages and fallback to demo mode

</details>

<details>
<summary><h3>🔧 Maintenance & Repository Management</h3></summary>

### Repository Maintenance Overview

This section covers automated tools and documentation for maintaining the BMW-Concierge repository, including branch cleanup and verification procedures.

#### Branch Cleanup Tools

##### Files Included

###### 1. BRANCH_CLEANUP_ANALYSIS.md
Comprehensive analysis document that:
- Inventories all 41 branches in the repository
- Identifies which branches are safe to delete (38 branches)
- Lists protected branches that must be preserved (main, active PR branches)
- Provides safety considerations and verification steps

###### 2. BRANCH_CLEANUP_SCRIPT.sh
Automated cleanup script that:
- Safely deletes unnecessary copilot/fix-* branches
- Preserves main branch and branches with active PRs
- Creates backup files before deletion
- Provides colored output and progress tracking
- Includes safety confirmations and error handling

#### Branch Cleanup Verification Report

##### Executive Summary
The BMW-Concierge repository branch cleanup tools have been successfully implemented and verified. All repository functionality remains intact after analysis and documentation creation.

##### Verification Results

###### ✅ Repository Structure Verified
- Main branch: Preserved and functional
- Core functionality: All BMW Concierge features working correctly
- Build system: Jekyll builds successfully with no errors
- Development server: Successfully serves at http://localhost:4000/BMW-Concierge/

###### ✅ Site Functionality Confirmed
1. **Home Page**: Displays correctly with BMW branding and navigation
2. **Dashboard Access**: Proper authentication flow working
3. **Navigation**: All internal links functioning correctly
4. **Responsive Design**: Layout displays properly
5. **BMW Brand Elements**: All styling and theming intact

#### Current Branch Inventory

##### Total Branches: 41

###### Protected Branches (DO NOT DELETE)
- **`main`** - Primary production branch (SHA: 8ec3eff02f3fb85e27e9e62d9063e2e396170788)

###### Active Development Branches (PRESERVE)
- **`copilot/fix-76`** - Associated with PR #77 (Maintenance task)
- **`copilot/fix-78`** - Associated with PR #79 (Branch protection implementation)

###### Branches Safe for Deletion (38 branches)
The following copilot/fix-* branches have no associated open pull requests and can be safely deleted.

#### Maintenance Schedule

##### Update Schedule
Update the firewall allowlist when:
- Adding new external dependencies
- Changing API endpoints
- Modifying authentication flows
- Adding new build tools or services

##### Monitoring
The implementation includes:
- Automated deployment monitoring
- Network connectivity validation
- Build performance tracking
- Error logging and reporting

#### Expected Results

##### Build Performance
- **Jekyll Build Time**: < 1 second
- **GitHub Actions Deployment**: 2-3 minutes
- **Development Server Startup**: 2-3 seconds

##### Functionality Verification
- All dashboard widgets display correctly
- Authentication flow works in demo mode
- Interactive elements respond appropriately
- Mobile-responsive design functions properly

</details>

<details>
<summary><h3>🔒 Privacy & Legal</h3></summary>

### Privacy Policy

*Privacy policy content to be added*

### Licensing & Compliance

**GNU General Public License v3.0**

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

#### License Summary

This project is licensed under the GNU General Public License v3.0. This means:

- **Freedom to Use**: You can use this software for any purpose
- **Freedom to Study**: You can study how the program works and change it
- **Freedom to Share**: You can redistribute copies of the original program
- **Freedom to Improve**: You can distribute copies of your modified versions

#### Full License Text

The complete license text is available in the [LICENSE](LICENSE) file in this repository.

#### Legal Disclaimers

[^1]: All logos and brand names are property of their respective owners, and the use does not imply endorsement of or affiliation with Smartcar.

[^2]: This project is not affiliated with BMW Group, BMW M GmbH, BMW AG or any subsidiaries.

#### Compliance Notes

- All third-party assets are used in accordance with their respective licenses
- BMW branding elements are used for demonstration purposes only
- No official endorsement or affiliation with BMW is claimed or implied

</details>

---

## 🚀 Quick Start

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

See the **Development & Deployment** tab above for complete setup instructions.

---

## 📞 Support

For technical issues or questions:
1. Review the troubleshooting section in the **Development & Deployment** tab
2. Check existing [GitHub Issues](https://github.com/chatala1/BMW-Concierge/issues)
3. Create a new issue with detailed information about the problem
4. For deployment issues, review the GitHub Actions logs and deployment status
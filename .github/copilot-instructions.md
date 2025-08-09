# BMW Concierge Development Instructions

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

## Working Effectively

### Bootstrap and Build Process
Run these commands to set up and build the repository:

1. **Install Ruby and Jekyll dependencies**:
   ```bash
   export PATH="$HOME/.local/share/gem/ruby/3.2.0/bin:$PATH"
   gem install --user-install jekyll bundler minima jekyll-feed
   ```
   - Takes 30-60 seconds for gem installation
   - Required gems: jekyll, bundler, minima (theme), jekyll-feed

2. **Build the Jekyll site**:
   ```bash
   export PATH="$HOME/.local/share/gem/ruby/3.2.0/bin:$PATH"
   jekyll build
   ```
   - **TIMING**: Takes 0.5 seconds - very fast build
   - **NEVER CANCEL**: Set timeout to 120+ seconds for safety
   - Generates site to `_site/` directory
   - Expect SASS deprecation warnings (safe to ignore)

3. **Start development server**:
   ```bash
   export PATH="$HOME/.local/share/gem/ruby/3.2.0/bin:$PATH"
   jekyll serve --host 0.0.0.0 --port 4000
   ```
   - **TIMING**: Starts in 2-3 seconds
   - **NEVER CANCEL**: Set timeout to 60+ seconds
   - Access at `http://localhost:4000/BMW-Concierge/`
   - Auto-regeneration enabled for file changes

### Validation
ALWAYS manually validate any changes by following this complete end-to-end scenario:

1. **Start the development server** (see command above)
2. **Test home page functionality**:
   - Navigate to `http://localhost:4000/BMW-Concierge/`
   - Verify BMW branding and layout
   - Test "Login with GitHub" button (triggers demo authentication)
3. **Test authentication flow**:
   - Click login button and verify it shows "Demo User" profile
   - Verify the UI updates to show authenticated state
   - Check that protected content becomes visible
4. **Test dashboard access**:
   - Navigate to `/protected.html` or click "Go to Dashboard"
   - Verify all dashboard widgets display correctly
   - Test interactive elements (buttons respond to clicks)
5. **Test responsive design**:
   - Resize browser window to test mobile/tablet layouts
   - Verify navigation collapses appropriately

### Build Validation
Always run these validation steps before committing changes:

1. **Clean build test**:
   ```bash
   rm -rf _site/
   jekyll build
   ```
   - Must complete in under 2 seconds
   - Check for any new errors beyond SASS deprecation warnings

2. **GitHub Pages compatibility check**:
   - The site uses GitHub Pages deployment via `.github/workflows/jekyll-gh-pages.yml`
   - Jekyll configuration in `_config.yml` is GitHub Pages compatible
   - No additional build steps required for deployment

## Common Tasks

### Repo Structure
```
BMW-Concierge/
├── _config.yml              # Jekyll configuration
├── _layouts/default.html    # Page template with BMW branding
├── index.html              # Landing page
├── login.html              # Authentication page
├── protected.html          # Dashboard (requires auth)
├── privacy.html           # Privacy policy
├── assets/
│   ├── css/style.css      # BMW-branded CSS styles
│   └── js/auth.js         # GitHub OAuth authentication
├── .github/
│   └── workflows/
│       └── jekyll-gh-pages.yml  # GitHub Pages deployment
└── _site/                 # Generated site (gitignored)
```

### Key Technology Stack
- **Jekyll 4.4.1**: Static site generator
- **GitHub Pages**: Hosting and deployment
- **GitHub OAuth**: Authentication (demo mode implemented)
- **BMW Design System**: Custom CSS with BMW brand colors
- **No build tools**: No npm, webpack, or complex build pipeline

### Authentication System
The application uses a **demo authentication system** that simulates GitHub OAuth:
- Click "Login with GitHub" button triggers demo login
- Creates demo user profile: "Demo User"
- Stores authentication state in localStorage
- Enables access to protected dashboard content
- Logout clears authentication state

### File Dependencies
When modifying files, be aware of these relationships:
- **_layouts/default.html**: Template used by all pages
- **assets/css/style.css**: BMW brand styling applied globally
- **assets/js/auth.js**: Authentication logic used on all pages
- **_config.yml**: Site configuration affects all pages

### GitHub Pages Deployment
The site deploys automatically via GitHub Actions:
- Workflow: `.github/workflows/jekyll-gh-pages.yml`
- Triggered on push to `main` branch
- Uses GitHub's built-in Jekyll build action
- **TIMING**: Deployment takes 2-3 minutes
- **NEVER CANCEL**: GitHub Actions deployment should complete fully

## Troubleshooting

### Common Issues and Solutions

1. **"The minima theme could not be found"**:
   ```bash
   gem install --user-install minima jekyll-feed
   ```

2. **"jekyll: command not found"**:
   ```bash
   export PATH="$HOME/.local/share/gem/ruby/3.2.0/bin:$PATH"
   ```

3. **Permission denied during gem install**:
   - Use `--user-install` flag as shown in commands above
   - Never use `sudo` with gem commands

4. **Development server not accessible**:
   - Ensure using `--host 0.0.0.0` flag
   - Check correct URL: `http://localhost:4000/BMW-Concierge/`
   - Note the `/BMW-Concierge/` base path from `_config.yml`

5. **Authentication not working**:
   - Clear browser localStorage
   - Refresh page and try login again
   - Demo authentication is client-side only

### Expected Warnings
These warnings are normal and can be ignored:
- SASS deprecation warnings about `@import` and color functions
- Console errors about blocked Google Fonts (expected in development)

## Manual Testing Scenarios

After making changes, ALWAYS test these user scenarios:

### Scenario 1: New User Experience
1. Open site in incognito/private browser window
2. Verify landing page displays properly with BMW branding
3. Click "Access Dashboard" - should redirect to login
4. Test demo authentication flow
5. Verify authenticated state persists on page refresh

### Scenario 2: Dashboard Functionality
1. Authenticate using demo login
2. Navigate to dashboard
3. Verify all widgets display correctly:
   - Vehicle Status (battery, range, last updated)
   - Service & Maintenance (service reminder)
   - Remote Controls (4 buttons: unlock, lock, climate, locate)
   - Driving Analytics (monthly stats, efficiency, eco score)
   - Trip Planning (recent trip display)
   - Settings (checkboxes for preferences)
4. Test Recent Activity timeline displays
5. Verify Quick Links section works

### Scenario 3: Navigation and Responsive Design
1. Test navigation between all pages (Home, Dashboard, Privacy)
2. Test logout functionality
3. Resize browser window to mobile size (320px width)
4. Verify mobile-responsive layout works correctly
5. Test navigation menu behavior on mobile

## Testing Static Files

For quick validation without starting the development server:

1. **Open generated HTML directly**:
   ```bash
   # After running jekyll build
   open _site/index.html  # macOS
   # or
   xdg-open _site/index.html  # Linux
   ```
   - Note: Authentication may not work due to CORS restrictions
   - Use for layout and styling validation only

2. **Simple HTTP server** (if Python available):
   ```bash
   cd _site
   python3 -m http.server 8000
   # Access at http://localhost:8000
   ```

## Important Notes

- **No Backend Required**: This is a static site with client-side authentication only
- **No Database**: All data is demo/static content
- **No External APIs**: Authentication is simulated for demo purposes
- **GitHub Pages Compatible**: All features work within GitHub Pages limitations
- **Fast Development**: Jekyll's auto-regeneration makes development rapid
- **BMW Theming**: Custom CSS maintains BMW brand consistency throughout

## Deployment Information

- **Production URL**: https://chatala1.github.io/BMW-Concierge/
- **Auto-deployment**: Triggered on push to main branch
- **Build Environment**: GitHub Pages uses Ubuntu with Ruby 3.x
- **Deployment Time**: 2-3 minutes from push to live
- **No Manual Deployment Steps**: GitHub Actions handles everything

Always test changes locally using the development server before pushing to ensure they work correctly in the Jekyll environment.
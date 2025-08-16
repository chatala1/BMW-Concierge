/**
 * BMW Concierge Authentication System
 * Handles GitHub OAuth authentication for GitHub Pages
 */

class BMWAuth {
    constructor() {
        // Use demo mode for static site deployment (GitHub Pages)
        // Real OAuth requires backend server for client secret handling
        if (window.location.hostname === 'localhost' || 
            window.location.hostname === '127.0.0.1' ||
            window.location.hostname.includes('github.io')) {
            // Development environment or GitHub Pages - use demo mode
            this.clientId = 'demo_client_id';
        } else {
            // Custom domain with backend - use real GitHub OAuth
            this.clientId = 'Ov23liNCmhgdtQrBTgfI'; // GitHub OAuth App client ID
        }
        
        // Set redirect URI based on environment
        if (window.location.hostname === 'localhost' || 
            window.location.hostname === '127.0.0.1' ||
            window.location.hostname.includes('github.io')) {
            // Development environment or GitHub Pages
            this.redirectUri = window.location.origin + '/BMW-Concierge/login.html';
        } else {
            // Custom domain with backend
            this.redirectUri = window.location.origin + '/BMW-Concierge/login.html';
        }
        
        this.storageKey = 'bmw_concierge_auth';
        this.smartcarStorageKey = 'bmw_concierge_smartcar_auth';
        
        // Smartcar configuration (updated per issue requirements)
        this.smartcarClientId = '37a67e2d-bc6d-42be-9b82-6ee450489d2b'; // Smartcar client ID from issue
        
        // Set Smartcar redirect URI based on environment
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            // Development environment
            this.smartcarRedirectUri = window.location.origin + '/BMW-Concierge/smartcar/callback';
        } else {
            // Production environment (GitHub Pages)
            this.smartcarRedirectUri = 'https://chatala1.github.io/BMW-Concierge/smartcar/callback';
        }
        
        // Updated comprehensive scope list from issue requirements
        this.smartcarScope = [
            'control_charge', 'control_climate', 'control_navigation', 'control_pin', 
            'control_security', 'control_trunk', 'read_alerts', 'read_battery', 
            'read_charge', 'read_charge_events', 'read_charge_locations', 'read_charge_records',
            'read_climate', 'read_compass', 'read_diagnostics', 'read_engine_oil',
            'read_extended_vehicle_info', 'read_fuel', 'read_location', 'read_odometer',
            'read_security', 'read_service_history', 'read_speedometer', 'read_thermometer',
            'read_tires', 'read_user_profile', 'read_vehicle_info', 'read_vin'
        ];
        
        // Mode setting for simulated environment
        this.smartcarMode = 'simulated';
        
        this.init();
    }

    init() {
        this.checkAuthStatus();
        this.setupEventListeners();
        this.handleCallback();
    }

    setupEventListeners() {
        const loginBtn = document.getElementById('login-btn');
        const logoutBtn = document.getElementById('logout-btn');

        if (loginBtn) {
            loginBtn.addEventListener('click', () => this.login());
        }

        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => this.logout());
        }
    }

    checkAuthStatus() {
        const authData = this.getStoredAuth();
        if (authData && this.isTokenValid(authData)) {
            this.updateUIForLoggedInUser(authData);
        } else {
            this.updateUIForLoggedOutUser();
            this.clearStoredAuth();
        }
    }

    getStoredAuth() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            return stored ? JSON.parse(stored) : null;
        } catch (error) {
            console.error('Error reading stored auth:', error);
            return null;
        }
    }

    storeAuth(authData) {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(authData));
        } catch (error) {
            console.error('Error storing auth:', error);
        }
    }

    clearStoredAuth() {
        localStorage.removeItem(this.storageKey);
    }

    isTokenValid(authData) {
        if (!authData || !authData.access_token || !authData.expires_at) {
            return false;
        }
        return Date.now() < authData.expires_at;
    }

    login() {
        // Real GitHub OAuth flow
        const state = this.generateState();
        sessionStorage.setItem('oauth_state', state);
        
        // Check if we have a real client ID configured
        if (!this.clientId || this.clientId === 'demo_client_id') {
            console.info('Using demo authentication for static site deployment');
            this.showInfo('Demo authentication - perfect for GitHub Pages!');
            this.simulateAuthentication();
            return;
        }
        
        // Build OAuth URL
        const authUrl = new URL('https://github.com/login/oauth/authorize');
        authUrl.searchParams.append('client_id', this.clientId);
        authUrl.searchParams.append('redirect_uri', this.redirectUri);
        authUrl.searchParams.append('state', state);
        authUrl.searchParams.append('scope', 'user:email');
        authUrl.searchParams.append('allow_signup', 'true');
        
        // Redirect to GitHub OAuth
        window.location.href = authUrl.toString();
    }

    simulateAuthentication() {
        // Simulate OAuth callback with demo user data
        const demoUser = {
            access_token: 'demo_token_' + Date.now(),
            token_type: 'bearer',
            expires_at: Date.now() + (24 * 60 * 60 * 1000), // 24 hours
            user: {
                login: 'demo_user',
                name: 'Demo User',
                avatar_url: 'https://github.com/identicons/demo.png',
                html_url: 'https://github.com/demo_user'
            }
        };

        this.handleAuthSuccess(demoUser);
    }

    logout() {
        this.clearStoredAuth();
        this.updateUIForLoggedOutUser();
        
        // Redirect to home page if on a protected page
        if (window.location.pathname.includes('protected')) {
            window.location.href = window.location.origin + '/BMW-Concierge/';
        }
    }

    handleCallback() {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        const state = urlParams.get('state');
        const error = urlParams.get('error');
        const errorDescription = urlParams.get('error_description');

        if (error) {
            console.error('OAuth error:', error, errorDescription);
            this.showError(`Authentication failed: ${errorDescription || error}`);
            // Clean URL and redirect to login form
            window.history.replaceState({}, document.title, window.location.pathname);
            return;
        }

        if (code && state) {
            const storedState = sessionStorage.getItem('oauth_state');
            
            // For static site deployment (GitHub Pages), we can't safely handle real OAuth callbacks
            // because there's no backend to securely exchange codes for tokens
            if (this.clientId === 'demo_client_id') {
                console.info('GitHub Pages deployment detected - using demo authentication');
                // Clean URL first
                window.history.replaceState({}, document.title, window.location.pathname);
                // Simulate successful authentication
                this.simulateAuthentication();
                return;
            }
            
            // For real OAuth (custom domains with backend), validate state
            if (state !== storedState) {
                console.error('State mismatch:', state, 'vs', storedState);
                
                // If state is missing entirely, user probably accessed callback URL directly
                if (!storedState) {
                    console.info('No stored OAuth state found - initiating fresh authentication');
                    // Clean URL and start fresh login
                    window.history.replaceState({}, document.title, window.location.pathname);
                    this.showInfo('Starting fresh authentication...');
                    setTimeout(() => this.login(), 1000);
                    return;
                }
                
                this.showError('Security validation failed. Please try again.');
                // Clean URL and redirect to login form
                window.history.replaceState({}, document.title, window.location.pathname);
                return;
            }

            // Clean URL
            window.history.replaceState({}, document.title, window.location.pathname);
            
            // Exchange code for token
            this.exchangeCodeForToken(code);
        }
    }

    handleAuthSuccess(authData) {
        this.storeAuth(authData);
        this.updateUIForLoggedInUser(authData);
        this.showSuccess('Successfully logged in!');
    }

    updateUIForLoggedInUser(authData) {
        const loginBtn = document.getElementById('login-btn');
        const logoutBtn = document.getElementById('logout-btn');
        const userInfo = document.getElementById('user-info');

        if (loginBtn) loginBtn.style.display = 'none';
        if (logoutBtn) logoutBtn.style.display = 'inline-flex';
        
        if (userInfo && authData.user) {
            userInfo.innerHTML = `
                <img src="${authData.user.avatar_url}" alt="${authData.user.name}" 
                     style="width: 24px; height: 24px; margin-right: 8px;">
                ${authData.user.name || authData.user.login}
            `;
            userInfo.style.display = 'flex';
            userInfo.style.alignItems = 'center';
        }

        // Update protected content if present
        this.updateProtectedContent(true);
    }

    updateUIForLoggedOutUser() {
        const loginBtn = document.getElementById('login-btn');
        const logoutBtn = document.getElementById('logout-btn');
        const userInfo = document.getElementById('user-info');

        if (loginBtn) loginBtn.style.display = 'inline-flex';
        if (logoutBtn) logoutBtn.style.display = 'none';
        if (userInfo) userInfo.style.display = 'none';

        // Update protected content if present
        this.updateProtectedContent(false);
    }

    updateProtectedContent(isAuthenticated) {
        const protectedElements = document.querySelectorAll('.protected-content');
        const authRequiredElements = document.querySelectorAll('.auth-required');
        const authOnlyElements = document.querySelectorAll('.auth-only');

        protectedElements.forEach(element => {
            if (isAuthenticated) {
                element.classList.remove('access-denied');
                element.innerHTML = `
                    <h3>Access Granted</h3>
                    <p>Welcome to the BMW Concierge protected area! You now have access to exclusive features.</p>
                    <div class="mt-lg">
                        <h4>Available Features:</h4>
                        <ul style="margin-top: 1rem; text-align: left;">
                            <li>Vehicle Status Dashboard</li>
                            <li>Service Scheduling</li>
                            <li>Remote Vehicle Controls</li>
                            <li>Usage Analytics</li>
                            <li>Maintenance Reminders</li>
                        </ul>
                    </div>
                `;
            } else {
                element.classList.add('access-denied');
                element.innerHTML = `
                    <h3>Authentication Required</h3>
                    <p>Please log in with your GitHub account to access this content.</p>
                    <a href="${window.location.origin + '/BMW-Concierge/login.html'}" class="btn btn-primary mt-lg">
                        Login with GitHub
                    </a>
                `;
            }
        });

        authRequiredElements.forEach(element => {
            element.style.display = isAuthenticated ? 'block' : 'none';
        });

        authOnlyElements.forEach(element => {
            element.style.display = isAuthenticated ? 'none' : 'block';
        });
    }

    async exchangeCodeForToken(code) {
        // ⚠️  IMPORTANT: For GitHub Pages/static hosting production deployment ⚠️
        // 
        // This token exchange should be done server-side for security reasons.
        // GitHub requires a client secret that should never be exposed in client-side code.
        // 
        // Production deployment options:
        // 1. Use GitHub Apps instead of OAuth Apps (more secure for static sites)
        // 2. Deploy a serverless function (Netlify Functions, Vercel, AWS Lambda)
        // 3. Use a backend API service
        // 4. Use a third-party OAuth proxy service
        //
        // For demonstration purposes, this falls back to demo mode.
        
        try {
            this.showInfo('Authenticating with GitHub...');
            
            // Since we can't safely store client secrets in static sites,
            // we'll need to use a different approach for production
            const clientSecret = this.getClientSecret();
            
            if (!clientSecret) {
                throw new Error('Client secret not configured. This is expected for static site deployment.');
            }
            
            // This would work if we had a backend to handle the secret securely
            const response = await fetch('https://github.com/login/oauth/access_token', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    client_id: this.clientId,
                    client_secret: clientSecret,
                    code: code,
                    redirect_uri: this.redirectUri
                })
            });

            if (!response.ok) {
                throw new Error(`GitHub API error: ${response.status}`);
            }

            const tokenData = await response.json();
            
            if (tokenData.error) {
                throw new Error(tokenData.error_description || tokenData.error);
            }

            // Get user info with the access token
            const userResponse = await fetch('https://api.github.com/user', {
                headers: {
                    'Authorization': `Bearer ${tokenData.access_token}`,
                    'Accept': 'application/vnd.github.v3+json'
                }
            });

            if (!userResponse.ok) {
                throw new Error(`Failed to fetch user info: ${userResponse.status}`);
            }

            const userData = await userResponse.json();

            // Store authentication data
            const authData = {
                access_token: tokenData.access_token,
                token_type: tokenData.token_type || 'bearer',
                scope: tokenData.scope,
                expires_at: Date.now() + (24 * 60 * 60 * 1000), // 24 hours default
                user: {
                    login: userData.login,
                    name: userData.name || userData.login,
                    avatar_url: userData.avatar_url,
                    html_url: userData.html_url,
                    email: userData.email,
                    id: userData.id
                },
                isReal: true
            };

            this.handleAuthSuccess(authData);
            
        } catch (error) {
            console.warn('Real GitHub OAuth not available for static site:', error.message);
            
            // For GitHub Pages deployment, fall back to demo mode with a clear explanation
            this.showInfo('Using demo authentication (GitHub OAuth requires backend configuration)');
            
            // Create demo user data that looks like it came from the OAuth flow
            const demoUser = {
                access_token: 'demo_token_' + Date.now(),
                token_type: 'bearer',
                expires_at: Date.now() + (24 * 60 * 60 * 1000),
                user: {
                    login: 'demo_user',
                    name: 'Demo User',
                    avatar_url: 'https://github.com/identicons/demo.png',
                    html_url: 'https://github.com/demo_user',
                    email: 'demo@example.com',
                    id: 12345
                },
                isDemo: true
            };

            setTimeout(() => {
                this.handleAuthSuccess(demoUser);
            }, 1000);
        }
    }

    getClientSecret() {
        // WARNING: Never expose client secrets in client-side code!
        // This method exists for documentation purposes only
        
        // In production, this would be handled by:
        // - Environment variables on a backend server
        // - Serverless functions with secure environment configuration
        // - GitHub Apps (which don't require client secrets for some flows)
        
        return null; // Always return null for static site safety
    }

    showInfo(message) {
        this.showNotification(message, 'info');
    }

    generateState() {
        return Math.random().toString(36).substring(2, 15) + 
               Math.random().toString(36).substring(2, 15);
    }

    showSuccess(message) {
        this.showNotification(message, 'success');
    }

    showError(message) {
        this.showNotification(message, 'error');
    }

    showNotification(message, type) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        
        let backgroundColor;
        switch (type) {
            case 'success':
                backgroundColor = '#28a745';
                break;
            case 'error':
                backgroundColor = '#dc3545';
                break;
            case 'info':
                backgroundColor = '#007bff';
                break;
            default:
                backgroundColor = '#6c757d';
        }
        
        notification.innerHTML = `
            <div style="
                position: fixed;
                top: 20px;
                right: 20px;
                background: ${backgroundColor};
                color: white;
                padding: 1rem 1.5rem;
                border-radius: 4px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                z-index: 1000;
                max-width: 300px;
                word-wrap: break-word;
            ">
                ${message}
            </div>
        `;

        document.body.appendChild(notification);

        // Remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 5000);
    }

    // Public method to check if user is authenticated
    isAuthenticated() {
        const authData = this.getStoredAuth();
        return authData && this.isTokenValid(authData);
    }

    // Public method to get current user info
    getCurrentUser() {
        const authData = this.getStoredAuth();
        return authData && this.isTokenValid(authData) ? authData.user : null;
    }

    // Public method to get access token
    getAccessToken() {
        const authData = this.getStoredAuth();
        return authData && this.isTokenValid(authData) ? authData.access_token : null;
    }

    // Smartcar OAuth methods
    initiateSmartcarAuth(vehicleId = null) {
        if (!vehicleId) {
            this.showError('Vehicle ID is required for Smartcar connection');
            return;
        }

        if (!window.vehicleManager) {
            this.showError('Vehicle manager not available');
            return;
        }

        const vehicle = window.vehicleManager.getVehicleById(vehicleId);
        if (!vehicle) {
            this.showError('Vehicle not found');
            return;
        }

        if (!this.smartcarClientId) {
            // No client ID configured - activate demo mode
            this.simulateSmartcarConnection('demo_code', vehicleId);
            return;
        }

        const state = this.generateState();
        sessionStorage.setItem('smartcar_oauth_state', state);
        sessionStorage.setItem('smartcar_target_vehicle_id', vehicleId);
        
        const authUrl = new URL('https://connect.smartcar.com/oauth/authorize');
        authUrl.searchParams.append('response_type', 'code');
        authUrl.searchParams.append('client_id', this.smartcarClientId);
        authUrl.searchParams.append('redirect_uri', this.smartcarRedirectUri);
        authUrl.searchParams.append('scope', this.smartcarScope.join(' '));
        authUrl.searchParams.append('state', state);
        // Add mode parameter as specified in issue requirements
        authUrl.searchParams.append('mode', this.smartcarMode);
        
        window.location.href = authUrl.toString();
    }

    handleSmartcarCallback() {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        const state = urlParams.get('state');
        const error = urlParams.get('error');
        const errorDescription = urlParams.get('error_description');

        if (error) {
            console.error('Smartcar OAuth error:', error, errorDescription);
            this.showSmartcarError(errorDescription || error);
            return;
        }

        // Check if we're in demo mode (no Smartcar client ID configured)
        const isDemoMode = !this.smartcarClientId;

        if (!code || !state) {
            if (isDemoMode) {
                // In demo mode, simulate a successful connection without OAuth parameters
                this.showSmartcarDemoMode();
                return;
            } else {
                // In real mode, this is an actual error
                this.showSmartcarError('Missing authorization code or state parameter');
                return;
            }
        }

        const storedState = sessionStorage.getItem('smartcar_oauth_state');
        if (state !== storedState) {
            console.error('Smartcar OAuth state mismatch');
            this.showSmartcarError('Security validation failed. Please try again.');
            return;
        }

        // Clean URL
        window.history.replaceState({}, document.title, window.location.pathname);
        
        // Exchange code for token (this would normally be done server-side)
        // For demo purposes, we'll simulate a successful connection
        const targetVehicleId = sessionStorage.getItem('smartcar_target_vehicle_id');
        this.simulateSmartcarConnection(code, targetVehicleId);
    }

    simulateSmartcarConnection(code, vehicleId = null) {
        if (!vehicleId) {
            this.showError('Vehicle ID is required for Smartcar connection');
            return;
        }

        if (!window.vehicleManager) {
            this.showError('Vehicle manager not available');
            return;
        }

        const vehicle = window.vehicleManager.getVehicleById(vehicleId);
        if (!vehicle) {
            this.showError('Vehicle not found');
            return;
        }

        // Simulate API call to exchange code for tokens
        setTimeout(() => {
            const smartcarData = {
                access_token: 'sc_token_' + Date.now(),
                refresh_token: 'sc_refresh_' + Date.now(),
                expires_at: Date.now() + (60 * 60 * 1000), // 1 hour
                token_type: 'Bearer',
                vehicle_id: vehicleId + '_smartcar_' + Math.random().toString(36).substr(2, 9),
                connected_at: new Date().toISOString()
            };

            // Connect this specific vehicle to Smartcar
            window.vehicleManager.connectVehicleToSmartcar(vehicleId, smartcarData);
            
            // Clear session storage
            sessionStorage.removeItem('smartcar_target_vehicle_id');
            sessionStorage.removeItem('smartcar_oauth_state');
            
            this.showSmartcarSuccess(vehicle.name);
        }, 2000); // Simulate network delay
    }

    storeSmartcarAuth(smartcarData) {
        try {
            localStorage.setItem(this.smartcarStorageKey, JSON.stringify(smartcarData));
        } catch (error) {
            console.error('Error storing Smartcar auth:', error);
        }
    }

    getStoredSmartcarAuth() {
        try {
            const stored = localStorage.getItem(this.smartcarStorageKey);
            return stored ? JSON.parse(stored) : null;
        } catch (error) {
            console.error('Error reading stored Smartcar auth:', error);
            return null;
        }
    }

    clearSmartcarAuth() {
        localStorage.removeItem(this.smartcarStorageKey);
    }

    isSmartcarTokenValid(smartcarData) {
        if (!smartcarData || !smartcarData.access_token || !smartcarData.expires_at) {
            return false;
        }
        return Date.now() < smartcarData.expires_at;
    }

    isSmartcarConnected() {
        // For backward compatibility, check if any vehicle is connected
        if (window.vehicleManager) {
            return window.vehicleManager.getConnectedVehiclesCount() > 0;
        }
        
        // Fallback to old global method
        const smartcarData = this.getStoredSmartcarAuth();
        return smartcarData && this.isSmartcarTokenValid(smartcarData);
    }

    getSmartcarVehicleId() {
        const smartcarData = this.getStoredSmartcarAuth();
        return smartcarData && this.isSmartcarTokenValid(smartcarData) ? smartcarData.vehicle_id : null;
    }

    disconnectSmartcar() {
        this.clearSmartcarAuth();
        this.showSuccess('Vehicle disconnected successfully');
        
        // Update UI if on dashboard
        if (window.location.pathname.includes('protected')) {
            location.reload();
        }
    }

    /**
     * Disconnect a specific vehicle from Smartcar
     */
    disconnectVehicleFromSmartcar(vehicleId) {
        if (!window.vehicleManager) {
            this.showError('Vehicle manager not available');
            return;
        }

        const vehicle = window.vehicleManager.getVehicleById(vehicleId);
        if (!vehicle) {
            this.showError('Vehicle not found');
            return;
        }

        // Disconnect the vehicle
        window.vehicleManager.disconnectVehicleFromSmartcar(vehicleId);
        this.showSuccess(`${vehicle.name} disconnected from Smartcar successfully`);
        
        // Update UI if on dashboard
        if (window.location.pathname.includes('protected')) {
            // Refresh dashboard to show updated connection status
            if (typeof loadInitialVehicleData === 'function') {
                loadInitialVehicleData();
            }
            if (typeof initializeVehicleConnectionStatus === 'function') {
                initializeVehicleConnectionStatus();
            }
        }
    }

    showSmartcarSuccess(vehicleName = null) {
        if (typeof showCallbackSuccess === 'function') {
            showCallbackSuccess();
        } else {
            const message = vehicleName ? 
                `${vehicleName} connected to Smartcar successfully!` : 
                'Vehicle connected successfully!';
            this.showSuccess(message);
        }
    }

    showSmartcarDemoMode() {
        // Try to call the callback page's showCallbackDemoMode function
        if (typeof showCallbackDemoMode === 'function') {
            showCallbackDemoMode();
        } else {
            // If on callback page but function not available yet, try again after short delay
            if (window.location.pathname.includes('/smartcar/callback')) {
                setTimeout(() => {
                    if (typeof showCallbackDemoMode === 'function') {
                        showCallbackDemoMode();
                    } else {
                        // Fallback: simulate a demo connection
                        this.simulateSmartcarConnection('demo_code');
                    }
                }, 200);
            } else {
                // Not on callback page, just show success
                this.showSuccess('Demo vehicle connection simulated');
            }
        }
    }

    showSmartcarError(message) {
        // Try to call the callback page's showCallbackError function
        if (typeof showCallbackError === 'function') {
            showCallbackError(message);
        } else {
            // If on callback page but function not available yet, try again after short delay
            if (window.location.pathname.includes('/smartcar/callback')) {
                setTimeout(() => {
                    if (typeof showCallbackError === 'function') {
                        showCallbackError(message);
                    } else {
                        this.showError('Smartcar connection failed: ' + message);
                    }
                }, 200);
            } else {
                this.showError('Smartcar connection failed: ' + message);
            }
        }
    }
}

// Initialize authentication system when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.bmwAuth = new BMWAuth();
});

// Export for module usage if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BMWAuth;
}
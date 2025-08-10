/**
 * BMW Concierge Authentication System
 * Handles GitHub OAuth authentication for GitHub Pages
 */

class BMWAuth {
    constructor() {
        this.clientId = 'Ov23liNCmhgdtQrBTgfI'; // GitHub OAuth App client ID
        
        // Set redirect URI based on environment
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            // Development environment
            this.redirectUri = window.location.origin + '/BMW-Concierge/login.html';
        } else {
            // Production environment (GitHub Pages)
            this.redirectUri = 'https://chatala1.github.io/BMW-Concierge/login.html';
        }
        
        this.storageKey = 'bmw_concierge_auth';
        this.smartcarStorageKey = 'bmw_concierge_smartcar_auth';
        
        // Smartcar configuration
        this.smartcarClientId = ''; // To be configured with actual Smartcar client ID
        
        // Set Smartcar redirect URI based on environment
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            // Development environment
            this.smartcarRedirectUri = window.location.origin + '/BMW-Concierge/smartcar/callback';
        } else {
            // Production environment (GitHub Pages)
            this.smartcarRedirectUri = 'https://chatala1.github.io/BMW-Concierge/smartcar/callback';
        }
        
        this.smartcarScope = ['read_vehicle_info', 'read_location', 'read_odometer', 'control_security', 'control_climate'];
        
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
            console.warn('No GitHub client ID configured. Using demo authentication.');
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
            window.location.href = '/';
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
            return;
        }

        if (code && state) {
            const storedState = sessionStorage.getItem('oauth_state');
            if (state !== storedState) {
                console.error('State mismatch:', state, 'vs', storedState);
                this.showError('Security validation failed. Please try again.');
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
                    <button onclick="bmwAuth.login()" class="btn btn-primary mt-lg">
                        Login with GitHub
                    </button>
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
    initiateSmartcarAuth() {
        if (!this.smartcarClientId) {
            // No client ID configured - activate demo mode
            this.simulateSmartcarConnection('demo_code');
            return;
        }

        const state = this.generateState();
        sessionStorage.setItem('smartcar_oauth_state', state);
        
        const authUrl = new URL('https://connect.smartcar.com/oauth/authorize');
        authUrl.searchParams.append('response_type', 'code');
        authUrl.searchParams.append('client_id', this.smartcarClientId);
        authUrl.searchParams.append('redirect_uri', this.smartcarRedirectUri);
        authUrl.searchParams.append('scope', this.smartcarScope.join(' '));
        authUrl.searchParams.append('state', state);
        
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
        this.simulateSmartcarConnection(code);
    }

    simulateSmartcarConnection(code) {
        // Simulate API call to exchange code for tokens
        setTimeout(() => {
            const smartcarData = {
                access_token: 'sc_token_' + Date.now(),
                refresh_token: 'sc_refresh_' + Date.now(),
                expires_at: Date.now() + (60 * 60 * 1000), // 1 hour
                token_type: 'Bearer',
                vehicle_id: 'demo_vehicle_' + Math.random().toString(36).substr(2, 9),
                connected_at: new Date().toISOString()
            };

            this.storeSmartcarAuth(smartcarData);
            this.showSmartcarSuccess();
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

    showSmartcarSuccess() {
        if (typeof showCallbackSuccess === 'function') {
            showCallbackSuccess();
        } else {
            this.showSuccess('Vehicle connected successfully!');
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
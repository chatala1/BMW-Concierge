/**
 * BMW Concierge Authentication System
 * Handles GitHub OAuth authentication for GitHub Pages
 */

class BMWAuth {
    constructor() {
        this.clientId = 'Ov23liNCmhgdtQrBTgfI'; // This would normally be set in GitHub Pages environment
        this.redirectUri = window.location.origin + window.location.pathname;
        this.storageKey = 'bmw_concierge_auth';
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
        // For GitHub Pages demo, we'll simulate the OAuth flow
        // In a real implementation, this would redirect to GitHub OAuth
        const state = this.generateState();
        sessionStorage.setItem('oauth_state', state);
        
        // For demo purposes, simulate authentication
        this.simulateAuthentication();
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

        if (error) {
            console.error('OAuth error:', error);
            this.showError('Authentication failed. Please try again.');
            return;
        }

        if (code && state) {
            const storedState = sessionStorage.getItem('oauth_state');
            if (state !== storedState) {
                console.error('State mismatch');
                this.showError('Security validation failed. Please try again.');
                return;
            }

            // Clean URL
            window.history.replaceState({}, document.title, window.location.pathname);
            
            // In a real app, exchange code for token here
            // For demo, we'll use the simulated authentication
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
        notification.innerHTML = `
            <div style="
                position: fixed;
                top: 20px;
                right: 20px;
                background: ${type === 'success' ? '#28a745' : '#dc3545'};
                color: white;
                padding: 1rem 1.5rem;
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
}

// Initialize authentication system when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.bmwAuth = new BMWAuth();
});

// Export for module usage if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BMWAuth;
}
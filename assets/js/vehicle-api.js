/**
 * BMW Concierge Vehicle API Abstraction Layer
 * Provides a clean interface for vehicle data that can be implemented with real or demo APIs
 */

class VehicleAPI {
    constructor(config = {}) {
        this.config = {
            demoMode: config.demoMode !== undefined ? config.demoMode : !config.smartcarClientId,
            smartcarClientId: config.smartcarClientId || '',
            endpoints: config.endpoints || {},
            ...config
        };
        
        this.demoData = this.initializeDemoData();
    }

    /**
     * Initialize demo data for consistent demo experience
     */
    initializeDemoData() {
        return {
            vehicle: {
                batteryLevel: 85,
                fuelLevel: 78,
                range: 245,
                doorStatus: 'Locked',
                vehicleStatus: 'Secure',
                lastUpdated: new Date(Date.now() - 2 * 60 * 1000) // 2 minutes ago
            },
            analytics: {
                monthlyMiles: 1245,
                avgEfficiency: 3.2,
                ecoScore: 92
            },
            service: {
                nextService: '2024-01-15',
                oilChangeReminder: 500
            }
        };
    }

    /**
     * Check if API is running in demo mode
     */
    isDemoMode() {
        return this.config.demoMode;
    }

    /**
     * Get current vehicle status
     */
    async getVehicleStatus() {
        if (this.isDemoMode()) {
            return this.getDemoVehicleStatus();
        }
        
        // Real API implementation would go here
        return this.getRealVehicleStatus();
    }

    /**
     * Refresh vehicle status data
     */
    async refreshVehicleStatus() {
        if (this.isDemoMode()) {
            return this.refreshDemoVehicleStatus();
        }
        
        // Real API implementation would go here
        return this.refreshRealVehicleStatus();
    }

    /**
     * Demo mode: Get vehicle status with simulated data
     */
    getDemoVehicleStatus() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    success: true,
                    data: {
                        ...this.demoData.vehicle,
                        source: 'demo'
                    },
                    metadata: {
                        isDemoMode: true,
                        lastFetched: new Date().toISOString(),
                        dataSource: 'Simulated Demo Data'
                    }
                });
            }, 300); // Simulate network delay
        });
    }

    /**
     * Demo mode: Refresh with new simulated data
     */
    refreshDemoVehicleStatus() {
        return new Promise((resolve) => {
            setTimeout(() => {
                // Generate realistic demo data with some variation
                const batteryLevel = Math.floor(Math.random() * 30) + 70; // 70-100%
                const fuelLevel = Math.floor(Math.random() * 40) + 60; // 60-100%
                const range = Math.floor(Math.random() * 100) + 200; // 200-300 miles
                const doorStates = ['Locked', 'Unlocked'];
                const vehicleStates = ['Secure', 'Ready', 'Parked', 'Charging'];
                
                const doorStatus = doorStates[Math.floor(Math.random() * doorStates.length)];
                const vehicleStatus = vehicleStates[Math.floor(Math.random() * vehicleStates.length)];
                
                // Update demo data
                this.demoData.vehicle = {
                    batteryLevel,
                    fuelLevel,
                    range,
                    doorStatus,
                    vehicleStatus,
                    lastUpdated: new Date()
                };
                
                resolve({
                    success: true,
                    data: {
                        ...this.demoData.vehicle,
                        source: 'demo'
                    },
                    metadata: {
                        isDemoMode: true,
                        lastFetched: new Date().toISOString(),
                        dataSource: 'Simulated Demo Data',
                        refreshed: true
                    }
                });
            }, 1500); // Simulate longer network delay for refresh
        });
    }

    /**
     * Real API implementation placeholder
     */
    async getRealVehicleStatus() {
        // This would implement actual Smartcar API calls
        throw new Error('Real API implementation not configured. Please set up Smartcar credentials.');
    }

    /**
     * Real API refresh placeholder
     */
    async refreshRealVehicleStatus() {
        // This would implement actual Smartcar API calls
        throw new Error('Real API implementation not configured. Please set up Smartcar credentials.');
    }

    /**
     * Get vehicle analytics data
     */
    async getAnalytics() {
        if (this.isDemoMode()) {
            return this.getDemoAnalytics();
        }
        
        // Real API implementation would go here
        return this.getRealAnalytics();
    }

    /**
     * Demo analytics data
     */
    getDemoAnalytics() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    success: true,
                    data: {
                        ...this.demoData.analytics,
                        source: 'demo'
                    },
                    metadata: {
                        isDemoMode: true,
                        lastFetched: new Date().toISOString(),
                        dataSource: 'Simulated Demo Data'
                    }
                });
            }, 200);
        });
    }

    /**
     * Real analytics placeholder
     */
    async getRealAnalytics() {
        throw new Error('Real API implementation not configured. Please set up Smartcar credentials.');
    }

    /**
     * Execute remote vehicle commands
     */
    async executeCommand(command, params = {}) {
        if (this.isDemoMode()) {
            return this.executeDemoCommand(command, params);
        }
        
        return this.executeRealCommand(command, params);
    }

    /**
     * Demo command execution
     */
    executeDemoCommand(command, params) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const commandActions = {
                    lock: 'Vehicle locked',
                    unlock: 'Vehicle unlocked', 
                    climate_on: 'Climate control started',
                    climate_off: 'Climate control stopped',
                    locate: 'Vehicle location updated',
                    refresh: 'Vehicle status refreshed'
                };

                const message = commandActions[command] || `Command '${command}' executed`;
                
                resolve({
                    success: true,
                    message: message,
                    command: command,
                    params: params,
                    metadata: {
                        isDemoMode: true,
                        executedAt: new Date().toISOString(),
                        dataSource: 'Simulated Demo Response'
                    }
                });
            }, 1000); // Simulate command execution delay
        });
    }

    /**
     * Real command execution placeholder
     */
    async executeRealCommand(command, params) {
        throw new Error('Real API implementation not configured. Please set up Smartcar credentials.');
    }

    /**
     * Get API configuration info
     */
    getConfig() {
        return {
            isDemoMode: this.isDemoMode(),
            hasSmartcarCredentials: !!this.config.smartcarClientId,
            endpoints: this.config.endpoints,
            lastInitialized: new Date().toISOString()
        };
    }

    /**
     * Get API status and health
     */
    async getApiStatus() {
        if (this.isDemoMode()) {
            return {
                status: 'demo',
                healthy: true,
                mode: 'Demo Mode',
                description: 'API running in demo mode with simulated data',
                capabilities: [
                    'Vehicle status monitoring',
                    'Remote commands (simulated)',
                    'Analytics data',
                    'Service information'
                ],
                limitations: [
                    'Data is simulated for demonstration',
                    'No real vehicle connection',
                    'Commands do not affect actual vehicle'
                ],
                metadata: {
                    isDemoMode: true,
                    checkedAt: new Date().toISOString()
                }
            };
        }

        // In real mode, check actual API connectivity
        return {
            status: 'configured',
            healthy: false,
            mode: 'Production Mode (Not Implemented)', 
            description: 'Real API endpoints not implemented yet',
            capabilities: [],
            limitations: [
                'Requires Smartcar API implementation',
                'Needs valid credentials configuration',
                'Production endpoints not yet developed'
            ],
            metadata: {
                isDemoMode: false,
                checkedAt: new Date().toISOString()
            }
        };
    }
}

// Export for module usage if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = VehicleAPI;
}

// Initialize global instance when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Check if bmwAuth is available and get Smartcar config
    const smartcarClientId = window.bmwAuth?.smartcarClientId || '';
    
    // Initialize the API with configuration
    window.vehicleAPI = new VehicleAPI({
        smartcarClientId: smartcarClientId,
        demoMode: !smartcarClientId // Demo mode if no Smartcar client ID
    });
    
    console.log('VehicleAPI initialized:', window.vehicleAPI.getConfig());
});
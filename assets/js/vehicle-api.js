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
        const now = new Date();
        const lastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        const lastMonth = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        
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
                // Current period summaries
                monthlyMiles: 1245,
                avgEfficiency: 3.2,
                ecoScore: 92,
                
                // Detailed weekly data (last 8 weeks)
                weeklyData: [
                    { week: 'Week 1', miles: 275, efficiency: 3.4, ecoScore: 94, avgSpeed: 32 },
                    { week: 'Week 2', miles: 198, efficiency: 3.1, ecoScore: 89, avgSpeed: 29 },
                    { week: 'Week 3', miles: 312, efficiency: 3.3, ecoScore: 91, avgSpeed: 35 },
                    { week: 'Week 4', miles: 156, efficiency: 3.6, ecoScore: 96, avgSpeed: 28 },
                    { week: 'Week 5', miles: 289, efficiency: 3.2, ecoScore: 88, avgSpeed: 33 },
                    { week: 'Week 6', miles: 234, efficiency: 3.5, ecoScore: 93, avgSpeed: 31 },
                    { week: 'Week 7', miles: 187, efficiency: 3.4, ecoScore: 95, avgSpeed: 30 },
                    { week: 'Week 8', miles: 215, efficiency: 3.1, ecoScore: 90, avgSpeed: 34 }
                ],
                
                // Monthly summaries (last 6 months)
                monthlyData: [
                    { month: 'January', miles: 1456, efficiency: 3.1, ecoScore: 88, trips: 45 },
                    { month: 'February', miles: 1123, efficiency: 3.3, ecoScore: 91, trips: 38 },
                    { month: 'March', miles: 1789, efficiency: 3.2, ecoScore: 89, trips: 52 },
                    { month: 'April', miles: 1234, efficiency: 3.4, ecoScore: 93, trips: 41 },
                    { month: 'May', miles: 1567, efficiency: 3.5, ecoScore: 94, trips: 48 },
                    { month: 'June', miles: 1245, efficiency: 3.2, ecoScore: 92, trips: 43 }
                ],
                
                // Driving patterns
                drivingPatterns: {
                    cityDriving: 62, // percentage
                    highwayDriving: 28,
                    combinedDriving: 10,
                    mostActiveDay: 'Tuesday',
                    mostActiveTime: '8:00 AM - 9:00 AM',
                    avgTripDistance: 12.4,
                    totalTrips: 43
                },
                
                // Efficiency insights
                efficiency: {
                    energyUsed: 389, // kWh this month
                    regenerativeEnergy: 45, // kWh recovered
                    costPerMile: 0.08, // dollars
                    co2Saved: 234, // pounds vs gas car
                    optimalSpeedRange: '45-55 mph',
                    topEfficiencyTip: 'Use eco mode for city driving'
                },
                
                // Recent trips (last 10)
                recentTrips: [
                    { date: now.toISOString().split('T')[0], distance: 23.4, efficiency: 3.6, destination: 'Downtown Office', ecoScore: 96 },
                    { date: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], distance: 15.2, efficiency: 3.2, destination: 'Shopping Center', ecoScore: 88 },
                    { date: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], distance: 8.7, efficiency: 3.8, destination: 'Gym', ecoScore: 94 },
                    { date: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], distance: 45.6, efficiency: 3.1, destination: 'Airport', ecoScore: 85 },
                    { date: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], distance: 12.3, efficiency: 3.5, destination: 'Restaurant', ecoScore: 92 },
                    { date: new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], distance: 34.2, efficiency: 3.3, destination: 'Client Meeting', ecoScore: 90 },
                    { date: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], distance: 19.8, efficiency: 3.4, destination: 'Home Depot', ecoScore: 91 },
                    { date: new Date(now.getTime() - 6 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], distance: 7.2, efficiency: 3.9, destination: 'Coffee Shop', ecoScore: 97 },
                    { date: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], distance: 28.1, efficiency: 3.0, destination: 'Doctor Appointment', ecoScore: 84 },
                    { date: new Date(now.getTime() - 8 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], distance: 16.5, efficiency: 3.6, destination: 'Grocery Store', ecoScore: 95 }
                ]
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
     * Get comprehensive analytics data including historical trends
     */
    async getDetailedAnalytics(period = 'month') {
        if (this.isDemoMode()) {
            return this.getDetailedDemoAnalytics(period);
        }
        
        // Real API implementation would go here
        return this.getDetailedRealAnalytics(period);
    }

    /**
     * Get driving patterns and insights
     */
    async getDrivingInsights() {
        if (this.isDemoMode()) {
            return this.getDemoDrivingInsights();
        }
        
        return this.getRealDrivingInsights();
    }

    /**
     * Get recent trips data
     */
    async getRecentTrips(limit = 10) {
        if (this.isDemoMode()) {
            return this.getDemoRecentTrips(limit);
        }
        
        return this.getRealRecentTrips(limit);
    }

    /**
     * Demo detailed analytics data
     */
    getDetailedDemoAnalytics(period) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const analytics = this.demoData.analytics;
                let data;
                
                switch (period) {
                    case 'week':
                        data = {
                            summary: {
                                totalMiles: 215,
                                avgEfficiency: 3.1,
                                ecoScore: 90,
                                totalTrips: 12
                            },
                            chartData: analytics.weeklyData.slice(-1),
                            period: 'This Week'
                        };
                        break;
                    case 'year':
                        data = {
                            summary: {
                                totalMiles: 16234,
                                avgEfficiency: 3.3,
                                ecoScore: 91,
                                totalTrips: 487
                            },
                            chartData: analytics.monthlyData,
                            period: 'This Year'
                        };
                        break;
                    default: // month
                        data = {
                            summary: {
                                totalMiles: analytics.monthlyMiles,
                                avgEfficiency: analytics.avgEfficiency,
                                ecoScore: analytics.ecoScore,
                                totalTrips: analytics.drivingPatterns.totalTrips
                            },
                            chartData: analytics.weeklyData,
                            period: 'This Month'
                        };
                }
                
                resolve({
                    success: true,
                    data: {
                        ...data,
                        drivingPatterns: analytics.drivingPatterns,
                        efficiency: analytics.efficiency,
                        source: 'demo'
                    },
                    metadata: {
                        isDemoMode: true,
                        lastFetched: new Date().toISOString(),
                        dataSource: 'Simulated Demo Analytics'
                    }
                });
            }, 400);
        });
    }

    /**
     * Demo driving insights
     */
    getDemoDrivingInsights() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    success: true,
                    data: {
                        ...this.demoData.analytics.drivingPatterns,
                        insights: [
                            {
                                type: 'efficiency',
                                title: 'Optimal Speed Range',
                                description: 'Your best efficiency is achieved at 45-55 mph',
                                recommendation: 'Try to maintain steady speeds in this range for maximum efficiency',
                                impact: 'Up to 15% better efficiency'
                            },
                            {
                                type: 'timing',
                                title: 'Peak Driving Times',
                                description: 'Most driving occurs Tuesday mornings around 8-9 AM',
                                recommendation: 'Consider alternative routes during peak traffic',
                                impact: 'Reduce travel time by 20%'
                            },
                            {
                                type: 'eco',
                                title: 'Eco Score Improvement',
                                description: 'Your eco score has improved 8% over last month',
                                recommendation: 'Continue using eco mode for city driving',
                                impact: 'Save $12/month on energy costs'
                            }
                        ],
                        source: 'demo'
                    },
                    metadata: {
                        isDemoMode: true,
                        lastFetched: new Date().toISOString(),
                        dataSource: 'Simulated Demo Insights'
                    }
                });
            }, 300);
        });
    }

    /**
     * Demo recent trips
     */
    getDemoRecentTrips(limit) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    success: true,
                    data: {
                        trips: this.demoData.analytics.recentTrips.slice(0, limit),
                        totalTrips: this.demoData.analytics.recentTrips.length,
                        source: 'demo'
                    },
                    metadata: {
                        isDemoMode: true,
                        lastFetched: new Date().toISOString(),
                        dataSource: 'Simulated Demo Trips'
                    }
    /**
     * Real analytics placeholder
     */
    async getRealAnalytics() {
        throw new Error('Real API implementation not configured. Please set up Smartcar credentials.');
    }

    /**
     * Real detailed analytics placeholder
     */
    async getDetailedRealAnalytics(period) {
        throw new Error('Real API implementation not configured. Please set up Smartcar credentials.');
    }

    /**
     * Real driving insights placeholder
     */
    async getRealDrivingInsights() {
        throw new Error('Real API implementation not configured. Please set up Smartcar credentials.');
    }

    /**
     * Real recent trips placeholder
     */
    async getRealRecentTrips(limit) {
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
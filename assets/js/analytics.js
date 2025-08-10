/**
 * BMW Concierge Analytics Module
 * Handles driving analytics display and functionality
 */

class AnalyticsManager {
    constructor() {
        this.currentPeriod = 'month';
        this.chartInstances = {};
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        if (this.isAnalyticsPage()) {
            this.loadAnalyticsPage();
        }
    }

    isAnalyticsPage() {
        return window.location.pathname.includes('analytics.html');
    }

    setupEventListeners() {
        // Period selector buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('period-selector')) {
                this.handlePeriodChange(e.target.dataset.period);
            }
            
            if (e.target.classList.contains('analytics-refresh-btn')) {
                this.refreshAnalytics();
            }
            
            if (e.target.classList.contains('view-details-btn')) {
                this.navigateToAnalytics();
            }
        });
    }

    async loadAnalyticsPage() {
        // Load comprehensive analytics data when on analytics page
        try {
            await this.loadDetailedAnalytics();
            await this.loadDrivingInsights();
            await this.loadRecentTrips();
        } catch (error) {
            console.error('Error loading analytics page:', error);
            this.showAnalyticsError('Failed to load analytics data');
        }
    }

    async loadDetailedAnalytics(period = 'month') {
        if (!window.vehicleAPI) {
            console.error('VehicleAPI not available');
            return;
        }

        try {
            const result = await window.vehicleAPI.getDetailedAnalytics(period);
            
            if (result.success) {
                this.updateAnalyticsSummary(result.data);
                this.updateAnalyticsChart(result.data.chartData, period);
                this.updateDrivingPatterns(result.data.drivingPatterns);
                this.updateEfficiencyMetrics(result.data.efficiency);
            }
        } catch (error) {
            console.error('Error loading detailed analytics:', error);
            this.showAnalyticsError('Failed to load analytics data');
        }
    }

    async loadDrivingInsights() {
        if (!window.vehicleAPI) return;

        try {
            const result = await window.vehicleAPI.getDrivingInsights();
            
            if (result.success) {
                this.updateInsights(result.data.insights);
            }
        } catch (error) {
            console.error('Error loading driving insights:', error);
        }
    }

    async loadRecentTrips() {
        if (!window.vehicleAPI) return;

        try {
            const result = await window.vehicleAPI.getRecentTrips(10);
            
            if (result.success) {
                this.updateRecentTrips(result.data.trips);
            }
        } catch (error) {
            console.error('Error loading recent trips:', error);
        }
    }

    updateAnalyticsSummary(data) {
        const elements = {
            totalMiles: document.getElementById('total-miles'),
            avgEfficiency: document.getElementById('avg-efficiency'),
            ecoScore: document.getElementById('eco-score'),
            totalTrips: document.getElementById('total-trips')
        };

        if (elements.totalMiles) {
            elements.totalMiles.textContent = data.summary.totalMiles.toLocaleString() + ' miles';
        }
        if (elements.avgEfficiency) {
            elements.avgEfficiency.textContent = data.summary.avgEfficiency.toFixed(1) + ' mi/kWh';
        }
        if (elements.ecoScore) {
            elements.ecoScore.textContent = data.summary.ecoScore + '/100';
            elements.ecoScore.style.color = this.getScoreColor(data.summary.ecoScore);
        }
        if (elements.totalTrips) {
            elements.totalTrips.textContent = data.summary.totalTrips + ' trips';
        }

        // Update period display
        const periodDisplay = document.getElementById('period-display');
        if (periodDisplay) {
            periodDisplay.textContent = data.period;
        }
    }

    updateAnalyticsChart(chartData, period) {
        const chartContainer = document.getElementById('analytics-chart');
        if (!chartContainer) return;

        // Destroy existing chart if it exists
        if (this.chartInstances.main) {
            this.chartInstances.main.destroy();
        }

        // Create simple text-based chart for now (can be enhanced with Chart.js later)
        const chartHTML = this.createSimpleChart(chartData, period);
        chartContainer.innerHTML = chartHTML;
    }

    createSimpleChart(data, period) {
        const maxValue = Math.max(...data.map(item => item.miles || item.distance || 0));
        
        return `
            <div class="simple-chart">
                <h4>Driving Activity - ${period.charAt(0).toUpperCase() + period.slice(1)}ly</h4>
                <div class="chart-bars" style="margin-top: 1rem;">
                    ${data.map((item, index) => {
                        const barHeight = ((item.miles || item.distance || 0) / maxValue) * 100;
                        const label = item.week || item.month || `Period ${index + 1}`;
                        return `
                            <div class="chart-bar-container" style="display: inline-block; width: ${100/data.length}%; text-align: center; vertical-align: bottom;">
                                <div class="chart-bar" style="
                                    height: ${barHeight}px;
                                    max-height: 200px;
                                    background: linear-gradient(to top, var(--bmw-blue), var(--bmw-light-blue));
                                    margin: 0 2px;
                                    border-radius: 4px 4px 0 0;
                                    position: relative;
                                ">
                                    <div class="bar-label" style="
                                        position: absolute;
                                        bottom: 100%;
                                        left: 50%;
                                        transform: translateX(-50%);
                                        font-size: 0.7rem;
                                        color: var(--bmw-gray);
                                        margin-bottom: 4px;
                                    ">${(item.miles || item.distance || 0).toLocaleString()}</div>
                                </div>
                                <div class="period-label" style="font-size: 0.7rem; margin-top: 4px; color: var(--bmw-gray);">
                                    ${label.replace('Week ', 'W').replace('Month ', '')}
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
    }

    updateDrivingPatterns(patterns) {
        const elements = {
            cityDriving: document.getElementById('city-driving'),
            highwayDriving: document.getElementById('highway-driving'),
            combinedDriving: document.getElementById('combined-driving'),
            mostActiveDay: document.getElementById('most-active-day'),
            mostActiveTime: document.getElementById('most-active-time'),
            avgTripDistance: document.getElementById('avg-trip-distance')
        };

        if (elements.cityDriving) {
            elements.cityDriving.textContent = patterns.cityDriving + '%';
        }
        if (elements.highwayDriving) {
            elements.highwayDriving.textContent = patterns.highwayDriving + '%';
        }
        if (elements.combinedDriving) {
            elements.combinedDriving.textContent = patterns.combinedDriving + '%';
        }
        if (elements.mostActiveDay) {
            elements.mostActiveDay.textContent = patterns.mostActiveDay;
        }
        if (elements.mostActiveTime) {
            elements.mostActiveTime.textContent = patterns.mostActiveTime;
        }
        if (elements.avgTripDistance) {
            elements.avgTripDistance.textContent = patterns.avgTripDistance + ' miles';
        }
    }

    updateEfficiencyMetrics(efficiency) {
        const elements = {
            energyUsed: document.getElementById('energy-used'),
            regenEnergy: document.getElementById('regen-energy'),
            costPerMile: document.getElementById('cost-per-mile'),
            co2Saved: document.getElementById('co2-saved')
        };

        if (elements.energyUsed) {
            elements.energyUsed.textContent = efficiency.energyUsed + ' kWh';
        }
        if (elements.regenEnergy) {
            elements.regenEnergy.textContent = efficiency.regenerativeEnergy + ' kWh';
        }
        if (elements.costPerMile) {
            elements.costPerMile.textContent = '$' + efficiency.costPerMile.toFixed(2);
        }
        if (elements.co2Saved) {
            elements.co2Saved.textContent = efficiency.co2Saved + ' lbs';
        }
    }

    updateInsights(insights) {
        const container = document.getElementById('insights-container');
        if (!container || !insights) return;

        const insightsHTML = insights.map(insight => `
            <div class="insight-card" style="
                background: var(--bmw-light-gray);
                padding: 1rem;
                border-radius: 8px;
                margin-bottom: 1rem;
                border-left: 4px solid ${this.getInsightColor(insight.type)};
            ">
                <h4 style="margin: 0 0 0.5rem 0; color: var(--bmw-blue);">${insight.title}</h4>
                <p style="margin: 0 0 0.5rem 0; color: var(--bmw-gray);">${insight.description}</p>
                <div style="background: white; padding: 0.75rem; border-radius: 4px; margin: 0.5rem 0;">
                    <strong style="color: var(--bmw-blue);">Recommendation:</strong> ${insight.recommendation}
                </div>
                <div style="text-align: right; font-size: 0.9rem; color: #28a745;">
                    <strong>Potential Impact:</strong> ${insight.impact}
                </div>
            </div>
        `).join('');

        container.innerHTML = insightsHTML;
    }

    updateRecentTrips(trips) {
        const container = document.getElementById('recent-trips-container');
        if (!container || !trips) return;

        const tripsHTML = trips.map(trip => `
            <div class="trip-item" style="
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0.75rem;
                border-bottom: 1px solid var(--bmw-light-gray);
            ">
                <div>
                    <div style="font-weight: 600; color: var(--bmw-blue);">${trip.destination}</div>
                    <div style="font-size: 0.9rem; color: var(--bmw-gray);">${trip.date}</div>
                </div>
                <div style="text-align: right;">
                    <div style="font-weight: 600;">${trip.distance} mi</div>
                    <div style="font-size: 0.8rem; color: ${this.getScoreColor(trip.ecoScore)};">
                        ${trip.efficiency} mi/kWh • Eco: ${trip.ecoScore}
                    </div>
                </div>
            </div>
        `).join('');

        container.innerHTML = tripsHTML;
    }

    getScoreColor(score) {
        if (score >= 90) return '#28a745';
        if (score >= 80) return '#ffc107';
        if (score >= 70) return '#fd7e14';
        return '#dc3545';
    }

    getInsightColor(type) {
        switch (type) {
            case 'efficiency': return '#28a745';
            case 'timing': return '#007bff';
            case 'eco': return '#17a2b8';
            default: return 'var(--bmw-blue)';
        }
    }

    async handlePeriodChange(period) {
        this.currentPeriod = period;
        
        // Update active button
        document.querySelectorAll('.period-selector').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-period="${period}"]`).classList.add('active');
        
        // Reload analytics with new period
        await this.loadDetailedAnalytics(period);
    }

    async refreshAnalytics() {
        const refreshBtn = document.querySelector('.analytics-refresh-btn');
        if (refreshBtn) {
            const originalText = refreshBtn.innerHTML;
            refreshBtn.innerHTML = '<i data-lucide="loader" class="spinning" style="margin-right: 0.5rem;"></i>Refreshing...';
            refreshBtn.disabled = true;
            
            try {
                await this.loadAnalyticsPage();
                
                if (window.bmwAuth) {
                    window.bmwAuth.showSuccess('Analytics data refreshed successfully');
                }
            } catch (error) {
                if (window.bmwAuth) {
                    window.bmwAuth.showError('Failed to refresh analytics data');
                }
            } finally {
                refreshBtn.innerHTML = originalText;
                refreshBtn.disabled = false;
                
                // Re-initialize icons
                if (typeof bmwIcons !== 'undefined') {
                    bmwIcons.createIcons();
                }
            }
        }
    }

    navigateToAnalytics() {
        window.location.href = window.location.origin + window.location.pathname.replace(/\/[^\/]*$/, '/analytics.html');
    }

    showAnalyticsError(message) {
        const errorContainer = document.getElementById('analytics-error');
        if (errorContainer) {
            errorContainer.innerHTML = `
                <div style="
                    background: #f8d7da;
                    color: #721c24;
                    padding: 1rem;
                    border-radius: 4px;
                    border: 1px solid #f5c6cb;
                    margin: 1rem 0;
                ">
                    <i data-lucide="alert-triangle" style="margin-right: 0.5rem;"></i>
                    ${message}
                </div>
            `;
            
            if (typeof bmwIcons !== 'undefined') {
                bmwIcons.createIcons();
            }
        }
    }

    // Method to update dashboard analytics card with dynamic data
    async updateDashboardAnalytics() {
        if (!window.vehicleAPI) return;

        try {
            const result = await window.vehicleAPI.getAnalytics();
            
            if (result.success) {
                const data = result.data;
                
                // Update dashboard analytics display
                const monthlyMiles = document.querySelector('#dashboard-monthly-miles');
                const avgEfficiency = document.querySelector('#dashboard-avg-efficiency');
                const ecoScore = document.querySelector('#dashboard-eco-score');
                
                if (monthlyMiles) {
                    monthlyMiles.textContent = data.monthlyMiles.toLocaleString() + ' miles';
                }
                if (avgEfficiency) {
                    avgEfficiency.textContent = data.avgEfficiency.toFixed(1) + ' mi/kWh';
                }
                if (ecoScore) {
                    ecoScore.textContent = data.ecoScore + '/100';
                    ecoScore.style.color = this.getScoreColor(data.ecoScore);
                }
            }
        } catch (error) {
            console.error('Error updating dashboard analytics:', error);
        }
    }
}

// Initialize analytics manager when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.analyticsManager = new AnalyticsManager();
});

// Export for module usage if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AnalyticsManager;
}
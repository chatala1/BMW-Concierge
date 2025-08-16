/**
 * BMW Concierge Vehicle Management Utility
 * Provides shared vehicle management functionality across pages
 */

class VehicleManager {
    constructor() {
        this.storageKey = 'bmw_concierge_vehicles';
        this.selectedVehicleKey = 'bmw_concierge_selected_vehicle';
        this.vehicles = [];
        this.selectedVehicleId = null;
        this.init();
    }

    /**
     * Initialize vehicle manager
     */
    init() {
        this.loadVehicles();
        this.loadSelectedVehicle();
    }

    /**
     * Load vehicles from localStorage
     */
    loadVehicles() {
        try {
            const storedVehicles = localStorage.getItem(this.storageKey);
            if (storedVehicles) {
                this.vehicles = JSON.parse(storedVehicles);
            } else {
                // Initialize with default vehicle for new users
                this.vehicles = this.getDefaultVehicles();
                this.saveVehicles();
            }
        } catch (error) {
            console.error('Error loading vehicles from storage:', error);
            this.vehicles = this.getDefaultVehicles();
            this.saveVehicles();
        }
    }

    /**
     * Save vehicles to localStorage
     */
    saveVehicles() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.vehicles));
        } catch (error) {
            console.error('Error saving vehicles to storage:', error);
        }
    }

    /**
     * Get default vehicles for new users
     */
    getDefaultVehicles() {
        return [
            {
                id: 'demo_vehicle_1',
                name: 'BMW i4 M50',
                vin: 'WBA4XXXX2HEK12345',
                year: 2023,
                status: 'connected',
                lastConnected: '2024-01-15T10:30:00Z'
            }
        ];
    }

    /**
     * Get all vehicles
     */
    getAllVehicles() {
        return [...this.vehicles];
    }

    /**
     * Get vehicle by ID
     */
    getVehicleById(vehicleId) {
        return this.vehicles.find(v => v.id === vehicleId);
    }

    /**
     * Add a new vehicle
     */
    addVehicle(vehicleData) {
        const newVehicle = {
            id: 'demo_vehicle_' + Math.random().toString(36).substr(2, 9),
            name: vehicleData.name,
            vin: vehicleData.vin || 'WBA' + Math.random().toString(36).substr(2, 9).toUpperCase(),
            year: vehicleData.year || new Date().getFullYear(),
            status: vehicleData.status || 'disconnected',
            lastConnected: vehicleData.lastConnected || null
        };

        this.vehicles.push(newVehicle);
        this.saveVehicles();
        
        // If this is the first vehicle and no vehicle is selected, select it
        if (this.vehicles.length === 1 && !this.selectedVehicleId) {
            this.setSelectedVehicle(newVehicle.id);
        }
        
        return newVehicle;
    }

    /**
     * Update an existing vehicle
     */
    updateVehicle(vehicleId, updates) {
        const vehicleIndex = this.vehicles.findIndex(v => v.id === vehicleId);
        if (vehicleIndex !== -1) {
            this.vehicles[vehicleIndex] = { ...this.vehicles[vehicleIndex], ...updates };
            this.saveVehicles();
            return this.vehicles[vehicleIndex];
        }
        return null;
    }

    /**
     * Remove a vehicle
     */
    removeVehicle(vehicleId) {
        const vehicleIndex = this.vehicles.findIndex(v => v.id === vehicleId);
        if (vehicleIndex !== -1) {
            const removedVehicle = this.vehicles.splice(vehicleIndex, 1)[0];
            this.saveVehicles();
            
            // If the removed vehicle was selected, select another one
            if (this.selectedVehicleId === vehicleId) {
                if (this.vehicles.length > 0) {
                    this.setSelectedVehicle(this.vehicles[0].id);
                } else {
                    this.setSelectedVehicle(null);
                }
            }
            
            return removedVehicle;
        }
        return null;
    }

    /**
     * Load selected vehicle from localStorage
     */
    loadSelectedVehicle() {
        try {
            const selectedId = localStorage.getItem(this.selectedVehicleKey);
            if (selectedId && this.getVehicleById(selectedId)) {
                this.selectedVehicleId = selectedId;
            } else if (this.vehicles.length > 0) {
                // Auto-select first vehicle if none selected
                this.setSelectedVehicle(this.vehicles[0].id);
            }
        } catch (error) {
            console.error('Error loading selected vehicle:', error);
            if (this.vehicles.length > 0) {
                this.setSelectedVehicle(this.vehicles[0].id);
            }
        }
    }

    /**
     * Set selected vehicle
     */
    setSelectedVehicle(vehicleId) {
        if (vehicleId && this.getVehicleById(vehicleId)) {
            this.selectedVehicleId = vehicleId;
            localStorage.setItem(this.selectedVehicleKey, vehicleId);
        } else {
            this.selectedVehicleId = null;
            localStorage.removeItem(this.selectedVehicleKey);
        }
    }

    /**
     * Get currently selected vehicle
     */
    getSelectedVehicle() {
        if (this.selectedVehicleId) {
            return this.getVehicleById(this.selectedVehicleId);
        }
        return null;
    }

    /**
     * Get selected vehicle ID
     */
    getSelectedVehicleId() {
        return this.selectedVehicleId;
    }

    /**
     * Check if any vehicles exist
     */
    hasVehicles() {
        return this.vehicles.length > 0;
    }

    /**
     * Get vehicle count
     */
    getVehicleCount() {
        return this.vehicles.length;
    }
}

// Create global instance
window.vehicleManager = new VehicleManager();
/*
 * BMW Concierge Icons - Simple and Reliable Icon System
 * Clean, minimalist approach with reliable rendering
 */

// Simple icon system using Unicode symbols and CSS icons
const BMW_ICONS = {
  // Vehicle & Automotive
  'car': '🚗',
  'bmw-car': '🚗', 
  
  // Status & Alerts
  'alert-circle': '⚠️',
  'alert-triangle': '⚠️',
  'check-circle': '✅',
  'info': 'ℹ️',
  
  // Technical & Controls
  'settings': '⚙️',
  'wrench': '🔧',
  'battery': '🔋',
  'fuel': '⛽',
  'key': '🔑',
  'lock': '🔒',
  
  // Navigation & Movement
  'map': '🗺️',
  'navigation': '🧭',
  'monitor': '🖥️',
  
  // Data & Analytics
  'bar-chart-3': '📊',
  'database': '💾',
  'wifi': '📶',
  'wifi-off': '📵',
  
  // Actions & States
  'loader': '⟳',
  'play-circle': '▶️',
  'clock': '🕐',
  'thermometer': '🌡️',
  
  // BMW Specific
  'bmw-shield': '🛡️',
  'shield-check': '🛡️'
};

// BMW Concierge Icon System
const bmwIcons = {
  /**
   * Initialize the icon system and replace all data-lucide attributes
   */
  createIcons: function() {
    // Find all elements with data-lucide attribute
    const iconElements = document.querySelectorAll('[data-lucide]');
    
    iconElements.forEach(element => {
      const iconName = element.getAttribute('data-lucide');
      
      if (BMW_ICONS[iconName]) {
        // Clear the element and set the Unicode icon
        element.innerHTML = BMW_ICONS[iconName];
        element.style.fontFamily = 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif';
        element.style.display = 'inline-flex';
        element.style.alignItems = 'center';
        element.style.justifyContent = 'center';
        element.style.fontSize = 'inherit';
        
        // Remove the data-lucide attribute
        element.removeAttribute('data-lucide');
      } else {
        console.warn(`BMW Icons: Icon "${iconName}" not found. Available icons:`, Object.keys(BMW_ICONS));
        // Fallback to a generic icon
        element.innerHTML = '📋';
        element.removeAttribute('data-lucide');
      }
    });
    
    console.log('BMW Icons: Successfully initialized', iconElements.length, 'icons');
  },

  /**
   * Get icon content for a specific icon
   * @param {string} iconName - Name of the icon
   * @returns {string} Icon content or null if not found
   */
  getIcon: function(iconName) {
    return BMW_ICONS[iconName] || null;
  },

  /**
   * Add a new icon to the collection
   * @param {string} name - Icon name
   * @param {string} content - Icon content (Unicode emoji)
   */
  addIcon: function(name, content) {
    BMW_ICONS[name] = content;
  },

  /**
   * Get list of available icons
   * @returns {Array} Array of icon names
   */
  getAvailableIcons: function() {
    return Object.keys(BMW_ICONS);
  }
};

// Make it globally available
window.bmwIcons = bmwIcons;

// Auto-initialize when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bmwIcons.createIcons);
} else {
  bmwIcons.createIcons();
}

// Also make it compatible with the existing lucide calls
window.lucide = {
  createIcons: bmwIcons.createIcons
};

console.log('BMW Icons system loaded successfully');
/*
 * BMW Concierge Icons - Simple and Reliable Icon System
 * Clean, minimalist approach with reliable rendering
 */

// BMW Blue monoline style automotive-themed SVG icons
const BMW_ICONS = {
  // Vehicle & Automotive
  'car': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0066CC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M5 12V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v5"/>
    <path d="M5 12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2"/>
    <circle cx="7" cy="16" r="2"/>
    <circle cx="17" cy="16" r="2"/>
    <path d="M12 6V4"/>
    <path d="M12 4h-2"/>
    <path d="M12 4h2"/>
  </svg>`,
  
  'bmw-car': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0066CC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M5 12V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v5"/>
    <path d="M5 12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2"/>
    <circle cx="7" cy="16" r="2"/>
    <circle cx="17" cy="16" r="2"/>
    <path d="M8 7h8"/>
    <circle cx="12" cy="4" r="2"/>
  </svg>`,
  
  // Status & Alerts
  'alert-circle': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0066CC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="8" x2="12" y2="12"/>
    <line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>`,
  
  'alert-triangle': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0066CC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
    <line x1="12" y1="9" x2="12" y2="13"/>
    <line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>`,
  
  'check-circle': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0066CC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="9,12 12,15 15,9"/>
  </svg>`,
  
  'info': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0066CC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="16" x2="12" y2="12"/>
    <line x1="12" y1="8" x2="12.01" y2="8"/>
  </svg>`,
  
  // Technical & Controls
  'settings': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0066CC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="3"/>
    <path d="M12 1v6m0 6v6"/>
    <path d="m4.93 4.93 4.24 4.24m5.66 5.66 4.24 4.24"/>
    <path d="M1 12h6m6 0h6"/>
    <path d="m4.93 19.07 4.24-4.24m5.66-5.66 4.24-4.24"/>
  </svg>`,
  
  'wrench': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0066CC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
  </svg>`,
  
  'battery': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0066CC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <rect x="2" y="6" width="16" height="12" rx="2"/>
    <path d="m22 10-2 0 0 4 2 0"/>
    <path d="M6 10h8"/>
    <path d="M6 14h8"/>
  </svg>`,
  
  'fuel': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0066CC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
    <path d="M12 7v5l4 2"/>
  </svg>`,
  
  'key': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0066CC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="7.5" cy="15.5" r="5.5"/>
    <path d="m21 2-9.6 9.6"/>
    <path d="m15.5 7.5 3 3L22 7l-3-3"/>
  </svg>`,
  
  'lock': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0066CC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <circle cx="12" cy="16" r="1"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>`,
  
  // Navigation & Movement
  'map': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0066CC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M3 6 9 3l6 3 6-3v15l-6 3-6-3-6 3z"/>
    <path d="M9 3v15"/>
    <path d="M15 6v15"/>
  </svg>`,
  
  'navigation': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0066CC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <polygon points="3,11 22,2 13,21 11,13 3,11"/>
  </svg>`,
  
  'monitor': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0066CC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
    <line x1="8" y1="21" x2="16" y2="21"/>
    <line x1="12" y1="17" x2="12" y2="21"/>
  </svg>`,
  
  // Data & Analytics
  'bar-chart-3': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0066CC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M3 3v18h18"/>
    <path d="M18 17V9"/>
    <path d="M13 17V5"/>
    <path d="M8 17v-3"/>
  </svg>`,
  
  'database': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0066CC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <ellipse cx="12" cy="5" rx="9" ry="3"/>
    <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/>
    <path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3"/>
  </svg>`,
  
  'wifi': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0066CC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M5 12.55a11 11 0 0 1 14.08 0"/>
    <path d="M1.42 9a16 16 0 0 1 21.16 0"/>
    <path d="M8.53 16.11a6 6 0 0 1 6.95 0"/>
    <line x1="12" y1="20" x2="12.01" y2="20"/>
  </svg>`,
  
  'wifi-off': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0066CC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <line x1="2" y1="2" x2="22" y2="22"/>
    <path d="M8.5 16.5a5 5 0 0 1 7 0"/>
    <path d="M2 8.82a15 15 0 0 1 4.17-2.65"/>
    <path d="M10.66 5c4.01-.36 8.14.9 11.34 3.76"/>
    <path d="M16.85 11.25a10 10 0 0 1 2.22 1.68"/>
    <line x1="12" y1="20" x2="12.01" y2="20"/>
  </svg>`,
  
  // Actions & States
  'loader': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0066CC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 2v4"/>
    <path d="m16.2 7.8 2.9-2.9"/>
    <path d="M18 12h4"/>
    <path d="m16.2 16.2 2.9 2.9"/>
    <path d="M12 18v4"/>
    <path d="m4.9 19.1 2.9-2.9"/>
    <path d="M2 12h4"/>
    <path d="m4.9 4.9 2.9 2.9"/>
  </svg>`,
  
  'play-circle': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0066CC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <polygon points="10,8 16,12 10,16 10,8"/>
  </svg>`,
  
  'clock': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0066CC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12,6 12,12 16,14"/>
  </svg>`,
  
  'thermometer': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0066CC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"/>
    <circle cx="12" cy="17" r="1"/>
  </svg>`,
  
  // BMW Specific
  'bmw-shield': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0066CC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    <path d="M9 12l2 2 4-4"/>
  </svg>`,
  
  'shield-check': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0066CC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    <path d="M9 12l2 2 4-4"/>
  </svg>`,
  
  // Additional automotive icons
  'map-pin': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0066CC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>`,
  
  'route': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0066CC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="6" cy="19" r="3"/>
    <path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"/>
    <circle cx="18" cy="5" r="3"/>
  </svg>`,
  
  'battery-charging': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0066CC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <rect x="2" y="6" width="16" height="12" rx="2"/>
    <path d="m22 10-2 0 0 4 2 0"/>
    <path d="M10 9l-2 3h4l-2 3"/>
  </svg>`,
  
  'dollar-sign': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0066CC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <line x1="12" y1="1" x2="12" y2="23"/>
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
  </svg>`,
  
  'bookmark': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0066CC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
  </svg>`,
  
  'share-2': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0066CC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="18" cy="5" r="3"/>
    <circle cx="6" cy="12" r="3"/>
    <circle cx="18" cy="19" r="3"/>
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
  </svg>`,
  
  'refresh-cw': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0066CC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M3 2v6h6"/>
    <path d="M21 12A9 9 0 0 0 6 5.3L3 8"/>
    <path d="M21 22v-6h-6"/>
    <path d="M3 12a9 9 0 0 0 15 6.7l3-2.7"/>
  </svg>`
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
        // Clear the element and set the SVG icon
        element.innerHTML = BMW_ICONS[iconName];
        
        // Style the container element for proper SVG display
        element.style.display = 'inline-flex';
        element.style.alignItems = 'center';
        element.style.justifyContent = 'center';
        element.style.flexShrink = '0'; // Prevent shrinking
        
        // Style the SVG element itself
        const svg = element.querySelector('svg');
        if (svg) {
          // Inherit size from parent or use default
          if (!svg.getAttribute('width') || svg.getAttribute('width') === '24') {
            svg.style.width = 'inherit';
            svg.style.height = 'inherit';
          }
          svg.style.display = 'block';
          svg.style.pointerEvents = 'none'; // Prevent SVG from interfering with clicks
        }
        
        // Remove the data-lucide attribute
        element.removeAttribute('data-lucide');
      } else {
        console.warn(`BMW Icons: Icon "${iconName}" not found. Available icons:`, Object.keys(BMW_ICONS));
        // Fallback to a generic automotive icon
        element.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0066CC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="11" width="18" height="10" rx="2" ry="2"/>
          <circle cx="7" cy="16" r="1"/>
          <circle cx="17" cy="16" r="1"/>
          <path d="M8 11V7a4 4 0 0 1 8 0v4"/>
        </svg>`;
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
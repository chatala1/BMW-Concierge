/*
 * BMW Concierge Icons - Local Swift UI Style Icons
 * Based on Lucide icon library with Swift UI aesthetic
 * Provides offline icon functionality
 */

// Icon SVG definitions - Swift UI style icons
const BMW_ICONS = {
  'alert-circle': `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="12" y1="8" x2="12" y2="12"/>
      <line x1="12" y1="16" x2="12.01" y2="16"/>
    </svg>
  `,
  'alert-triangle': `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
      <line x1="12" y1="9" x2="12" y2="13"/>
      <line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  `,
  'bar-chart-3': `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M3 3v18h18"/>
      <path d="m19 9-5 5-4-4-3 3"/>
    </svg>
  `,
  'car': `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M5 17h-.5A2.5 2.5 0 0 1 2 14.5v-2A2.5 2.5 0 0 1 4.5 10H7l.5-2h9l.5 2h2.5A2.5 2.5 0 0 1 22 12.5v2a2.5 2.5 0 0 1-2.5 2.5H19"/>
      <circle cx="7" cy="17" r="2"/>
      <circle cx="17" cy="17" r="2"/>
    </svg>
  `,
  'check-circle': `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
      <polyline points="22,4 12,14.01 9,11.01"/>
    </svg>
  `,
  'database': `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3"/>
      <path d="m3 5 v 14 c 0 3 4 6 9 6 s 9-3 9-6 V 5"/>
      <path d="m3 12 c 0 3 4 6 9 6 s 9-3 9-6"/>
    </svg>
  `,
  'info': `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="12" y1="16" x2="12" y2="12"/>
      <line x1="12" y1="8" x2="12.01" y2="8"/>
    </svg>
  `,
  'loader': `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
    </svg>
  `,
  'lock': `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
      <circle cx="12" cy="16" r="1"/>
      <path d="m7 11 V 7 a 5 5 0 0 1 10 0 v 4"/>
    </svg>
  `,
  'map': `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/>
      <line x1="9" y1="3" x2="9" y2="18"/>
      <line x1="15" y1="6" x2="15" y2="21"/>
    </svg>
  `,
  'monitor': `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect width="20" height="14" x="2" y="3" rx="2"/>
      <line x1="8" y1="21" x2="16" y2="21"/>
      <line x1="12" y1="17" x2="12" y2="21"/>
    </svg>
  `,
  'play-circle': `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <polygon points="10,8 16,12 10,16"/>
    </svg>
  `,
  'settings': `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  `,
  'shield-check': `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 13c0 5-3.5 7.5-8 10.5-4.5-3-8-5.5-8-10.5 0 0 0-2.5 8-8 8 5.5 8 8 8 8"/>
      <path d="m9 12 2 2 4-4"/>
    </svg>
  `,
  'wifi': `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="m1 9 3 3v10c0 .6.4 1 1 1h14c.6 0 1-.4 1-1V12l3-3"/>
      <path d="M2 7.586V2c0-.6.4-1 1-1h6c.6 0 1 .4 1 1v5.586"/>
      <circle cx="12" cy="19" r="1"/>
    </svg>
  `,
  'wifi-off': `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <line x1="2" y1="2" x2="22" y2="22"/>
      <path d="M10.66 5H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-9.34"/>
      <line x1="14" y1="2" x2="20" y2="2"/>
      <line x1="20" y1="2" x2="20" y2="8"/>
      <line x1="20" y1="8" x2="14" y2="8"/>
    </svg>
  `,
  'wrench': `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
    </svg>
  `,
  // Additional BMW/Automotive relevant Swift UI style icons
  'battery': `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect width="16" height="10" x="2" y="7" rx="2" ry="2"/>
      <line x1="22" y1="11" x2="22" y2="13"/>
    </svg>
  `,
  'fuel': `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <line x1="3" y1="22" x2="15" y2="22"/>
      <line x1="4" y1="9" x2="14" y2="9"/>
      <path d="m14 22-1-10h-2l-1 10"/>
      <path d="m14 13 1-9h2l1 9"/>
      <path d="M22 12a2 2 0 0 0-2-2h-1l-1 2v6l1 2h1a2 2 0 0 0 2-2Z"/>
    </svg>
  `,
  'navigation': `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="3 11 22 2 13 21 11 13 3 11"/>
    </svg>
  `,
  'key': `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="7.5" cy="15.5" r="5.5"/>
      <path d="m21 2-9.6 9.6"/>
      <path d="m15.5 7.5 3 3L22 7l-3-3"/>
    </svg>
  `,
  'clock': `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12,6 12,12 16,14"/>
    </svg>
  `,
  'thermometer': `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"/>
    </svg>
  `
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
        // Get current classes for styling
        const currentClasses = element.className;
        
        // Create a wrapper div to maintain the same element structure
        const wrapper = document.createElement('div');
        wrapper.className = currentClasses;
        wrapper.innerHTML = BMW_ICONS[iconName];
        
        // Copy any inline styles
        if (element.style.cssText) {
          wrapper.style.cssText = element.style.cssText;
        }
        
        // Copy any other attributes except data-lucide
        Array.from(element.attributes).forEach(attr => {
          if (attr.name !== 'data-lucide' && attr.name !== 'class') {
            wrapper.setAttribute(attr.name, attr.value);
          }
        });
        
        // Replace the original element
        element.parentNode.replaceChild(wrapper, element);
      } else {
        console.warn(`BMW Icons: Icon "${iconName}" not found. Available icons:`, Object.keys(BMW_ICONS));
      }
    });
    
    console.log('BMW Icons: Successfully initialized', iconElements.length, 'icons');
  },

  /**
   * Get SVG content for a specific icon
   * @param {string} iconName - Name of the icon
   * @returns {string} SVG content or null if not found
   */
  getIcon: function(iconName) {
    return BMW_ICONS[iconName] || null;
  },

  /**
   * Add a new icon to the collection
   * @param {string} name - Icon name
   * @param {string} svg - SVG content
   */
  addIcon: function(name, svg) {
    BMW_ICONS[name] = svg;
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
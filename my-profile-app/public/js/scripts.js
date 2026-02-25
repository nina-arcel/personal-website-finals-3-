function showTab(tabName) {
    // Hide all tabs
    const tabs = document.getElementsByClassName('tab-content');
    for (let i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove('active-tab');
    }
    
    // Remove active class from all buttons
    const buttons = document.getElementsByClassName('tab-btn');
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove('active');
    }
    
    // Show selected tab
    document.getElementById(tabName).classList.add('active-tab');
    
    // Add active class to clicked button
    event.target.classList.add('active');
}

// Make sure this function is globally available
window.showTab = function(tabName, event) {
    console.log('Switching to tab:', tabName); // Debug log
    
    // Hide all tabs
    const tabs = document.getElementsByClassName('tab-content');
    for (let i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove('active-tab');
    }
    
    // Remove active class from all buttons
    const buttons = document.getElementsByClassName('tab-btn');
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove('active');
    }
    
    // Show selected tab
    const selectedTab = document.getElementById(tabName);
    if (selectedTab) {
        selectedTab.classList.add('active-tab');
    } else {
        console.error('Tab not found:', tabName);
    }
    
    // Add active class to clicked button
    if (event && event.target) {
        event.target.classList.add('active');
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('Scripts loaded successfully');
    
    // Make sure About tab is active
    const aboutTab = document.getElementById('about');
    const aboutBtn = document.querySelector('.tab-btn');
    
    if (aboutTab && aboutBtn) {
        aboutTab.classList.add('active-tab');
        aboutBtn.classList.add('active');
    }
});
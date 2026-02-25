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
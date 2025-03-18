// popup.js - Handles the extension popup UI

document.addEventListener('DOMContentLoaded', function() {
  console.log("Popup DOM loaded");
  
  // Get DOM elements
  const loginButton = document.getElementById('login-button');
  const logoutButton = document.getElementById('logout-button');
  const startRecordingButton = document.getElementById('start-recording-button');
  const stopRecordingButton = document.getElementById('stop-recording-button');
  const clearRecordingButton = document.getElementById('clear-recording');
  const generateScriptButton = document.getElementById('generate-script');
  const saveToProjectButton = document.getElementById('save-to-project');
  const projectDropdown = document.getElementById('projectDropdown');
  const fileDropdown = document.getElementById('fileDropdown');
  const submitTokenButton = document.getElementById('submit-token-button');
  const tokenInput = document.getElementById('token-input');
  
  // Initialize UI state
  initializePopup();
  
  // Add event listeners
  if (loginButton) loginButton.addEventListener('click', navigateToLogin);
  if (logoutButton) logoutButton.addEventListener('click', handleLogout);
  if (startRecordingButton) startRecordingButton.addEventListener('click', startRecording);
  if (stopRecordingButton) stopRecordingButton.addEventListener('click', stopRecording);
  if (clearRecordingButton) clearRecordingButton.addEventListener('click', clearRecording);
  if (generateScriptButton) generateScriptButton.addEventListener('click', handleGenerateScript);
  if (saveToProjectButton) saveToProjectButton.addEventListener('click', handleSaveScriptToProject);
  if (projectDropdown) projectDropdown.addEventListener('change', handleProjectChange);
  if (submitTokenButton) submitTokenButton.addEventListener('click', handleManualTokenSubmit);
  
  // Fetch projects when popup opens
  if (projectDropdown) {
    fetchProjects();
  }
  
  // Check for authentication status
  checkAuthStatus();
});

/**
 * Initialize the popup UI
 */
function initializePopup() {
  console.log("Initializing popup");
  
  try {
    // Set up UI elements
    setupUIElements();
    
    // Set up event listeners
    setupEventListeners();
  } catch (error) {
    console.error("Error initializing popup:", error);
    showError("Failed to initialize popup");
  }
}

/**
 * Set up UI elements
 */
function setupUIElements() {
  console.log("Setting up UI elements");
  
  try {
    // Get UI sections
    const authSection = document.getElementById('auth-section');
    const recordingSection = document.getElementById('recording-section');
    const userInfoSection = document.getElementById('user-info');
    const notification = document.getElementById('notification');
    const errorMessage = document.getElementById('error-message');
    const projectDropdown = document.getElementById('projectDropdown');
    const fileDropdown = document.getElementById('fileDropdown');
    const tokenInput = document.getElementById('token-input');
    const submitTokenButton = document.getElementById('submit-token-button');
    
    // Initially hide recording section and user info
    if (recordingSection) recordingSection.style.display = 'none';
    if (userInfoSection) userInfoSection.style.display = 'none';
    
    // Clear any notifications
    if (notification) notification.style.display = 'none';
    if (errorMessage) errorMessage.style.display = 'none';
    
    // Disable project and file dropdowns initially
    if (projectDropdown) projectDropdown.disabled = true;
    if (fileDropdown) fileDropdown.disabled = true;
  } catch (error) {
    console.error("Error setting up UI elements:", error);
    console.error("Failed to set up UI:", error);
  }
}

/**
 * Handle manual token submission
 */
function handleManualTokenSubmit() {
  console.log("Submitting token manually");
  const tokenInput = document.getElementById('token-input');
  const token = tokenInput ? tokenInput.value.trim() : null;
  
  if (!token) {
    showError("Please enter a valid token.");
    return;
  }
  
  // Send token to background script for verification
  chrome.runtime.sendMessage(
    { action: 'setAuthToken', token: token },
    function(response) {
      if (chrome.runtime.lastError) {
        console.error('Error sending token to background:', chrome.runtime.lastError);
        showError('Failed to verify token: ' + chrome.runtime.lastError.message);
        return;
      }
      
      if (response && response.success) {
        showNotification('Token verified successfully');
        updateUIForAuthenticated();
        
        // Update user info if available
        if (response.userData) {
          const userEmail = document.getElementById('user-email');
          const userRole = document.getElementById('user-role');
          
          if (userEmail) userEmail.textContent = response.userData.email;
          if (userRole) userRole.textContent = response.userData.role;
        }
      } else {
        showError('Token verification failed: ' + (response ? response.error : 'Unknown error'));
      }
    }
  );
}

// Rest of the popup.js code remains the same...

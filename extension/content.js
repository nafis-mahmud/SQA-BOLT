// Listen for messages from the web page
window.addEventListener('message', function(event) {
  // Only accept messages from our web app
  if (event.origin !== 'https://sqassh.netlify.app') return;
  
  // Verify message source and structure
  if (event.data.source !== 'extension-bridge') return;
  
  // Handle different message types
  switch (event.data.action) {
    case 'authTokenResponse':
      handleAuthTokenFromWebApp(event.data.token);
      break;
  }
});

// Handle auth token received from web app
function handleAuthTokenFromWebApp(token) {
  if (!token) return;
  
  // Send token to background script
  chrome.runtime.sendMessage(
    { action: 'setAuthToken', token: token },
    function(response) {
      if (chrome.runtime.lastError) {
        console.error('Error sending token to background:', chrome.runtime.lastError);
        return;
      }
      
      if (response && response.success) {
        console.log('Token successfully set in extension');
      } else {
        console.error('Failed to set token:', response?.error);
      }
    }
  );
}

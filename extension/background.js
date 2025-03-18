// Store for auth token
let authToken = null;

// Listen for messages from popup or content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.action) {
    case "setAuthToken":
      handleSetAuthToken(request.token, sendResponse);
      break;
      
    case "getToken":
      handleGetToken(sendResponse);
      break;
      
    case "removeToken":
      handleRemoveToken(sendResponse);
      break;
  }
  
  // Keep the message channel open for async response
  return true;
});

// Handle setting the auth token
async function handleSetAuthToken(token, sendResponse) {
  try {
    // Verify token with the web app
    const response = await fetch('https://sqassh.netlify.app/api/verify-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token })
    });
    
    const data = await response.json();
    
    if (data.valid) {
      // Store token in extension storage
      await chrome.storage.local.set({ authToken: token });
      authToken = token;
      
      sendResponse({ 
        success: true, 
        userData: data.userData 
      });
    } else {
      sendResponse({ 
        success: false, 
        error: data.error || 'Invalid token' 
      });
    }
  } catch (error) {
    console.error('Error setting auth token:', error);
    sendResponse({ 
      success: false, 
      error: 'Failed to verify token' 
    });
  }
}

// Handle getting the stored token
async function handleGetToken(sendResponse) {
  try {
    const result = await chrome.storage.local.get(['authToken']);
    sendResponse({ 
      success: true, 
      token: result.authToken || null 
    });
  } catch (error) {
    console.error('Error getting auth token:', error);
    sendResponse({ 
      success: false, 
      error: 'Failed to get token' 
    });
  }
}

// Handle removing the stored token
async function handleRemoveToken(sendResponse) {
  try {
    await chrome.storage.local.remove(['authToken']);
    authToken = null;
    sendResponse({ success: true });
  } catch (error) {
    console.error('Error removing auth token:', error);
    sendResponse({ 
      success: false, 
      error: 'Failed to remove token' 
    });
  }
}

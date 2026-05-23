// Error page renderer for SSR error handling
// Renders a branded error page when SSR fails

export function renderErrorPage(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Server Error</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
    }
    .error-container {
      text-align: center;
      padding: 2rem;
      max-width: 600px;
    }
    .error-code {
      font-size: 8rem;
      font-weight: bold;
      opacity: 0.8;
      line-height: 1;
      margin-bottom: 1rem;
    }
    .error-title {
      font-size: 2rem;
      margin-bottom: 1rem;
      font-weight: 600;
    }
    .error-message {
      font-size: 1.125rem;
      opacity: 0.9;
      line-height: 1.6;
      margin-bottom: 2rem;
    }
    .error-actions {
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;
    }
    .error-button {
      background: rgba(255, 255, 255, 0.2);
      border: 2px solid rgba(255, 255, 255, 0.3);
      color: white;
      padding: 0.75rem 1.5rem;
      border-radius: 0.5rem;
      text-decoration: none;
      font-weight: 500;
      transition: all 0.2s;
      cursor: pointer;
    }
    .error-button:hover {
      background: rgba(255, 255, 255, 0.3);
      border-color: rgba(255, 255, 255, 0.5);
    }
    @media (max-width: 640px) {
      .error-code {
        font-size: 5rem;
      }
      .error-title {
        font-size: 1.5rem;
      }
    }
  </style>
</head>
<body>
  <div class="error-container">
    <div class="error-code">500</div>
    <h1 class="error-title">Server Error</h1>
    <p class="error-message">
      We're sorry, but something went wrong on our end. Please try again later or refresh the page.
    </p>
    <div class="error-actions">
      <a href="/" class="error-button">Go Home</a>
      <button class="error-button" onclick="location.reload()">Refresh Page</button>
    </div>
  </div>
</body>
</html>`;
}

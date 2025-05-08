import { useState, useEffect } from 'react';

function InstallPWA() {
  const [installPrompt, setInstallPrompt] = useState(null);
  const [isAppInstalled, setIsAppInstalled] = useState(false);

  useEffect(() => {
    // Capture the install prompt
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setInstallPrompt(e);
    };

    // Check if app is already installed
    const handleAppInstalled = () => {
      setIsAppInstalled(true);
      setInstallPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = () => {
    if (!installPrompt) return;
    
    // Show the install prompt
    installPrompt.prompt();
    
    // Wait for the user to respond to the prompt
    installPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      setInstallPrompt(null);
    });
  };

  // Only show install button if prompt is available and app is not installed
  if (!installPrompt || isAppInstalled) return null;

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 bg-white shadow-lg rounded-lg p-4 flex items-center">
      <div className="mr-3">
        <p className="font-bold">Install Nike App</p>
        <p className="text-sm text-slate-gray">Add to your home screen</p>
      </div>
      <button 
        onClick={handleInstallClick}
        className="bg-coral-red text-white py-2 px-4 rounded-full"
      >
        Install
      </button>
    </div>
  );
}

export default InstallPWA;
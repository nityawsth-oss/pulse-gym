import React from 'react';
import AuthScreens from './AuthScreens';

// AuthPage wraps the proper split-layout AuthScreens component.
// initialRoute: 'login' | 'signup' | 'verify-email' | 'forgot-password'
export default function AuthPage({ initialRoute = 'login', onLoginSuccess, onBackToLanding }) {
  return (
    <AuthScreens
      initialRoute={initialRoute}
      onAuthSuccess={onLoginSuccess}
      onBackToLanding={onBackToLanding}
    />
  );
}

// src/components/Auth/AuthPage.tsx
import React from 'react';
import { useApp } from '../../context/AppContext';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

const AuthPage: React.FC = () => {
  const { showSignup } = useApp();

  return showSignup ? <SignupForm /> : <LoginForm />;
};

export default AuthPage;

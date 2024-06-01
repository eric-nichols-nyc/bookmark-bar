'use client';

import { useSignIn } from '@clerk/nextjs';
import * as React from 'react';
import {Button} from '../../../components/ui/button';
export default function OauthSignIn() {
  const { signIn } = useSignIn();

  if (!signIn) return null;

  const signInWithGoogle = () => {
    return signIn.authenticateWithRedirect({
      strategy: 'oauth_google',
      redirectUrl: '/sign-up/sso-callback',
      redirectUrlComplete: '/',
    });
  };

  // Render a button for each supported OAuth provider
  // you want to add to your app. This example uses only Google.
  return (
    <div>
      <Button onClick={() => signInWithGoogle()}>
        Sign in with Google
      </Button>
    </div>
  );
}
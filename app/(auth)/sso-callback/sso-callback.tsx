import { AuthenticateWithRedirectCallback } from '@clerk/nextjs/server';
 
export default function SSOCallBack() {
  return <AuthenticateWithRedirectCallback />;
}
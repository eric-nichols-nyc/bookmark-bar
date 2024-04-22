import Clerk from '@clerk/clerk-js';
import { chromium, expect, test as setup } from '@playwright/test';

const fs = require('fs');

type ClerkType = typeof Clerk;


const authFile = './playwright/setup/storageState.json';

setup('Setup Auth', async ({ page, context }) => {
    await page.goto("http://localhost:3000/");
    await page.waitForLoadState('networkidle')

    const data = {
        userId: process.env.PLAYWRIGHT_E2E_USER_ID || '',
        loginPayload: {
            strategy: 'password',
            identifier: process.env.PLAYWRIGHT_E2E_USER_EMAIL || '',
            password: process.env.PLAYWRIGHT_E2E_USER_PASSWORD || '',
        }
    }

    console.log('data', data);

    const result = await page.evaluate(async data => {
        // wait function as promise
        const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

        const wdw = window as Window & typeof globalThis & { Clerk: ClerkType };
        /** clear the cookies */

        document.cookie.split(";").forEach(function (c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
        // clerk to be ready
        const clerkIsReady = (wdw: Window & typeof globalThis & { Clerk: ClerkType }) => {
            return wdw.Clerk  && wdw.Clerk.setActive;
        };
        while (!clerkIsReady(wdw)) {
            await wait(100);
        }

        console.log('Clerk is ready');

        /** if the session is still valid just return true */
        if (wdw.Clerk.session?.expireAt && wdw.Clerk.session.expireAt > new Date()) {
            return true;
        }

        /** if its a different user currently logged in sign out */
        if (wdw.Clerk.user?.id !== data.userId) {
            await wdw.Clerk.signOut();
        }

        /**
   * otherwise signin
   */
        const res = await wdw.Clerk.client?.signIn.create(data.loginPayload);

        if (!res) {
            return false
        }

        /** set the session as active */
        await wdw.Clerk.setActive({
            session: res.createdSessionId,
        });

        return true

    }, data);


    if (!result) {
        throw new Error('Failed to sign in');
    }

    const pageContext = await page.context();

    let cookies = await pageContext.cookies();

    // clerk polls the session cookie, so we have to set a wait
    while (!cookies.some(c => c.name === '__session')) {
        cookies = await pageContext.cookies();
    }

    console.log('cookies', cookies);
    // fs.writeFileSync('cookies.json', cookies.toString());   

    // store the cookies in the state.json
    await pageContext.storageState({ path: authFile });
});
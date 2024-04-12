https://bookmarks-dev.loca.lt/api/webhooks/user

To add users you must have local tunnel running and have the endpoint connected to Clerk

Fetch long-lived token
paste 'await window.Clerk.session.getToken({ template: "testing-template" });'in console
// https://clerk.com/docs/testing/postman-or-insomnia#generate-long-lived-jwt-template
# react-hook-google-one-tap
Google One Tap Authentication Hooks

## Usage

```tsx
import useGoogleOneTapLogin from 'react-hook-google-one-tap'

useGoogleOneTapLogin({
  googleAccountConfigs: { client_id: 'YOUR_CLIENT_ID.apps.googleusercontent.com' },
  onSuccess: credential => fetch('/api/login', { method: 'POST', body: credential }),
  onError: error => console.error(error)
})
```

## Security: verify the credential on your server

`onSuccess` receives the raw Google ID token (a signed JWT). The hook does **not**
verify it, and nothing done in the browser can make it trustworthy.

Before treating the user as logged in, your server must verify the token's
signature, check that `aud` equals your client ID, and check `iss` and `exp`.
Use Google's server library for this, e.g. `verifyIdToken()` in
`google/apiclient` (PHP) or `google-auth-library` (Node). Without the `aud`
check, a token Google issued to any other app would be accepted.

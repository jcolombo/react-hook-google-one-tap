import { useEffect } from 'react'
import { IUseGoogleOneTapLogin, IGoogleCallbackResponse } from './types'
import useScript from './useScript'

const scriptFlag: string = '__googleOneTapScript__'
const googleClientScriptURL: string = 'https://accounts.google.com/gsi/client'

// Hands back the raw ID token. It is NOT verified here: the consumer's server
// must verify its signature, `aud` (your client ID), `iss` and `exp` before
// trusting any identity in it. A browser-side check can always be bypassed.
function callback({
  data,
  onError,
  onSuccess
}: {
  data: IGoogleCallbackResponse
  onError?: IUseGoogleOneTapLogin['onError']
  onSuccess?: IUseGoogleOneTapLogin['onSuccess']
}) {
  if (data?.credential) {
    if (onSuccess) {
      onSuccess(data.credential)
    }
  } else if (onError) {
    onError('Google returned no credential')
  }
}

const useGoogleOneTapLogin = ({
  onError,
  disabled,
  onSuccess,
  googleAccountConfigs,
  disableCancelOnUnmount = false
}: IUseGoogleOneTapLogin) => {
  const script = useScript(googleClientScriptURL)
  // Use the user's custom callback if they specified one; otherwise use the default one defined above:
  const callbackToUse = googleAccountConfigs.callback
    ? googleAccountConfigs.callback
    : (data: IGoogleCallbackResponse) => callback({ data, onError, onSuccess })

  useEffect(() => {
    if (!window?.[scriptFlag] && window.google && script === 'ready') {
      window.google.accounts.id.initialize({
        ...googleAccountConfigs,
        callback: callbackToUse
      })
      window[scriptFlag] = true
    }
    if (window?.[scriptFlag] && script === 'ready' && !disabled) {
      window.google.accounts.id.prompt()

      return () => {
        if (!disableCancelOnUnmount) {
          window.google.accounts.id.cancel()
        }
      }
    }
  }, [script, window?.[scriptFlag], disabled])

  return null
}

export default useGoogleOneTapLogin

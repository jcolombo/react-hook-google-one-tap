import { memo } from 'react'
import { IGoogleOneTapLogin } from './types'
import useGoogleOneTapLogin from './useGoogleOneTapLogin'
//
// const GoogleOneTapLogin = ({
//   children = null,
//   ...props
// }: IGoogleOneTapLogin) => {
//   useGoogleOneTapLogin(props)
//   return children
// }
//
// export default memo(GoogleOneTapLogin)
//
// export { useGoogleOneTapLogin }

export default useGoogleOneTapLogin

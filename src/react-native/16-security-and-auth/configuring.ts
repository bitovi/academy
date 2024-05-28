import { GoogleSignin } from "@react-native-google-signin/google-signin"

const googleOauthwebClientId = process.env.GOOGLE_OAUTH_CLIENT_ID

GoogleSignin.configure({
  scopes: ["openid", "profile", "email"],
  webClientId: googleOauthwebClientId,
})

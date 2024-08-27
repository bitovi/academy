import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin"

const signIn = async () => {
  try {
    const userInfo = await GoogleSignin.signIn()
    console.info(userInfo)
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      // User cancelled the login flow.
    } else if (error.code === statusCodes.IN_PROGRESS) {
      // Operation is in progress already.
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      // Play services not available or outdated.
    } else {
      // Some other error happened.
    }
  }
}

export default signIn

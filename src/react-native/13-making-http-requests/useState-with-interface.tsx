import { useState } from "react"
import { View, Text, Pressable } from "react-native"

interface UserProfile {
  email: string
  name: string
}

const UserProfileComponent: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile>({
    email: "grace.hopper@example.com",
    name: "Grace Hopper",
  })

  const updateProfile = () => {
    setUserProfile({
      email: "ada.lovelace@example.com",
      name: "Ada Lovelace",
    })
  }

  return (
    <View>
      <Text>Name: {userProfile.name}</Text>
      <Text>Email: {userProfile.email}</Text>
      <Pressable onPress={updateProfile}>
        <Text>Update profile</Text>
      </Pressable>
    </View>
  )
}

export default UserProfileComponent

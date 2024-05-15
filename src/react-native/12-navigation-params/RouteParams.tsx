import { useNavigation } from "@react-navigation/native"
import { StackScreenProps } from "@react-navigation/stack"
import { View, Text, Pressable } from "react-native"

import { ShopStackParamList } from "./StackRoute"

type ProfileProps = StackScreenProps<ShopStackParamList, "UserProfile">

const UserProfile: React.FC<ProfileProps> = ({ route }) => {
  const { user } = route.params
  const navigation = useNavigation()

  return (
    <View>
      <Text variant="heading">
        Hello! {user.firstName} {user.lastName}. Is your {user.email} correct?
      </Text>
      <Pressable
        onPress={() => {
          navigation.navigate("Storefront", { user, slug: "mainPage" })
        }}
      >
        Shop Here!
      </Pressable>
    </View>
  )
}

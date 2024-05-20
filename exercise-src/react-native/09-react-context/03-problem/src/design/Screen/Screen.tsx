import { ScrollView } from "react-native"

import Box, { BoxProps } from "../Box"
import { useTheme } from "../theme"

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ScreenProps extends BoxProps {
  //
}

const Screen: React.FC<ScreenProps> = ({ style, children, ...props }) => {
  const { palette } = useTheme()

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <Box
        style={{
          flex: 1,
          backgroundColor: palette.screen.soft,
        }}
        {...props}
      >
        {children}
      </Box>
    </ScrollView>
  )
}

export default Screen

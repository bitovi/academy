import type { FC } from "react"
import { ScrollView } from "react-native"
import type { BoxProps } from "../Box"

import { useTheme } from "../theme"
import Box from "../Box"

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ScreenProps extends BoxProps {
  //
}

const Screen: FC<ScreenProps> = ({ children, style, ...props }) => {
  const { palette } = useTheme()

  return (
    <ScrollView>
      <Box
        padding="s"
        style={{
          height: "100%",
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

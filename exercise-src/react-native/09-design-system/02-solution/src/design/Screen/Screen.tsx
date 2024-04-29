import type { FC } from "react"
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
    <Box
      padding="s"
      style={{
        height: "100%",
        backgroundColor: palette.screen.soft,
      }}
      {...props}
    >
      {children}
    </Box>
  )
}

export default Screen

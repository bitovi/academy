import Box, { BoxProps } from "@shared/design/Box"
import { useTheme } from "@shared/design/theme"

export interface ScreenProps extends BoxProps {
  noScroll?: boolean
}

const Screen: React.FC<ScreenProps> = ({
  noScroll = false,
  style,
  children,
  ...props
}) => {
  const theme = useTheme()

  return (
    <Box
      scrollable={!noScroll}
      style={{
        flex: 1,
        backgroundColor: theme.palette.screen.soft,
      }}
      {...props}
    >
      {children}
    </Box>
  )
}

export default Screen

import Box from "@shared/design/Box"
import { Theme, useTheme } from "@shared/design/theme"
import Typography from "@shared/design/Typography"
import { Pressable, StyleSheet } from "react-native"

export interface TabsProps {
  options: Array<{
    label: string
    value: string
  }>
  value: string
  onChange: (value: string) => void
}

const Tabs: React.FC<TabsProps> = ({ options, value: activeTab, onChange }) => {
  const theme = useTheme()
  const styles = getStyles(theme)

  return (
    <Box style={styles.wrapper}>
      {options.map(({ value, label }) => {
        const isActive = value === activeTab

        return (
          <Pressable
            key={value}
            onPress={() => onChange(value)}
            style={StyleSheet.compose(styles.tab, isActive && styles.activeTab)}
          >
            <Typography
              variant="title"
              style={StyleSheet.compose(
                styles.tabText,
                isActive && styles.activeTabText,
              )}
            >
              {label}
            </Typography>
          </Pressable>
        )
      })}
    </Box>
  )
}

export default Tabs

function getStyles(theme: Theme) {
  return StyleSheet.create({
    wrapper: {
      flexDirection: "row",
    },
    tab: {
      flex: 1,
      alignItems: "center",
      padding: theme.spacing.m,
      borderWidth: 1,

      borderColor: theme.palette.primary.main,
      backgroundColor: theme.palette.screen.main,
    },
    tabText: {
      color: theme.palette.screen.contrast,
    },
    activeTab: {
      backgroundColor: theme.palette.primary.main,
    },
    activeTabText: {
      color: theme.palette.primary.contrast,
    },
  })
}

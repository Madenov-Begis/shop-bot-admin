import { ReactNode } from 'react'
import { Group, GroupProps, Title } from '@mantine/core'

interface PageHeadProps extends GroupProps {
  renderButton: ReactNode
  title: string
}

export const PageHead = (props: PageHeadProps) => {
  const { mb = 'lg', renderButton, title, ...otherProps } = props

  return (
    <Group justify="space-between" mb={mb} {...otherProps}>
      <Title order={2}>{title}</Title>
      {renderButton}
    </Group>
  )
}

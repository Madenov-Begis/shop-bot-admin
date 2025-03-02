import dayjs from 'dayjs'
import { AreaChart } from '@mantine/charts'
import { useUserChart } from '../queries/home-page-queries'
import { DateInput } from '@mantine/dates'
import { Group, Stack, Text } from '@mantine/core'
import { useState } from 'react'

export const UsersChart = () => {
  const [start, setStart] = useState<Date | null>(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1)
  )
  const [end, setEnd] = useState<Date | null>(new Date())

  const { data: usersChart } = useUserChart({
    start_date: dayjs(start).format('YYYY-MM-DD'),
    end_date: dayjs(end).format('YYYY-MM-DD'),
  })

  const changedData = usersChart?.data.map((item) => {
    return {
      date: new Date(item.date).toLocaleDateString(),
      Пользователи: +item.count,
    }
  })

  return (
    <Stack>
      <Text fw={600} size="xl">
        Количество посещений
      </Text>

      <Group>
        <DateInput
          valueFormat="YYYY-MM-DD"
          label={'Начало'}
          maxDate={new Date()}
          value={start}
          onChange={setStart}
        />
        <DateInput
          valueFormat="YYYY-MM-DD"
          label={'Конец'}
          maxDate={new Date()}
          value={end}
          onChange={setEnd}
        />
      </Group>

      <AreaChart
        mt={'lg'}
        h={300}
        data={changedData ?? []}
        dataKey="date"
        series={[{ name: 'Пользователи', color: 'indigo.6' }]}
        curveType="linear"
      />
    </Stack>
  )
}

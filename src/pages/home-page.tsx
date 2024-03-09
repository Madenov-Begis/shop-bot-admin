import { UsersChart } from '@/features/home-page/ui/users-chart'
import { PageHead } from '@/shared/ui/page-head/page-head'

const HomePage = () => {
  return (
    <>
      <PageHead title="Главная" renderButton={null} />

      <UsersChart />
    </>
  )
}

export default HomePage

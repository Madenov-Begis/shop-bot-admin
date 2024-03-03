import { UsersList } from '@/features/users/ui/users-list'
import { PageHead } from '@/shared/ui/page-head/page-head'

const UsersPage = () => {
  return (
    <>
      <PageHead title="Пользователи" renderButton={null} />

      <UsersList />
    </>
  )
}

export default UsersPage

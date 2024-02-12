import { CompanyList } from '@/features/companies/ui/company-list'
import { CreateCompany } from '@/features/companies/ui/create-company'
import { PageHead } from '@/shared/ui/page-head/page-head'
import { Button } from '@mantine/core'
import { modals } from '@mantine/modals'

const CompaniesPage = () => {
  const handleCreate = () => {
    modals.open({
      title: 'Добавление компанию',
      children: <CreateCompany />,
    })
  }
  return (
    <>
      <PageHead
        title="Компания"
        renderButton={<Button onClick={handleCreate}>Добавить</Button>}
      />

      <CompanyList />
    </>
  )
}

export default CompaniesPage

import { ErrorAlert } from '@/shared/ui/error-alert/error-alert'
import { CompanyForm } from './company-form'
import { Center, Loader } from '@mantine/core'
import { useFetchCompany, useUpdateCompany } from '../queries/company-queries'
import { CompanyBody } from '../types/company'
import { modals } from '@mantine/modals'

export const UpdateCompany = ({ companyId }: { companyId: number }) => {
  const {
    data: company,
    isFetching,
    error,
    isError,
    isSuccess,
  } = useFetchCompany(companyId)

  const updateMutation = useUpdateCompany()

  const handleSubmit = async (body: CompanyBody) => {
    try {
      await updateMutation.mutateAsync({ companyId, body })
      modals.closeAll()
    } catch (error) {
      return Promise.reject(error)
    }
  }

  return (
    <>
      {isError && <ErrorAlert message={error.message} />}

      {isFetching && (
        <Center>
          <Loader />
        </Center>
      )}

      {isSuccess && !isFetching && (
        <>
          {updateMutation.isError && !updateMutation.error.errors && (
            <ErrorAlert message={updateMutation.error.message} mb="md" />
          )}

          <CompanyForm
            initialValues={company.data}
            submitFn={handleSubmit}
            loading={updateMutation.isPending}
            submitTitle="Сохранить"
          />
        </>
      )}
    </>
  )
}

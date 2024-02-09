import { modals } from '@mantine/modals'
import { useCreateCatalog } from '../query/catalog-queries'
import { CatalogBody } from '../types/catalog-type'
import { ErrorAlert } from '@/shared/ui/error-alert/error-alert'
import { CatalogForm } from './catalog-form'

export const CreateCatalog = () => {
  const createMutation = useCreateCatalog()

  const handleSubmit = async (body: CatalogBody) => {
    try {
      await createMutation.mutateAsync(body)
      modals.closeAll()
    } catch (error) {
      return Promise.reject(error)
    }
  }

  return (
    <>
      {createMutation.isError && !createMutation.error.errors && (
        <ErrorAlert message={createMutation.error.message} mb="md" />
      )}

      <CatalogForm
        submitFn={handleSubmit}
        loading={createMutation.isPending}
        submitTitle="Добавить"
      />
    </>
  )
}

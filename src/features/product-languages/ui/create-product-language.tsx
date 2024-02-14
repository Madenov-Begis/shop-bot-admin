import { modals } from '@mantine/modals'
import { useCreateProductLanguage } from '../queries/product-languages-queries'
import { ProductLanguagesBody } from '../types/product-languages'
import { ErrorAlert } from '@/shared/ui/error-alert/error-alert'
import { ProductLanguagesForm } from './product-languages-from'

export const CreateProductLanguage = () => {
  const createMutation = useCreateProductLanguage()

  const handleSubmit = async (body: ProductLanguagesBody) => {
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

      <ProductLanguagesForm
        submitFn={handleSubmit}
        loading={createMutation.isPending}
        submitTitle="Добавить"
      />
    </>
  )
}

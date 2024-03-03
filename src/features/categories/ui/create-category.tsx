import { modals } from '@mantine/modals'
import { useCreateCategory } from '../queries/categories-queries'
import { CategoryBody } from '../types/categories'
import { ErrorAlert } from '@/shared/ui/error-alert/error-alert'
import { CategoryForm } from './category-form'

export const Createcategory = () => {
  const createMutation = useCreateCategory()

  const handleSubmit = async (body: CategoryBody) => {
    try {
      await createMutation.mutateAsync(body)
      modals.closeAll()
    } catch (error) {
      return Promise.reject(error)
    }
  }

  return (
    <>
      {createMutation.isError && !createMutation.error.message && (
        <ErrorAlert message={createMutation.error.message} mb="md" />
      )}

      <CategoryForm
        submitFn={handleSubmit}
        loading={createMutation.isPending}
        submitTitle="Добавить"
      />
    </>
  )
}

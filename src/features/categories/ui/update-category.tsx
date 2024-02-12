import { modals } from '@mantine/modals'
import {
  useFetchCategory,
  useUpdateCategory,
} from '../queries/category-queries'
import { CategoryBody } from '../types/category'
import { ErrorAlert } from '@/shared/ui/error-alert/error-alert'
import { Center, Loader } from '@mantine/core'
import { CategoryForm } from './category-form'

interface UpdateCategoryProps {
  categoryId: number
}

export const UpdateCategory = ({ categoryId }: UpdateCategoryProps) => {
  const {
    data: category,
    isSuccess,
    isFetching,
    isError,
    error,
  } = useFetchCategory(categoryId)

  const updateMutation = useUpdateCategory()

  const handleSubmit = async (body: CategoryBody) => {
    try {
      await updateMutation.mutateAsync({ categoryId: categoryId, body })
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

          <CategoryForm
            initialValues={category.data}
            submitFn={handleSubmit}
            loading={updateMutation.isPending}
            submitTitle="Сохранить"
          />
        </>
      )}
    </>
  )
}

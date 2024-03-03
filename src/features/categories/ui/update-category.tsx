import { modals } from '@mantine/modals'
import {
  useFetchCategory,
  useUpdateCategory,
} from '../queries/categories-queries'
import { CategoryBody } from '../types/categories'
import { ErrorAlert } from '@/shared/ui/error-alert/error-alert'
import { Center, Loader } from '@mantine/core'
import { CategoryForm } from './category-form'

export const UpdateCategory = ({ id }: { id: number }) => {
  const {
    data: category,
    isSuccess,
    isFetching,
    isError,
    error,
  } = useFetchCategory(id)

  const updateMutation = useUpdateCategory()

  const handleSubmit = async (data: CategoryBody) => {
    delete data.name.id

    try {
      await updateMutation.mutateAsync({ id, body: data })
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
          {updateMutation.isError && !updateMutation.error.message && (
            <ErrorAlert message={updateMutation.error.message} mb="md" />
          )}

          <CategoryForm
            initialValues={{ name: category }}
            submitFn={handleSubmit}
            loading={updateMutation.isPending}
            submitTitle="Сохранить"
          />
        </>
      )}
    </>
  )
}

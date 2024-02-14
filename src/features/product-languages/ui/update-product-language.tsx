import { modals } from '@mantine/modals'
import {
  useFetchProductLanguage,
  useUpdateProductLanguages,
} from '../queries/product-languages-queries'
import { ProductLanguagesBody } from '../types/product-languages'
import { ErrorAlert } from '@/shared/ui/error-alert/error-alert'
import { Center, Loader } from '@mantine/core'
import { ProductLanguagesForm } from './product-languages-from'

export const UpdateProductLanguage = ({
  productLanguageId,
}: {
  productLanguageId: number
}) => {
  const {
    data: productLanguage,
    isFetching,
    error,
    isError,
    isSuccess,
  } = useFetchProductLanguage(productLanguageId)

  const updateMutation = useUpdateProductLanguages()

  const handleSubmit = async (body: ProductLanguagesBody) => {
    try {
      await updateMutation.mutateAsync({ productLanguageId, body })
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

          <ProductLanguagesForm
            initialValues={productLanguage.data}
            submitFn={handleSubmit}
            loading={updateMutation.isPending}
            submitTitle="Сохранить"
          />
        </>
      )}
    </>
  )
}

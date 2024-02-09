import { ErrorAlert } from '@/shared/ui/error-alert/error-alert'
import { useFetchCatalog, useUpdateCatalog } from '../query/catalog-queries'
import { CatalogBody } from '../types/catalog-type'
import { Center, Loader } from '@mantine/core'
import { CatalogForm } from './catalog-form'
import { modals } from '@mantine/modals'

interface UpdateCatalogProps {
  catalogId: number
}

export const UpdateCatalog = ({ catalogId }: UpdateCatalogProps) => {
  const {
    data: catalog,
    isSuccess,
    isFetching,
    isError,
    error,
  } = useFetchCatalog(catalogId)

  const updateMutation = useUpdateCatalog()

  const handleSubmit = async (body: CatalogBody) => {
    try {
      await updateMutation.mutateAsync({ cashbackId: catalogId, body })
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

          <CatalogForm
            initialValues={catalog.data}
            submitFn={handleSubmit}
            loading={updateMutation.isPending}
            submitTitle="Сохранить"
          />
        </>
      )}
    </>
  )
}

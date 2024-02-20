import { ErrorAlert } from '@/shared/ui/error-alert/error-alert'
import { useFetchProduct, useUpdateProduct } from '../queries/product-queries'
import { Center, Loader } from '@mantine/core'
import { ProductForm } from './product-form'
import { useParams } from 'react-router-dom'
import dayjs from 'dayjs'
import { ProductBody } from '../types/products'
import { FormEvent } from 'react'

export const UpdateProduct = () => {
  const { id } = useParams()

  const {
    data: product,
    isSuccess,
    isFetching,
    isError,
    error,
  } = useFetchProduct(id)

  const updateMutation = useUpdateProduct()

  const handleSubmit = async ({
    event,
    data,
  }: {
    event?: FormEvent<HTMLFormElement>
    data: ProductBody
  }) => {
    const formData = new FormData(event?.currentTarget)

    formData.set('published_at', dayjs(data.published_at).format('YYYY-MM-DD'))

    data.images?.forEach((image) => {
      if (typeof image !== 'string') formData.append('images[]', image)
    })

    formData.append('_method', 'patch')

    try {
      await updateMutation.mutateAsync({ productId: id, body: formData })
    } catch (error) {
      return Promise.reject(error)
    }
  }

  const parsedValues = {
    ...product?.data,
    category_id: product?.data.category_id
      ? product?.data.category_id.toString()
      : null,
    catalog_id: product?.data.catalog_id
      ? product?.data.catalog_id.toString()
      : null,
    company_id: product?.data.company_id
      ? product?.data.company_id.toString()
      : null,
    publisher_id: product?.data.publisher_id
      ? product?.data.publisher_id.toString()
      : null,
    audience_id: product?.data.audience_id
      ? product?.data.audience_id.toString()
      : null,
    language_id: product?.data.language_id
      ? product?.data.language_id.toString()
      : null,
    deliver_id: product?.data.deliver_id
      ? product?.data.deliver_id.toString()
      : null,
    cashback_id: product?.data.cashback_id
      ? product?.data.cashback_id.toString()
      : null,
    published_at: product?.data.published_at
      ? dayjs(product?.data.published_at).toDate()
      : null,
    index: product?.data.index ? product?.data.index.toString() : null,
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

          <ProductForm
            initialValues={parsedValues}
            submitFn={handleSubmit}
            loading={updateMutation.isPending}
            submitTitle="Сохранить"
          />
        </>
      )}
    </>
  )
}

import { ErrorAlert } from '@/shared/ui/error-alert/error-alert'
import {
  useDeleteProductPhoto,
  useFetchProduct,
  useUpdateProduct,
} from '../queries/product-queries'
import { Center, Loader } from '@mantine/core'
import { ProductForm } from './product-form'
import { useParams } from 'react-router-dom'
import dayjs from 'dayjs'
import { ProductBody } from '../types/products'
import { FormEvent } from 'react'
import { UseFormReturnType } from '@mantine/form'

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

  const deletePhoto = useDeleteProductPhoto()

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

  const handleDelete = async ({
    image,
    form,
    index,
  }: {
    image?: string | File
    form: UseFormReturnType<ProductBody, (values: ProductBody) => ProductBody>
    index: number
  }) => {
    if (image instanceof File) form.removeListItem('images', index)

    if (typeof image == 'string') {
      const url = new URL(image)

      const slicedUrl = url.pathname.slice(9)

      await deletePhoto
        .mutateAsync({ productId: id, path: slicedUrl })
        .then(() => form.removeListItem('images', index))
    }
  }

  console.log(product)

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
            handleDelete={handleDelete}
            initialValues={{
              audience_id: product.data.audience_id.toString(),
              cashback_id: product.data.cashback_id.toString(),
              catalog_id: product.data.catalog_id.toString(),
              category_id: product.data.category_id.toString(),
              company_id: product.data.company_id.toString(),
              publisher_id: product.data.publisher_id.toString(),
              deliver_id: product.data.deliver_id.toString(),
              language_id: product.data.language_id.toString(),
              published_at: dayjs(product.data.published_at),
              description: product.data.description,
              exist_periods: product.data.exist_periods,
              images: product.data.images,
              index: +product.data.index,
              name: product.data.name,
              pages: product.data.pages,
              periods: product.data.periods,
              price: product.data.price,
            }}
            submitFn={handleSubmit}
            loading={updateMutation.isPending}
            submitTitle="Сохранить"
          />
        </>
      )}
    </>
  )
}

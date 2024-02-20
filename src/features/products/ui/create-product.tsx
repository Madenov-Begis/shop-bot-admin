import { ErrorAlert } from '@/shared/ui/error-alert/error-alert'
import { useCreateProduct } from '../queries/product-queries'
import { ProductForm } from './product-form'
import { ProductBody } from '../types/products'
import dayjs from 'dayjs'
import { FormEvent } from 'react'

export const CreateProductList = () => {
  const createMutation = useCreateProduct()

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
      formData.append('images[]', image)
    })

    try {
      await createMutation.mutateAsync(formData)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  return (
    <>
      {createMutation.isError && !createMutation.error.errors && (
        <ErrorAlert message={createMutation.error.message} mb="md" />
      )}

      <ProductForm
        submitFn={handleSubmit}
        loading={createMutation.isPending}
        submitTitle="Добавить продукт"
      />
    </>
  )
}

import { useCreateProduct } from '../queries/products-queries'
import { ErrorAlert } from '@/shared/ui/error-alert/error-alert'
import { ProductForm } from './product-from'
import { ProductBody } from '../types/products'
import { FormEvent } from 'react'
import { UseFormReturnType } from '@mantine/form'
import { useNavigate } from 'react-router-dom'

export const CreateProductList = () => {
  const navigate = useNavigate()

  const createMutation = useCreateProduct()

  const handleSubmit = async ({
    event,
    data,
  }: {
    event?: FormEvent<HTMLFormElement>
    data: ProductBody
  }) => {
    const formData = new FormData(event?.currentTarget)

    formData.set('image', data.image ? data.image[0] : '')

    formData.set('status', data.status ? '1' : '0')

    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-expect-error
      await createMutation.mutateAsync(formData)
      navigate('/products')
    } catch (error) {
      return Promise.reject(error)
    }
  }

  const handleDelete = ({
    form,
    index,
  }: {
    form: UseFormReturnType<ProductBody, (values: ProductBody) => ProductBody>
    index: number
  }) => {
    form.removeListItem('image', index)
  }

  return (
    <>
      {createMutation.isError && !createMutation.error.message && (
        <ErrorAlert message={createMutation.error.message} mb="md" />
      )}

      <ProductForm
        submitFn={handleSubmit}
        loading={createMutation.isPending}
        submitTitle="Добавить"
        handleDelete={handleDelete}
      />
    </>
  )
}

import { ErrorAlert } from '@/shared/ui/error-alert/error-alert'
import { Center, Loader } from '@mantine/core'
import { useFetchProduct, useUpdateProduct } from '../queries/products-queries'
import { ProductBody } from '../types/products'
import { ProductForm } from './product-from'
import { FormEvent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { UseFormReturnType } from '@mantine/form'

export const UpdateProduct = () => {
  const navigate = useNavigate()
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
    data,
    event,
  }: {
    data: ProductBody
    event?: FormEvent<HTMLFormElement>
  }) => {
    const formData = new FormData(event?.currentTarget)

    if (typeof data.image[0] !== 'string') formData.set('image', data.image[0])

    formData.set('is_active', data.is_active ? '1' : '0')

    try {
      await updateMutation.mutateAsync({ id, body: formData })
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

          <ProductForm
            initialValues={{
              description: product.data.description,
              category_id: String(product.data.category.id.toString()),
              image: [product.data.image],
              price: +product.data.price,
              title: product.data.name,
              is_active: product.data.is_active,
            }}
            submitFn={handleSubmit}
            loading={updateMutation.isPending}
            submitTitle="Сохранить"
            handleDelete={handleDelete}
          />
        </>
      )}
    </>
  )
}

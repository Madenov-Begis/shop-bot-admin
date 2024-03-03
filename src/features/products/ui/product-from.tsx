import { FormEvent } from 'react'

import {
  Stack,
  TextInput,
  Text,
  Group,
  Button,
  NumberInput,
  Grid,
  Image,
  ActionIcon,
  Flex,
} from '@mantine/core'
import { UseFormReturnType, isNotEmpty, useForm } from '@mantine/form'
import { Dropzone, MIME_TYPES } from '@mantine/dropzone'

import { HTTPError } from '@/shared/types/http'

import { Language } from '@/features/languages/types/language'
import { initLanguages } from '@/features/languages/lib/init-languages'
import { withLangs } from '@/features/languages/hoc/with-languages'

import { IconPhoto, IconUpload, IconX } from '@tabler/icons-react'
import { ProductBody } from '../types/products'
import { CategoriesSelect } from '@/features/categories/ui/category-select'
import { notifications } from '@mantine/notifications'

const initialData = (languages: Language[]) => {
  return {
    title: initLanguages(languages, ''),
    description: initLanguages(languages, ''),
    category_id: undefined,
    image: [],
    price: undefined,
  }
}

interface ProductFormProps {
  initialValues?: ProductBody
  submitFn: ({
    event,
    data,
  }: {
    event?: FormEvent<HTMLFormElement>
    data: ProductBody
  }) => Promise<undefined>
  loading: boolean
  submitTitle: string
  handleDelete: ({
    image,
    form,
    index,
  }: {
    image?: string | File
    form: UseFormReturnType<ProductBody, (values: ProductBody) => ProductBody>
    index: number
  }) => void
}

export const ProductForm = withLangs<ProductFormProps>(
  ({
    languages,
    initialValues = initialData(languages),
    submitFn,
    loading,
    submitTitle,
    handleDelete,
  }) => {
    const form = useForm<ProductBody>({
      initialValues,
      validate: {
        price: isNotEmpty('Обязательное поле'),
        category_id: isNotEmpty('Обязательное поле'),
        description: initLanguages(languages, isNotEmpty('Обязательное поле')),
        title: initLanguages(languages, isNotEmpty('Обязательное поле')),
        image: isNotEmpty('Обязательное поле'),
      },
    })

    const handleSubmit = async (
      data: typeof form.values,
      event?: FormEvent<HTMLFormElement>
    ) => {
      try {
        await submitFn({ event, data })
        form.reset()
      } catch (error) {
        const err = error as HTTPError
        notifications.show({
          title: 'Ошибка',
          message: err.message,
          color: 'red',
        })
      }
    }

    const previews = form.values.image?.map((image, index) => {
      let imageUrl: string | undefined

      if (typeof image === 'string') {
        imageUrl = image
      }

      if (image instanceof File) {
        imageUrl = URL.createObjectURL(image)
      }

      return (
        <Grid.Col span={{ base: 4 }} key={index}>
          <div style={{ position: 'relative' }}>
            <Image
              w={'100%'}
              h={230}
              key={index}
              src={imageUrl}
              onLoad={() => URL.revokeObjectURL(imageUrl ? imageUrl : '')}
            />
            <div
              style={{
                position: 'absolute',
                top: '0',
                right: '0',
                transform: 'translate(-10px,10px)',
              }}
            >
              <ActionIcon
                variant="filled"
                color="red"
                onClick={() => handleDelete({ image, form, index })}
              >
                <IconX />
              </ActionIcon>
            </div>
          </div>
        </Grid.Col>
      )
    })

    return (
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack maw={1000} mx={'auto'}>
          {form.errors.images && (
            <Text c="red" mt={4}>
              {form.errors.images}
            </Text>
          )}

          <Grid gutter={{ base: 'md' }}>
            <Grid.Col span={6}>
              <Dropzone
                multiple={false}
                accept={[MIME_TYPES.png, MIME_TYPES.jpeg]}
                onDrop={(files) => {
                  form.setFieldValue('image', files)
                }}
                // onReject={(image) => {
                //   if (image.file.size > 5 * 1024 ** 2) {
                //     form.setFieldError('image', 'Размер файла превышает 5 МБ байта')
                //   } else if (
                //     image.file.type !== 'image/jpeg' &&
                //     image.file.type !== 'image/png'
                //   ) {
                //     form.setFieldError(
                //       'image',
                //       'Доступные форматы изображения PNG, JPEG'
                //     )
                //   }
                // }}
                maxSize={5 * 1024 ** 2}
                style={{
                  backgroundColor: '#ededed50',
                }}
              >
                <Flex
                  direction={'column'}
                  justify="center"
                  gap="md"
                  align="center"
                  h={200}
                  style={{ pointerEvents: 'none' }}
                >
                  <Dropzone.Accept>
                    <IconUpload
                      style={{
                        width: '50px',
                        height: '50px',
                        color: 'var(--mantine-color-blue-6)',
                      }}
                      stroke={1.5}
                    />
                  </Dropzone.Accept>
                  <Dropzone.Reject>
                    <IconX
                      style={{
                        width: '50px',
                        height: '50px',
                        color: 'var(--mantine-color-red-6)',
                      }}
                      stroke={1.5}
                    />
                  </Dropzone.Reject>
                  <Dropzone.Idle>
                    <IconPhoto
                      style={{
                        width: '50px',
                        height: '50px',
                        color: 'var(--mantine-color-dimmed)',
                      }}
                      stroke={1.5}
                    />
                  </Dropzone.Idle>

                  <div>
                    <Text size="xl" inline ta={'center'}>
                      Перетащите изображения сюда или нажмите, чтобы выбрать
                      файлы
                    </Text>
                    <Text size="sm" c="dimmed" inline mt={20} ta={'center'}>
                      Прикрепляйте столько файлов, сколько хотите, каждый файл
                      не должен превышать 5 МБ.
                    </Text>
                  </div>
                </Flex>
              </Dropzone>
            </Grid.Col>
            {previews}
          </Grid>

          {languages.length > 0 ? (
            <>
              {languages.map((language) => {
                return (
                  <TextInput
                    name={`title_${language.locale}`}
                    key={language.id}
                    label={`Название ${language.locale}`}
                    placeholder={'Название'}
                    withAsterisk
                    {...form.getInputProps(`title.${language.locale}`)}
                  />
                )
              })}
              {languages.map((language) => {
                return (
                  <TextInput
                    name={`description_${language.locale}`}
                    key={language.id}
                    label={`Описание ${language.locale}`}
                    placeholder={'Описание'}
                    withAsterisk
                    {...form.getInputProps(`description.${language.locale}`)}
                  />
                )
              })}

              <Grid>
                <Grid.Col span={{ base: 12, md: 6 }}>
                  <NumberInput
                    name="price"
                    label={'Цена'}
                    placeholder={'Цена'}
                    withAsterisk
                    allowNegative={false}
                    hideControls
                    {...form.getInputProps('price')}
                  />
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 6 }}>
                  <CategoriesSelect
                    name="category_id"
                    label={'Категория'}
                    placeholder={'Категория'}
                    withAsterisk
                    {...form.getInputProps('category_id')}
                  />
                </Grid.Col>
              </Grid>

              {form.errors.exist_periods && (
                <Text c="red" mt={4} size="sm">
                  {form.errors.exist_periods}
                </Text>
              )}
            </>
          ) : (
            <div>
              <Text>Вы не добавили язык</Text>
            </div>
          )}
        </Stack>

        <Group justify="center" mt="lg">
          <Button
            type="submit"
            size="md"
            loading={loading}
            disabled={!form.isDirty()}
          >
            {submitTitle}
          </Button>
        </Group>
      </form>
    )
  }
)

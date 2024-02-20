import { FormEvent } from 'react'
import { ProductBody } from '../types/products'

import {
  Stack,
  TextInput,
  Text,
  Group,
  Button,
  Textarea,
  NumberInput,
  Grid,
  Checkbox,
  Image,
  ActionIcon,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { DateInput } from '@mantine/dates'
import { Dropzone, MIME_TYPES } from '@mantine/dropzone'

import { HTTPError } from '@/shared/types/http'
import { AudienceSelect } from '@/features/audiences/ui/audience-select'
import { CashbacksSelect } from '@/features/cashbacks/ui/cashbacks-select'
import { CatalogsSelect } from '@/features/catalogs/ui/catalog-select'
import { CompaniesSelect } from '@/features/companies/ui/companies-select'
import { CategoriesSelect } from '@/features/categories/ui/categories-select'
import { DeliversSelect } from '@/features/delivers/ui/delivers-select'
import { ProductLanguagesList } from '@/features/product-languages/ui/product-languages-select'
import { PublisherSelect } from '@/features/publishers/ui/publishers-select'
import { Language } from '@/features/languages/types/language'
import { initLanguages } from '@/features/languages/lib/init-languages'
import { withLangs } from '@/features/languages/hoc/with-languages'

import { IconX } from '@tabler/icons-react'

const monthes = [
  { value: 'january', label: 'Январь' },
  { value: 'februar', label: 'Февраль' },
  { value: 'march', label: 'Март' },
  { value: 'april', label: 'Апрель' },
  { value: 'may', label: 'Май' },
  { value: 'june', label: 'Июнь' },
  { value: 'july', label: 'Июль' },
  { value: 'august', label: 'Август' },
  { value: 'september', label: 'Сентябрь' },
  { value: 'octobe', label: 'Октябрь' },
  { value: 'november', label: 'Ноябрь' },
  { value: 'december', label: 'Декабрь' },
]

const initialData = (languages: Language[]) => {
  return {
    name: initLanguages(languages, ''),
    description: '',
    index: '',
    periods: undefined,
    pages: undefined,
    price: undefined,
    published_at: null,
    images: [],
    category_id: '',
    company_id: '',
    catalog_id: '',
    publisher_id: '',
    audience_id: '',
    language_id: '',
    deliver_id: '',
    cashback_id: '',
    exist_periods: {
      may: false,
      july: false,
      june: false,
      april: false,
      march: false,
      august: false,
      january: false,
      october: false,
      december: false,
      february: false,
      november: false,
      september: false,
    },
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
}

export const ProductForm = withLangs<ProductFormProps>(
  ({
    languages,
    initialValues = initialData(languages),
    submitFn,
    loading,
    submitTitle,
  }) => {
    const form = useForm<ProductBody>({
      initialValues,
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
        if (err.errors) {
          form.setErrors(err.errors)
        }
      }
    }

    const previews = form.values.images?.map((image, index) => {
      let imageUrl: string | undefined

      if (typeof image === 'string') {
        imageUrl = image
      }

      if (image instanceof File) {
        imageUrl = URL.createObjectURL(image)
      }

      return (
        <Grid.Col span={{ base: 2 }} key={index}>
          <div style={{ position: 'relative' }}>
            <Image
              w={'100%'}
              h={200}
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
                onClick={() => form.removeListItem('images', index)}
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
        <Stack>
          <Dropzone
            accept={[MIME_TYPES.png, MIME_TYPES.jpeg]}
            onDrop={(files) => {
              form.setFieldValue('images', [
                ...(form.values.images as []),
                ...files,
              ])
            }}
            multiple
          >
            <Text ta="center">Drop images here</Text>
          </Dropzone>
          <Grid gutter={{ base: 'md' }}>{previews}</Grid>

          {languages.length > 0 ? (
            <>
              {languages.map((language) => {
                return (
                  <TextInput
                    name={`name[${language.locale}]`}
                    key={language.id}
                    label={`Наименование ${language.locale}`}
                    placeholder={'Наименование'}
                    withAsterisk
                    {...form.getInputProps(`name.${language.locale}`)}
                  />
                )
              })}
              <Textarea
                name="description"
                label={`Описание`}
                placeholder={'Описание'}
                withAsterisk
                minRows={4}
                autosize
                {...form.getInputProps(`description`)}
              />
              <DateInput
                name="published_at"
                valueFormat="YYYY-MM-DD"
                label="Дата выхода"
                placeholder="Дата выхода"
                maxDate={new Date()}
                {...form.getInputProps(`published_at`)}
              />
              <Grid>
                <Grid.Col span={{ base: 12, md: 6 }}>
                  <NumberInput
                    name="pages"
                    label="Количество страниц"
                    placeholder="Количество страниц"
                    withAsterisk
                    allowNegative={false}
                    hideControls
                    {...form.getInputProps('pages')}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                  <NumberInput
                    name="periods"
                    label="Периоды"
                    placeholder="Периоды"
                    withAsterisk
                    allowNegative={false}
                    hideControls
                    {...form.getInputProps('periods')}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                  <NumberInput
                    name="index"
                    label="Индекс продукта"
                    placeholder="Индекс продукта"
                    withAsterisk
                    allowNegative={false}
                    hideControls
                    {...form.getInputProps('index')}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                  <NumberInput
                    name="price"
                    label="Цена продукта"
                    placeholder="Цена продукта"
                    withAsterisk
                    allowNegative={false}
                    hideControls
                    {...form.getInputProps('price')}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                  <CategoriesSelect
                    name="category_id"
                    label="Категория"
                    placeholder="Категория"
                    {...form.getInputProps('category_id')}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                  <CompaniesSelect
                    name="company_id"
                    label="Компания"
                    placeholder="Компания"
                    {...form.getInputProps('company_id')}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                  <CatalogsSelect
                    name="catalog_id"
                    label="Каталог"
                    placeholder="Каталог"
                    {...form.getInputProps('catalog_id')}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                  <PublisherSelect
                    name="publisher_id"
                    label="Издания"
                    placeholder="Издания"
                    {...form.getInputProps('publisher_id')}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                  <AudienceSelect
                    name="audience_id"
                    label="Аудитория"
                    placeholder="Аудитория"
                    {...form.getInputProps('audience_id')}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                  <ProductLanguagesList
                    name="language_id"
                    label="Язык продукта"
                    placeholder="Язык продукта"
                    {...form.getInputProps('language_id')}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                  <DeliversSelect
                    name="deliver_id"
                    label="Доставка"
                    placeholder="Доставка"
                    {...form.getInputProps('deliver_id')}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                  <CashbacksSelect
                    name="cashback_id"
                    label="Кешбэк"
                    placeholder="Кешбэк"
                    {...form.getInputProps('cashback_id')}
                  />
                </Grid.Col>
              </Grid>
              <Group justify="space-between" mt="md">
                {monthes.map((item) => {
                  return (
                    <Checkbox
                      key={item.value}
                      name={`exist_periods[${item.value}]`}
                      label={item.label}
                      {...form.getInputProps(`exist_periods.${item.value}`, {
                        type: 'checkbox',
                      })}
                    />
                  )
                })}
              </Group>
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

import { Alert, Center, Loader } from '@mantine/core'
import {
  useShowAudience,
  useUpdateAudience,
} from '../queries/audiences-queries'

import { AudineceForm } from './audinece-form'
import { AudienceBody } from '../types/audience'
import { modals } from '@mantine/modals'

export const AudienceUpdate = ({ id }: { id: number }) => {
  const {
    data: AudienceShow,
    error,
    isSuccess,
    isFetching,
  } = useShowAudience(id)

  const update = useUpdateAudience()

  const submitFunc = async (data: AudienceBody) => {
    try {
      await update.mutateAsync({ audienceId: id, body: data })

      modals.closeAll()
    } catch (error) {
      return Promise.reject(error)
    }
  }

  return (
    <>
      {error && (
        <Alert variant="light" color="red">
          {error.message}
        </Alert>
      )}

      {isFetching && (
        <Center>
          <Loader />
        </Center>
      )}

      {isSuccess && !isFetching && (
        <>
          {update.isError && !update.error.errors && (
            <Alert variant="light" color="red">
              {update.error.message}
            </Alert>
          )}
          <AudineceForm
            initialValues={{ age: AudienceShow.data.age }}
            submitFunc={submitFunc}
          />
        </>
      )}
    </>
  )
}

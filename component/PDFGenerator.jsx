import React, { useEffect } from 'react'
import { ApiClient, ActionProps,useCurrentAdmin } from 'adminjs'
import { Loader } from '@adminjs/design-system'

const GeneratePdf = (props) => {
  const [currentAdmin] = useCurrentAdmin();
  const { record, resource } = props
  const api = new ApiClient()

  useEffect(() => {
    api.recordAction({
      recordId: record.id,
      resourceId: resource.id,
      actionName: 'PdfGen'
    }).then((response) => {
      console.log(response.data.url)
      window.location.href = response.data.url
    }).catch((err) => {
      console.error(err)
    })
  }, [])

  return <Loader />
}

export default GeneratePdf
import React, { useEffect } from 'react'
import { ApiClient, ActionProps,useCurrentAdmin } from 'adminjs'
import { Loader } from '@adminjs/design-system'

const BulkGeneratePdf = (props) => {
    const [currentAdmin] = useCurrentAdmin();
    const { records, resource } = props
    const api = new ApiClient()

    const recordIds = records.map(record=>{
        return record.id
    })

    console.log(recordIds)
    
    useEffect(() => {
        
        console.log('here')
      api.bulkAction({
        recordIds: recordIds,
        resourceId: 'ClientsS1',
        actionName: 'bulkPdf'
      }).then((response) => {
        console.log(response.data.url)
        window.location.href = response.data.url
      }).catch((err) => {
        console.error(err)
        console.log('Error')
      })
    }, [])
  
    return <Loader />
}

export default BulkGeneratePdf
// import { RecordJSON } from 'adminjs'
import { jsPDF } from 'jspdf'
// import { useCurrentAdmin } from 'adminjs'

const pdfGenerator = (record,type = 'null') => {
  // const [currentAdmin] = useCurrentAdmin();
  const { params } = record
  console.log(params)
  const doc = new jsPDF()

  if(type === 'income'){

    // addImage( src="../public/users.png", png, 10, 10, 100, 100,)
    doc.text(params.name, 10, 10) // example database column called orderNum
    // doc.text(params.client_inc, 10, 10) // example database column called orderNum
    // doc.number(params.agent_agency_inc, 10, 10) // example database column called orderNum
    // doc.number(params.employer_inc, 10, 10) // example database column called orderNum
    // doc.number(params.medical_exp, 10, 10) // example database column called orderNum
    // doc.number(params.others, 10, 10) // example database column called orderNum
    //   doc.text(params.shippingAddress, 150, 10) // example database column called shippingAddress
  }
  else if(type === 'expense'){
    doc.text(params.name, 10, 10) // example database column called orderNum
    
  }
  else if(type === 'employers'){
    doc.text(params.name, 10, 10) // example database column called orderNum
    
  }
  else if(type === 'employees'){
    doc.text(params.name, 10, 10) // example database column called orderNum
    doc.text(params.address, 10, 20) // example database column called orderNum
    
  }
  else if(type === 'clientsS1'){
    doc.addImage("/logo.jpg", "JPEG",  15, 40, 180, 180)
    doc.text(params.Name, 100, 100) // example database column called orderNum
    
  }
  else if(type === 'agent'){
    doc.text(params.name, 10, 10) // example database column called orderNum
    
  }
  
  const filename = `/${params.Name}.pdf`
  doc.save(`./pdfs${filename}`)
  

  const fileurl = `./pdfs${filename}`

  return filename
}

export default pdfGenerator
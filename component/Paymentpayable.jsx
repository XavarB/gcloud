import React from 'react'
import {props} from 'adminjs'

export default function Paymentpayable(props) {
    const {record,property} = props
const {params} = record
    const sum = parseInt(params.Total_payment) - parseInt(params.Payment_paid) 

   
    

    console.log(params)
  return (
    <section className="box__Box-sc-17sbq3p-0 buPzZx adminjs_Box">
        <label className="label__Label-sc-o90s7d-0 jqkxb adminjs_Label">Paymentpayable</label>
        {sum}
        </section>
  )
}

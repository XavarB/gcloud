import React from 'react'
import {props} from 'adminjs'

export default function ExpenseTotal(props) {
    const {record,property} = props
const {params} = record
    const sum = parseInt(params.Medical_expenses) + parseInt(params.Pakistan_Office_exp) + parseInt(params.Pakistan_Sal) + parseInt(params.Pakistan_Gov_fee) + parseInt(params.Pakistan_Comission) + parseInt(params.Others_Pakistan_exp) + parseInt(params.Malaysia_Office_exp) + parseInt(params.Malaysia_sal) + parseInt(params.Malaysia_Gov_fee) + parseInt(params.Malaysia_Comission )+ parseInt(params.Others_Malaysia_exp)

    console.log('Working');

    console.log(params)
  return (
    <section className="box__Box-sc-17sbq3p-0 buPzZx adminjs_Box">
        <label className="label__Label-sc-o90s7d-0 jqkxb adminjs_Label">Expense Total</label>
        {sum}
        </section>
  )
}

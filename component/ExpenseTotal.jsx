import React from 'react'
import {props} from 'adminjs'

export default function ExpenseTotal(props) {
    const {record,property} = props
const {params} = record
    const sum = params.Medical_expenses + params.Pakistan_Office_exp + params.Pakistan_Sal + params.Pakistan_Gov_fee + params.Pakistan_Comission + params.Others_Pakistan_exp + params.Malaysia_Office_exp + params.Malaysia_sal + params.Malaysia_Gov_fee + params.Malaysia_Comission + params.Others_Malaysia_exp

    console.log('Working');

    console.log(params)
  return (
    <section className="box__Box-sc-17sbq3p-0 buPzZx adminjs_Box">
        <label className="label__Label-sc-o90s7d-0 jqkxb adminjs_Label">Expense Total</label>
        {sum}
        </section>
  )
}

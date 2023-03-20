import AdminJS from 'adminjs'
const { ComponentLoader } = AdminJS
import fileDirName from '../file-dir-name.js'
import path from 'path'
export const componentLoader = new ComponentLoader()
export const {__dirname,__filename} = fileDirName(import.meta)

export const Components = {
    Dashboard: componentLoader.add('Dashboard', path.join(__dirname,'../dashboard')),
    ExpenseTotal: componentLoader.add('ExpenseTotal', path.join(__dirname,'../component/ExpenseTotal')),
    IncomeTotal: componentLoader.add('IncomeTotal', path.join(__dirname,'../component/IncomeTotal')),
    ClientIncomeTotal: componentLoader.add('ClientIncomeTotal', path.join(__dirname,'../component/ClientIncomeTotal')),
    ClientExpenseTotal: componentLoader.add('ClientExpenseTotal', path.join(__dirname,'../component/ClientTotalExpense')),
    // PdfGen: componentLoader.add('Pdf', path.join(__dirname,'component/Pdf'))
    PdfGen: componentLoader.add('Pdf', path.join(__dirname,'../component/PDFGenerator'))
    // other custom components
  }
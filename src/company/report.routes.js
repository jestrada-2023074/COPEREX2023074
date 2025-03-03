import { Router } from 'express'
import { 
    generateExcelReport 
} from './report.controller.js'

const api = Router()
api.get('/download', generateExcelReport)
export default api
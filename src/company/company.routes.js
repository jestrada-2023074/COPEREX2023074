import { Router } from 'express'
import {
    getAllCompanies,
    saveCompany,
    getCompanyById,
    updateCompany,
    getCompaniesByYearsOfExperience,
    getCompaniesByCategory,
    getCompaniesSortedAscending,
    getCompaniesSortedDescending
} from './company.controller.js'
import { validateJwt } from '../../middlewares/validate.jwt.js'

const api = Router()

api.get('/', getAllCompanies)
api.get('/years', getCompaniesByYearsOfExperience)
api.get('/category', getCompaniesByCategory)
api.get('/sort/asc', getCompaniesSortedAscending)
api.get('/sort/desc', getCompaniesSortedDescending)
api.post('/', saveCompany)
api.get('/:id', getCompanyById)
api.put('/:id', [validateJwt], updateCompany)

export default api
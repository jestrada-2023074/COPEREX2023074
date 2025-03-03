import Company from './company.model.js'
// Add Company
export const saveCompany = async (req, res) => {
    try {
        const data = req.body
        console.log(data)
        let company = new Company(data)

        await company.save()
        
        return res.send({
            success: true,
            message: 'Company saved successfully',
            company
        })
    } catch (err) {
        console.error('General error', err)
        return res.status(500).send({
            success: false,
            message: 'General error',
            err
        })
    }
}

// Get all companies
export const getAllCompanies = async (req, res) => {
    try {
        const { limit = 20, skip = 0 } = req.query
        const companies = await Company.find()
            .skip(skip)
            .limit(limit)

        if (companies.length === 0) {
            return res.status(404).send({
                success: false,
                message: 'Companies not found'
            })
        }
        return res.send({
            success: true,
            message: 'Companies found:',
            companies
        })
    } catch (err) {
        console.error(err)
        return res.status(500).send({
            message: 'General error',
            err
        })
    }
}

// Search company by ID
export const getCompanyById = async (req, res) => {
    try {
        let { id } = req.params
        let company = await Company.findById(id)

        if (!company) return res.status(404).send({
            success: false,
            message: 'Company not found'
        })

        return res.send({
            success: true,
            message: 'Company found:',
            company
        })
    } catch (err) {
        console.error('General error', err)
        return res.status(500).send({
            success: false,
            message: 'General error',
            err
        })
    }
}

// Update company
export const updateCompany = async (req, res) => {
    try {
        const { id } = req.params
        const updateData = req.body

        const updatedCompany = await Company.findByIdAndUpdate(
            id,
            updateData,
            { new: true } 
        )

        if (!updatedCompany) {
            return res.status(404).send({
                success: false,
                message: 'Company not found'
            })
        }

        return res.send({
            success: true,
            message: 'Company updated successfully',
            company: updatedCompany
        })
    } catch (err) {
        console.error('General error:', err);
        return res.status(500).send({
            success: false,
            message: 'General error',
            err
        })
    }
}
export const getCompaniesByYearsOfExperience = async (req, res) => {
    try {
        const { years } = req.query

        if (!years) {
            return res.status(400).send({
                success: false,
                message: 'Years of experience is required.'
            })
        }

        const companies = await Company.find({
            yearsOfExperience: { $gte: parseInt(years) }
        })

        if (companies.length === 0) {
            return res.status(404).send({
                success: false,
                message: 'No companies found with the given years of experience.'
            })
        }

        return res.send({
            success: true,
            message: 'Companies found:',
            companies
        })
    } catch (err) {
        console.error('General error:', err);
        return res.status(500).send({
            success: false,
            message: 'General error',
            err
        })
    }
}
export const getCompaniesByCategory = async (req, res) => {
    try {
        const { category } = req.query

        if (!category) {
            return res.status(400).json({
                success: false,
                message: 'Category is required.'
            })
        }

        const companies = await Company.find({ category })

        if (companies.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No companies found in the given category.'
            })
        }

        return res.status(200).json({
            success: true,
            message: 'Companies found:',
            companies
        })
    } catch (err) {
        console.error('General error:', err)
        return res.status(500).json({
            success: false,
            message: 'General error',
            error: err.message
        })
    }
}
export const getCompaniesSortedAscending = async (req, res) => {
    try {
        const companies = await Company.find().sort({ name: 1 })

        if (companies.length === 0) {
            return res.status(404).send({
                success: false,
                message: 'No companies found.'
            })
        }

        return res.send({
            success: true,
            message: 'Companies found (A-Z):',
            companies
        })
    } catch (err) {
        console.error('General error:', err)
        return res.status(500).send({
            success: false,
            message: 'General error',
            err
        })
    }
}
export const getCompaniesSortedDescending = async (req, res) => {
    try {
        const companies = await Company.find().sort({ name: -1 })

        if (companies.length === 0) {
            return res.status(404).send({
                success: false,
                message: 'No companies found.'
            })
        }

        return res.send({
            success: true,
            message: 'Companies found (Z-A):',
            companies
        })
    } catch (err) {
        console.error('General error:', err);
        return res.status(500).send({
            success: false,
            message: 'General error',
            err
        })
    }
}
import XLSX from 'xlsx'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs/promises'
import Company from './company.model.js'

export const generateExcelReport = async (req, res) => {
    try {
        const companies = await Company.find()

        if (!companies.length) {
            return res.status(404).json({ 
                success: false, 
                message: "There are no companies available." 
            })
        }

        const wb = XLSX.utils.book_new()

        const companyData = companies.map(company => {
            const data = company.toObject()
            return {
                ...data,
                Status: company.status ? "Asset" : "Idle" 
            }
        })

        const ws = XLSX.utils.json_to_sheet(companyData)
        XLSX.utils.book_append_sheet(wb, ws, "Company")

        const folderPath = path.join(path.dirname(fileURLToPath(import.meta.url)), "../../ReportsExcel")

        await fs.mkdir(folderPath, { recursive: true })

        const filePath = path.join(folderPath, "company.xlsx")

        const buffer = XLSX.write(wb, { bookType: "xlsx", type: "buffer" })
        await fs.writeFile(filePath, buffer)

        res.status(200).json({ 
            success: true, 
            message: "Excel file generated successfully.", 
            downloadLink: `/download/company.xlsx` 
        })

    } catch (error) {
        console.error("Error generating Excel file:", error)
        res.status(500).json({ 
            success: false, 
            message: "Error generating Excel file:", 
            error: error.message 
        })
    }
}
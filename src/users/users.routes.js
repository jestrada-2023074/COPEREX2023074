import { Router } from 'express'
import { 
    getAll,
    getUserid,
    deleteUser,
    update,
    updatePassword,
    login,
    register 
} from './users.controller.js'
import { validateJwt } from '../../middlewares/validate.jwt.js'
import { updateUserValidator } from '../../middlewares/validators.js'
import { registerValidator } from "../../middlewares/validators.js"
import { uploadProfilePicture } from "../../middlewares/multer.uploads.js"
import { deleteFileOnError } from "../../middlewares/delete.file.on.errors.js"
const api = Router()

api.get('/', getAll)
api.get('/:id', getUserid)
api.delete('/:id',[validateJwt], deleteUser)
api.put('/password/:id',[validateJwt],  updatePassword)
api.put('/:id', [validateJwt, updateUserValidator], update)
api.post('/login', login)
api.post('/register', 
    [
        uploadProfilePicture.single("profilePicture"), 
        registerValidator, 
        deleteFileOnError
    ],
    register

)


export default api
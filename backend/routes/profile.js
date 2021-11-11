const path = require('path')
const router = require('express').Router()
const {verifyTokenAndAuthZ, verifyToken} = require('../middleware/verifyToken')
const {getAllProfiles,getProfile,
        createProfile,updateProfile,deleteProfile} = require('../controllers/profile')
const multer = require('multer')

const imageStore = multer.diskStorage({
        destination: 'frontend/public/assets/Profiles/',
        filename: (req,file,cb) => {
                cb(null, file.fieldname + '_' + Date.now()
                + path.extname(file.originalname))
        }
})

const imageUpload = multer({
        storage: imageStore,
        limits: {
                fileSize: 1000000
        },
        fileFilter(req, file, cb) {
                if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
                        return cb(new Error('Only image files are allowed!'));
                }
           cb(undefined, true);
        }
})

//create Profile
router.post('/create',imageUpload.single('image'), createProfile)

//update Profile
router.put('/:username',[verifyTokenAndAuthZ, imageUpload.single('image')], updateProfile)

//delete Profile
router.delete('/:username',verifyTokenAndAuthZ,deleteProfile)

//get profile
router.get('/:username',verifyToken,getProfile)

//get all Profiles
router.get('/',verifyToken, getAllProfiles)

module.exports = router





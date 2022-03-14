const express = require('express');
const router = express.Router();
const multer = require('multer');
const productController = require('../controller/products')
const checkAuth=require('../middleware/check-auth');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'img/png') {
        cb(null, true)
    }
    else {
        cb(new Error('Only images are allowed'), false)
    }
}
const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});


router.get('/', productController.getAll);
router.post('/', checkAuth, upload.single('productImage'), productController.postProduct)
router.get('/:productId', productController.getOneProduct)
router.patch('/:productId', checkAuth, productController.updateProduct);
router.delete('/:productId', checkAuth, productController.deleteProduct);

module.exports = router;
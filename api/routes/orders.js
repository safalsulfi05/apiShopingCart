const express = require('express');
const router = express.Router();
const checkAuth=require('../middleware/check-auth');
const orderController=require('../controller/orders');

router.get('/',checkAuth,orderController.getOrder);
router.post('/',checkAuth,orderController.postOrder);
router.get('/:orderId',checkAuth,orderController.getOne);
router.delete('/:orderId',checkAuth , orderController.deleteOrder);

module.exports = router;
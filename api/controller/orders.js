const mongoose = require('mongoose');
const Product = require('../models/product');
const Order = require('../models/order');


exports.getOrder = (req, res, next) => {
    Order.find()
        .select('product quantity _id')
        //.populate('product', 'name')
        .exec()
        .then(docs => {
            console.log(docs)
            res.status(200).json({
                count: docs.length,
                orders: docs.map(doc => {
                    return {
                        _id: doc._id,
                        product: doc.product,
                        quantity: doc.quantity,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/orders/' + doc._id
                        }
                    }
                })
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}

exports.postOrder = ((req, res, next) => {
    Product.findById(req.body.productId)
        .then(product => {
            if (!product) {
                res.status(404).json({
                    message: 'product not found'
                });
            }
            else {
                const order = new Order({
                    _id: mongoose.Types.ObjectId(),
                    quantity: req.body.quantity,
                    product: req.body.productId
                })
                res.status(201).json({
                    message: 'order stored',
                    createdOrder: order,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/orders/' + order._id
                    }
                });
                order.save().then(result=>{
                    console.log(result);

                })
                .catch(err=>{
                    console.log(err);
                })
            }
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
})

exports.getOne = ((req, res, next) => {
    Order.findById(req.params.orderId)
        .populate('product')
        .exec()
        .then(order => {
            if (!order) {
                res.status(404).json({
                    message: "order not found"
                })
            }
            else {
                res.status(200).json({
                    order: order,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/orders'
                    }
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
})

exports.deleteOrder = ((req, res, next) => {
    order.deleteOne({ _id: req.params.orderId })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'order deleted',
                request: {
                    type: 'POST',
                    url: 'http://localhost:3000/orders',
                    body: {
                        productId: 'ID',
                        Quantity: 'number'
                    }
                }
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
})
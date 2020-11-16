import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'

// @desc    Create New Order
// @route   POST /api/orders
// @access  Privet
const addOrderItems = asyncHandler(async(req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    } = req.body

    if(orderItems && orderItems.length === 0) {
        res.status(400)
        throw new Error('No order items')
    } else {
        const order = new Order({
            orderItems,
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        })

        const createOrder = await order.save()

        res.status(201).json(createOrder)
    }
})


// @desc    Get Order by Id
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async(req, res) => {
    const order = await Order.findById(req.params.id).populate(
        'user',
        'name email'
    )

    if(order) {
        res.json(order)
    } else {
        res.status(404)
        throw new Error('Order Not Found')
    }
})


// @desc    Update Order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async(req, res) => {
    const order = await Order.findById(req.params.id)

    if(order) {
        order.isPaid = true,
        order.paidAt = Date.now(),
        order.paymentResult = {
            id: req.body._id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address
        }

        const updateOrder = await order.save()

        res.json(updateOrder)
    } else {
        res.status(404)
        throw new Error('Order not found')
    }
})


// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async(req, res) => {
    const orders = await Order.find({ user: req.user._id })
    res.json(orders)
})


// @desc      Update Order to Delivered
// @router    PUT /api/orders/:id
// @access    Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)

    if(order) {
        order.isDelivered = true
        order.deliveredAt = Date.now()

        const updatedOrder = await order.save()

        res.json(updatedOrder)
    } else {
        res.status(404)
        throw new Error('Order not found')
    }
})


// @desc      Get All Orders
// @router    GET /api/orders
// @access    Private/Admin
const getOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate('user', 'id name')
    res.json(orders)
})

export { 
    addOrderItems, 
    getOrderById, 
    updateOrderToPaid, 
    updateOrderToDelivered, 
    getMyOrders, 
    getOrders 
}
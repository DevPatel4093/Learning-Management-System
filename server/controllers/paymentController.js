const Razorpay = require("razorpay");
const crypto = require("crypto");

const Payment = require("../models/Payment");
const Course = require("../models/Course");

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});
console.log(process.env.RAZORPAY_KEY_ID);
console.log(process.env.RAZORPAY_KEY_SECRET);
// Create Order
exports.createOrder = async (req, res) => {

    try {

        const { courseId } = req.body;

        const course =
            await Course.findById(courseId);

        if (!course) {

            return res.status(404).json({
                message: "Course not found"
            });

        }

        const options = {

            amount: course.price * 100,
            currency: "INR",
            receipt: `receipt_${Date.now()}`
        };

        const order =
            await razorpay.orders.create(options);

        await Payment.create({

            student: req.user.id,
            course: courseId,
            amount: course.price,
            orderId: order.id,
            status: "pending"
        });

        res.status(200).json({

            success: true,
            order

        });

    } catch (error) {

    console.log(error);

    res.status(500).json({
        success: false,
        message: error.message,
        stack: error.stack
    });

}
};

// Verify Payment
exports.verifyPayment = async (req, res) => {

    try {

        const {

            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature

        } = req.body;

        const sign = crypto
            .createHmac(
                "sha256",
                process.env.RAZORPAY_KEY_SECRET
            )
            .update(
                razorpay_order_id +
                "|" +
                razorpay_payment_id
            )
            .digest("hex");

        if (sign !== razorpay_signature) {

            return res.status(400).json({

                success: false,
                message: "Payment verification failed"

            });

        }

        const payment =
            await Payment.findOne({
                orderId: razorpay_order_id
            });

        if (!payment) {

            return res.status(404).json({
                message: "Payment not found"
            });

        }

        payment.paymentId =
            razorpay_payment_id;

        payment.status = "paid";

        await payment.save();

        res.status(200).json({

            success: true,
            message: "Payment verified successfully"

        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// Payment History
exports.getPaymentHistory =
async (req, res) => {

    try {

        const payments =
            await Payment.find({

                student: req.user.id

            })
            .populate(
                "course",
                "title price"
            );

        res.status(200).json(payments);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// Invoice
exports.getInvoice =
async (req, res) => {

    try {

        const payment =
            await Payment.findById(
                req.params.paymentId
            )
            .populate(
                "student",
                "name email"
            )
            .populate(
                "course",
                "title price"
            );

        if (!payment) {

            return res.status(404).json({
                message: "Payment not found"
            });

        }

        res.status(200).json({

            invoiceNumber:
                payment._id,

            student:
                payment.student,

            course:
                payment.course,

            amount:
                payment.amount,

            paymentId:
                payment.paymentId,

            status:
                payment.status,

            createdAt:
                payment.createdAt

        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};
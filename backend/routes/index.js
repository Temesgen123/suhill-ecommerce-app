const express = require('express');
const userSignUpController = require('../controller/user/userSignUp');
const userSignInController = require('../controller/user/userSignin');
const userDetailsController = require('../controller/user/userDetailsController');
const authToken = require('../middlewares/authToken');
const userLogout = require('../controller/user/userLogout');
const allUsers = require('../controller/user/allUsers');
const updateUser = require('../controller/user/updateUser');
const uploadProductController = require('../controller/product/uploadProduct');
const getProductController = require('../controller/product/getProduct');
const updateProductController = require('../controller/product/updateProduct');
const getSingleCategoryProduct = require('../controller/product/getSingleCategoryProduct');
const getProductCategoryWise = require('../controller/product/getProductCategoryWise');
const getProductDetails = require('../controller/product/getProductDetails');
const addToCartController = require('../controller/user/addToCartController');
const countProductAddedToCart = require('../controller/user/countProductAddedToCart');
const productAddedToCartView = require('../controller/user/productAddedToCartView');
const updateAddToCartProduct = require('../controller/user/updateAddToCartProduct');
const deleteProductInCart = require('../controller/user/deleteProductInCart');
const searchProduct = require('../controller/product/searchProduct');
const filterProductController = require('../controller/product/filterProduct');
const paymentController = require('../controller/order/paymentController');
const webhooks = require('../controller/order/webhook');
const orderController = require('../controller/order/orderController');

const router = express.Router();
router.post('/signup', userSignUpController);
router.post('/signin', userSignInController);
router.get('/user-details', authToken, userDetailsController);
router.get('/userlogout', userLogout);

//Admin Panel
router.get('/all-users', authToken, allUsers);
router.post('/update-user', authToken, updateUser);

//Product
router.post('/upload-product', authToken, uploadProductController);
router.get('/get-product', getProductController);
router.post('/update-product', authToken, updateProductController);
router.get('/get-categoryProduct', getSingleCategoryProduct);
router.post('/product-category', getProductCategoryWise);
router.post('/product-details', getProductDetails);
router.get('/search', searchProduct);
router.post('/filter-product', filterProductController);

//Product Cart
router.post('/add-to-cart', authToken, addToCartController);
router.get('/product-added-to-cart-count', authToken, countProductAddedToCart);
router.get('/view-cart-product', authToken, productAddedToCartView);
router.post('/update-cart-product', authToken, updateAddToCartProduct);
router.post('/delete-cart-product', authToken, deleteProductInCart);

// Order and payment
router.post('/checkout', authToken, paymentController);
router.post('/webhook', webhooks); //api/webhook;
router.get('/order-list', authToken, orderController);


module.exports = router;

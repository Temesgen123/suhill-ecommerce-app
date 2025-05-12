const backendDomain = process.env.REACT_APP_BACKEND_URL;
const SummaryApi = {
  signUp: {
    url: `${backendDomain}/api/signup`,
    method: 'post',
  },
  signIn: {
    url: `${backendDomain}/api/signin`,
    method: 'post',
  },
  current_user: {
    url: `${backendDomain}/api/user-details`,
    method: 'get',
  },
  user_logout: {
    url: `${backendDomain}/api/userlogout`,
    method: 'get',
  },
  allUsersList: {
    url: `${backendDomain}/api/all-users`,
    method: 'get',
  },
  updateUser: {
    url: `${backendDomain}/api/update-user`,
    method: 'post',
  },
  uploadProduct: {
    url: `${backendDomain}/api/upload-product`,
    method: 'post',
  },
  allProduct: {
    url: `${backendDomain}/api/get-product`,
    method: 'get',
  },
  updateProduct: {
    url: `${backendDomain}/api/update-product`,
    method: 'post',
  },
  categoryProduct: {
    url: `${backendDomain}/api/get-categoryProduct`,
    method: 'get',
  },
  productCategoryWise: {
    url: `${backendDomain}/api/product-category`,
    method: 'post',
  },
  productDetails: {
    url: `${backendDomain}/api/product-details`,
    method: 'post',
  },
  addProductToCart: {
    url: `${backendDomain}/api/add-to-cart`,
    method: 'post',
  },
  addToCartProductCount: {
    url: `${backendDomain}/api/product-added-to-cart-count`,
    method: 'get',
  },
  addToCartProductView: {
    url: `${backendDomain}/api/view-cart-product`,
    method: 'get',
  },
  updateCartProduct: {
    url: `${backendDomain}/api/update-cart-product`,
    method: 'post',
  },
  deleteCartProduct: {
    url: `${backendDomain}/api/delete-cart-product`,
    method: 'post',
  },
  searchProduct: {
    url: `${backendDomain}/api/search`,
    method: 'get',
  },
  filterProduct: {
    url: `${backendDomain}/api/filter-product`,
    method: 'post',
  },
  payment: {
    url: `${backendDomain}/api/checkout`,
    method: 'post',
  },
  getOrder: {
    url: `${backendDomain}/api/order-list`,
    method: 'get',
  },
  allOrders: {
    url: `${backendDomain}/api/all-orders`,
    method: 'get',
  },
};

export default SummaryApi;

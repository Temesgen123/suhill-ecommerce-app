//Fetch Product
import SummaryApi from '../common/index';

// Make sure it looks EXACTLY like this:
const fetchProductCategoryWise = async (category) => {
  const response = await fetch(SummaryApi.productCategoryWise.url, {
    method: SummaryApi.productCategoryWise.method,
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ category: category }),
  });
  const responseData = await response.json(); // ← MUST have await
  return responseData;
};
export default fetchProductCategoryWise;

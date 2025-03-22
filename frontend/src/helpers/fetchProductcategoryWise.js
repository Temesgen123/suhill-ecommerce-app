//Fetch Product 
import React from 'react';
import SummaryApi from '../common/index';

const fetchProductCategoryWise = async(category)=> {
    const response = await fetch(SummaryApi.productCategoryWise.url, {
        method : SummaryApi.productCategoryWise.method,
        headers : {
            "content-type" : "application/json"
        },
        body : JSON.stringify({category : category})
    });
    const responseData = response.json();
    return responseData;
}
export default fetchProductCategoryWise;





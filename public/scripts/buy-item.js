const buyNow = document.querySelector('#buyNow')

const payUsingPaytm = async (data) => {
    try {
        let response = await fetch.post(`${url}/payment`, data);
        return response.data;
    } catch (error) {
        console.log('Error', error);
    }
}

const buynow = async () => {
    let response = await payUsingPaytm({ amount: 500, email: 'codeforinterview01@gmail.com'});
    var information = {
        action: 'https://securegw-stage.paytm.in/order/process',
        params: response    
    }
    post(information);
}





buyNow.addEventListener('click', buynow)
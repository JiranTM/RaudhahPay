import qs from 'query-string';

export default class RaudhahPay {
    pay({ api_uri, redirect_uri, collection_id, due, ref1, ref2, 
            first_name, last_name, address, email, mobile, 
            title, price, quantity }) {
        
        let body = {
            collection_code:collection_id,
            redirect_uri,
            due: due || moment().format('YYYY-MM-DD'),
            currency: "MYR",
            ref1, ref2,
            first_name, last_name, address, email, mobile, 
            title, price, quantity
        };

        let url = `${api_uri}/raudhahpay/pay?${qs.stringify(body)}`;
        
        window.location.href = url;
    }
}
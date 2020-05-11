import qs from 'qs';

export default class RaudhahPay {
    async pay({ api_uri, redirect_uri, collection_id, due, ref1, ref2, customer, product }) {
        
        let body = {
            collection_code:collection_id,
            redirect_uri,
            due: due || moment().format('YYYY-MM-DD'),
            currency: "MYR",
            ref1, ref2,
            customer, product
        };

        let url = `${api_uri}/raudhahpay/pay?${qs.stringify(body)}`;
        
        window.location.href = url;
    }
}
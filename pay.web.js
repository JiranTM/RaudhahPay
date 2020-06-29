import React from 'react';
import qs from 'query-string';
import moment from 'moment';

export default class RaudhahPay extends React.Component {
    static pay({ api_uri, redirect_uri, collection_id, due, ref1, ref2, 
            first_name, last_name, address, email, mobile, 
            title, price, quantity }) {
        
        let parsed = qs.parse(window.location.search);
        if(parsed.paid)
            return;

        let body = {
            collection_code:collection_id,
            redirect_uri:redirect_uri || window.location.href,
            due: due || moment().format('YYYY-MM-DD'),
            currency: "MYR",
            ref1, ref2,
            first_name, last_name, address, email, mobile, 
            title, price, quantity
        };

        let url = `${api_uri}/raudhahpay/pay?${qs.stringify(body)}`;
        
        window.location.href = url;
    }

    componentDidMount(){
        let { onError, onSuccess } = this.props;

        let parsed = qs.parse(window.location.search);
        
        if(!parsed.paid)
            return

        let { paid } = parsed;
        
        if (Number(paid))
            onSuccess(parsed);
        else
            onError(parsed);
    }

    render(){
        return <div/>
    }
}
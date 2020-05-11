import React from 'react';
import { View, Image, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import WebView from 'react-native-webview';
import moment from 'moment';
import payment from './img/payment.gif';
import qs from 'qs';

export default class RaudhahPay extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            uri: null,
            modalVisible: true,
        }

        this.pay = this.pay.bind(this);
    }

    async pay({ api_uri, collection_id, due, ref1, ref2, customer, product }) {

        let redirect_uri = `${api_uri}/raudhahpay`

        let body = {
            collection_code:collection_id,
            redirect_uri,
            due: due || moment().format('YYYY-MM-DD'),
            currency: "MYR",
            ref1, ref2,
            customer, product
        };

        let url = `${api_uri}/raudhahpay/pay?${qs.stringify(body)}`;
        console.log(url);

        this.setState({ uri:url });
    }

    _onMessage(ev) {
        let { onError, onSuccess } = this.props;

        let json = ev.nativeEvent.data

        let res = JSON.parse(json);
        let { paid } = res;

        if (paid)
            onSuccess(res);
        else{
            onError(res);
            this.setState({ modalVisible: false });
        }
    }

    onClose() {
        let { onError } = this.props;

        this.setState({ modalVisible: false });
        onError();
    }

    render() {
        let { uri } = this.state;

        return (<View style={{ flex: 1 }}>
            {uri ?
                <Modal
                    animationType={'slide'}
                    visible={this.state.modalVisible}
                    onRequestClose={() => this.renderFail}
                    transparent
                >
                    <View style={{ height: 40, backgroundColor: '#fff', borderBottomColor: '#f1f1f1', borderBottomWidth: 1, padding: 10, paddingHorizontal: 20 }}>
                        <TouchableOpacity onPress={this.onClose.bind(this)} style={{}}>
                            <Text style={{ textAlign: 'right' }}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                    <WebView
                        source={{ uri }}
                        onMessage={this._onMessage.bind(this)}
                        startInLoadingState={true}
                        renderLoading={
                            () => <Image source={payment} style={[styles.gif, { bottom: 250 }]} />
                        }

                    />
                </Modal>
                : <this.renderEmpty />}
        </View>)
    }

    renderEmpty() {
        return <View style={styles.body}>
            <Image source={payment} style={styles.gif} />
            <Text style={styles.txt1}>Processing Order</Text>
            <Text style={{ textAlign: "center" }}>Please wait while your order is being processed.</Text>
        </View>
    }

}

const styles = StyleSheet.create({
    txt1: {
        textAlign: "center", fontWeight: "bold", fontSize: 20
    },
    body: {
        width: "100%", height: "100%",
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignContent: 'center',
        paddingHorizontal: 30,
    },
    gif: {
        alignSelf: 'center',
        width: 150,
        resizeMode: 'contain'
    }
})
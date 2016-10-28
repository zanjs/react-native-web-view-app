'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ToastAndroid,
  Dimensions,
  TouchableWithoutFeedback,
  ActivityIndicator
} from 'react-native';

import Web from 'react-native-webview2';
import Button from './components/Button';
import styles from './style/index.css';

export default class extends Component {

	constructor(props) {
        super(props);
        this.state = {
            js: ''
        };
        this.onLoad = this.onLoad.bind(this);
        this.onLoadStart = this.onLoadStart.bind(this);
        this.onLoadEnd = this.onLoadEnd.bind(this);
        this.onError = this.onError.bind(this);
        this.onContentSizeChange = this.onContentSizeChange.bind(this);
        this.renderError = this.renderError.bind(this);
        this.renderLoading = this.renderLoading.bind(this);
        this.onNavigationStateChange = this.onNavigationStateChange.bind(this);
        this.reload = this.reload.bind(this);
        this.evalReturn = this.evalReturn.bind(this);
    }

    onLoad(e) {
        // console.log('onLoad');
        // console.log(e);
    }

    onLoadStart(e) {
        // console.log('onLoadStart');
        // console.log(e);
    }

    onLoadEnd(e) {
        console.log('onLoadEnd');
        console.log(e);
    }

    onError(e) {
        // this.setState({
        //     errmsg: 'Loading error...'
        // });
    }

    onContentSizeChange(e) {
        // console.log('onContentSizeChange');
        // console.log(e);
    }

    renderError(errorDomain, errorCode, errorDesc) {
        ToastAndroid.show("Loading Failed...", ToastAndroid.SHORT);
        return (
            <TouchableWithoutFeedback onPress={this.reload} style={{padding:9}}>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: Dimensions.get('window').height}}>
                    <Text>网络不给力！点击重新加载...sorry, reload please...</Text>
                </View>
            </TouchableWithoutFeedback>
        );
    }

    renderLoading() {
        return (
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: Dimensions.get('window').height, backgroundColor: 'white'}}>
                <ActivityIndicator size="small" color="gray" /><Text>加载中...Loading...</Text>
            </View>
        );
    }

    onNavigationStateChange(navState) {
        // console.log('onNavigationStateChange');
        // console.log(navState);
    }

    evalReturn(r) {
        eval(r);
    }

    go() {
        this.web.go('https://github.com/open-source');
    }

    reload() {
        this.web.reload();
    }

    goForward() {
        this.web.goForward();
    }

    goBack() {
        this.web.goBack();
    }

    test() {
        // this.web.evalJs(`alert(returnEval)`);
        this.web.evalJs(`var t = document.title; returnEval('this.setText("' + t + '")')`);
    }

    setText(t) {
        this.setState({txt: t});
    }

    render() {

        var SITE_URL = "https://www.baidu.com";
        return (
            <ScrollView>
                <View>
                    
                    <Web
                      ref={(c) => {this.web = c}}
                      evalReturn={this.evalReturn}
                   
                      source={{uri: 'http://www.baidu.com'}}
                      
                      startInLoadingState={true}
                      onLoad={this.onLoad}
                      onLoadStart={this.onLoadStart}
                      onLoadEnd={this.onLoadEnd}
                      renderError={this.renderError}
                      renderLoading={this.renderLoading}
                      onNavigationStateChange={this.onNavigationStateChange}
                      onContentSizeChange={this.onContentSizeChange}
                      injectedJavaScript={this.state.js}
                      />
                </View>
            </ScrollView>
        );
    }

}

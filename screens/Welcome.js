import {Platform, StyleSheet, TouchableOpacity, Share,  Image, Text, View, StatusBar, TouchableHighlight} from 'react-native';

import React, { Component } from 'react';
import firebase from 'react-native-firebase';
const Banner = firebase.admob.Banner;
const AdRequest = firebase.admob.AdRequest;
import { InterstitialAdManager, NativeAdsManager,  BannerView, AdSettings  } from 'react-native-fbads';
const advert2 = firebase.admob().rewarded('ca-app-pub-3550043356338169/4660989499')
const advert = firebase.admob().interstitial('ca-app-pub-3550043356338169/4397604928')
const request = new AdRequest();
request.addKeyword('foobar');
export default class Welcome extends Component {

  componentDidMount = () => {

  }
  static navigationOptions = {
    title: "Welcome"
  }
  goToProducts = () => {

  advert.loadAd(request.build());
advert.on('onAdLoaded', () => {
console.log('Advert ready to show.');
});
if (advert.isLoaded()) {
  console.log('working')
  advert.show();
} else {
  console.log('error occured')
} 
this.props.navigation.navigate('Join')
  }
  share = () => {
    advert2.loadAd(request.build())

  advert2.on('onAdLoaded', () => {
     console.log('Advert2 ready to show.')
  })
  
  advert2.show()
    Share.share({
      message: 'Checkout Vestige Products - https://play.google.com/store/apps/details?id=com.vestigeproductslist',
      url: 'https://play.google.com/store/apps/details?id=com.vestigeproductslist',
      title: 'Start Your Own Business'
    }, {
      // Android only:
      dialogTitle: 'Share the app',
      // iOS only:
      excludedActivityTypes: [
        'com.apple.UIKit.activity.PostToTwitter'
      ]
    })
  }
  render() {
    const { navigate } = this.props.navigation
    return (
        <View style={styles.mainContainer}>
               <View style={styles.toolbar}>
                    <Text style={styles.toolbarButton}></Text>
                    <Text style={styles.toolbarTitle}>Home</Text>
                    <TouchableOpacity style={styles.toolbarButton}onPress={() => this.share()}>
                    <Image style={{width:30,marginLeft:5,  height:30}}source={require('../images/share.png')}></Image>
                    </TouchableOpacity>
                </View>
                <View style={styles.content}>

 
                    <View style={styles.messageBox}>
                       
                            <Text style={styles.topText}>Welcome Mesage</Text>
                       
                            <Text style={styles.messageBoxBodyText}>Hello, in this app, you can find specific information about vestige products and their points</Text>
                            <TouchableHighlight style={styles.fullWidthButton} onPress={() => this.goToProducts()}>
            <Text style={styles.fullWidthButtonText}>Let's get started</Text>
            </TouchableHighlight>
            <Text style={styles.messageBoxBodyText2}>If you want to start a business with very low investment,  you can call me +919646407363 (यदि आप बहुत कम निवेश के साथ कोई व्यवसाय शुरू करना चाहते हैं, तो आप मुझे +919646407363 पर कॉल कर सकते हैं)</Text>
            <Text style={styles.messageBoxBodyText2}>If you want to join vestige, whatsapp pic of your adhaar on +919646407363 (यदि आप वेस्टीज में शामिल होना चाहते हैं, तो अपने adhaar की व्हाट्सएप तस्वीर +919646407363 पर क्लिक करें)</Text>
                    </View>

                </View>
                <View style={styles.footer}>
       <Banner
       style={{alignSelf:'center',marginLeft:15}}
    size={"SMALL_BANNER"}
  unitId={"ca-app-pub-3550043356338169/1982855263"}
  request={request.build()}
  onAdLoaded={() => {
    console.log('Advert loaded');
  }} />
  </View>
            </View>
            
    );
  }
};
const styles = StyleSheet.create({
    toolbar:{
        backgroundColor:'#81c04d',
        paddingTop:20,
        paddingBottom:10,
        flexDirection:'row'    //Step 1
    },
    toolbarButton:{
        width: 50,            //Step 2
        color:'#fff',
        textAlign:'center'
    },
    toolbarTitle:{
        color:'#fff',
        textAlign:'center',
        fontWeight:'bold',
        flex:1,
        fontSize:20                //Step 3
    },
    mainContainer:{
      flex:1                  //Step 1
  },
  content:{
      backgroundColor:'#ebeef0',
      flex:1                //Step 2
  },
  messageBox:{
    alignItems : 'center'
  },
  messageBoxBodyText:{
    margin:10,
    fontSize:18
  },
  messageBoxBodyText2:{
    margin:10,
    fontSize:18,
    fontWeight : 'bold'
  },
  topText:{
    fontSize:25,
    marginTop : 10,
    fontWeight : 'bold'
  },
  topText2:{
    fontSize:20,
    marginTop : 10,
    marginLeft:10
  },
  inputsContainer: {
    flex: 1,
    alignItems : 'center'
  },
  fullWidthButton: {
    backgroundColor: 'blue',
    height:50,
    width:'80%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  fullWidthButtonText: {
    fontSize:24,
    color: 'white'
  },
  footer:{
    position:'absolute',
    bottom : 20,
    width : '100%'
  }
  });
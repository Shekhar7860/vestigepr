import {Platform, StyleSheet, Text, View, TouchableOpacity, TextInput,  Share,  Image, StatusBar, TouchableHighlight} from 'react-native';

import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import { InterstitialAdManager, NativeAdsManager,  BannerView, AdSettings  } from 'react-native-fbads';
const Banner = firebase.admob.Banner;
const AdRequest = firebase.admob.AdRequest;
const advert2 = firebase.admob().rewarded('ca-app-pub-3550043356338169/1519820839')
const advert = firebase.admob().interstitial('ca-app-pub-3550043356338169/1854862756')
const request = new AdRequest();
request.addKeyword('foobar');
export default class Join extends Component {
    constructor(props){
        super(props);
        this.state = {
         mobile : '',
         name : '', 
         location : ''
        };
       
     }
  componentDidMount = () => {
  
  }
  static navigationOptions = {
    title: "Welcome"
  }
  goToProducts = () => {
    // AdSettings.addTestDevice(AdSettings.currentDeviceHash);
    // InterstitialAdManager.showAd("434555400602082_434557547268534")
    // .then(didClick => {
    //   console.log('working')
    // })
    // .catch(error => {
    //   console.log(error, 'fb add rror')
    // });
         advert.loadAd(request.build());
    advert2.loadAd(request.build())

    advert2.on('onAdLoaded', () => {
       console.log('Advert2 ready to show.')
    })
    
    advert2.show()

advert.on('onAdLoaded', () => {
  console.log('Advert ready to show.');
});

setTimeout(() => {
  if (advert.isLoaded()) {
    console.log('working')
    advert.show();
  } else {
    console.log('error occured')
  }
}, 1000);
    this.props.navigation.navigate('ScreenOne' )
  }
  share = () => {
    Share.share({
      message: 'Checkout Modicare Products - https://play.google.com/store/apps/details?id=com.newadd',
      url: 'https://play.google.com/store/apps/details?id=com.newadd',
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

  setName = (name) => {
  this.setState ({name : name})
  }

  setMobile = (mobile) => {
    this.setState ({mobile : mobile})
    }

    setLocation = (location) => {
        this.setState ({location : location})
        }

        submit = () => {
            if(this.state.name && this.state.mobile && this.state.location && this.state.mobile.length == 10)
            {
                firebase.database().ref('requests').push({
                    "name": this.state.name,
                    "mobile" : this.state.mobile,
                    "location" : this.state.location
                   
                }).then((data)=>{
                    this.setState ({name : ""})
                    this.setState ({mobile : ""})
                    this.setState ({location : ""})
                    alert("data received..you will receive call shortly")
                    
                }).catch((error)=>{
                    //error callback
                    console.log('error ' , error)
                })
            console.log('name', this.state.name, 'mobile', this.state.mobile.length, 'location', this.state.location)
            }
            else
            {
                alert("please enter valid details")
            }
        }
  render() {
    const { navigate } = this.props.navigation
    return (
        <View style={styles.mainContainer}>
               <View style={styles.toolbar}>
                    <Text style={styles.toolbarButton}></Text>
                    <Text style={styles.toolbarTitle}>User Info</Text>
                    <TouchableOpacity style={styles.toolbarButton}onPress={() => this.goToProducts()}>
                    <Text style={{color:'#fff',
        fontWeight:'bold',
        flex:1,
        fontSize:20     }}> Skip </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.content}>

 
                    <View style={styles.messageBox}>
                       
                            <Text style={styles.topText}>Want To Join? (शामिल होना चाहते हैं?)</Text>
                       
                            <Text style={styles.messageBoxBodyText}>Fill Details (विवरण भरें)</Text>
                            <TextInput style={styles.textInputWidth} placeholder="Enter Name (नाम दर्ज)" value={this.state.name} onChangeText={(text)=>
                    this.setName(text)}   keyboardType='default'></TextInput>
                    <TextInput style={styles.textInputWidth} placeholder="Enter Mobile (मोबाइल दर्ज करें)" value={this.state.mobile} onChangeText={(text)=>
                    this.setMobile(text)} keyboardType='numeric' maxLength={10}></TextInput>
                     <TextInput style={styles.textInputWidth} placeholder="Enter Location (स्थान दर्ज करें)" value={this.state.location} onChangeText={(text)=>
                    this.setLocation(text)} ></TextInput>
                            <TouchableHighlight style={styles.fullWidthButton} onPress={() => this.submit()}>
            <Text style={styles.fullWidthButtonText}>Submit</Text>
            </TouchableHighlight>
            <Text style={styles.messageBoxBodyText2}>If you have any query, you can call me +917626879728 (यदि आपके पास कोई प्रश्न है, तो आप मुझे +917626879728 पर कॉल कर सकते हैं)</Text>
                    </View>
                </View>
                <View style={styles.footer}>
       <Banner
       style={{alignSelf:'center',marginLeft:15}}
    size={"SMALL_BANNER"}
  unitId={"ca-app-pub-3550043356338169/2400344581"}
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
    alignItems : 'center',
    width:'100%'
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
  textInputWidth : {
      width : '80%',
      borderWidth:1,
      borderRadius:20,
      marginBottom:10
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
    bottom : 10,
    width : '100%'
  }
  });
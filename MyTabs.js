import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useState, useRef, useContext } from 'react';
import { SafeAreaView, StyleSheet, Text, StatusBar } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons, Octicons, MaterialIcons, AntDesign } from '@expo/vector-icons';
import { WebView } from 'react-native-webview';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Tab = createBottomTabNavigator();

export default function MyTabs() {
  StatusBar.setBackgroundColor("transparent");
  StatusBar.setTranslucent(true);
  StatusBar.setBarStyle("dark-content");


  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
          position: 'absolute',
          activeTintColor: '#00C2FA',
          tabBarStyle: {
              height: 60,
              paddingTop: 8,
              paddingBottom: 8
          }
      }}>
      <Tab.Screen name="Home" component={HomeMenu}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Octicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen name="notification" component={Setting}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => ( <MaterialIcons name="notifications" size={size} color={color} />
            // isNew !== "" ? <MaterialIcons name="notifications-active" size={size} color={color} /> : <MaterialIcons name="notifications" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen name="Chatting" component={Chatting}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbox-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen name="Login/out" component={Board}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => ( <AntDesign name="logout" size={size} color={color} />
            // isLoggedIn ? <AntDesign name="logout" size={size} color={color} /> : <AntDesign name="login" size={size} color={color} /> 
          ),
        }}
       />
    </Tab.Navigator>
  );
}

const ipAdress = 'https://52.64.235.44';

function HomeMenu({ navigation }) {
  const webViewRef = useRef(null);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
      React.useCallback(() => {
          webViewRef.current.injectJavaScript('location.href="' + ipAdress + '"');
          console.log("useFocusEffect : home");
          setLoading(false);
      }, [])
  );

  function LoadAnimation() {
      return (<Spinner visible={loading} />)
  }

  return (
      <SafeAreaView style={styles.container}>
          <WebView
              ref={webViewRef}
              onLoad={() => setLoading(false)}
              source={{ uri: ipAdress }}
          />
          {loading && <LoadAnimation />}
      </SafeAreaView>
  )
}

function Board({ navigation }) {
  const webViewRef = useRef(null);
  const [loading, setLoading] = useState(true);

  function LoadAnimation() {
      return (<Spinner visible={loading} />)
  }

  return (
      <SafeAreaView>
          <Text>안녕하세요. 여기는 Board 입니다.</Text>
      </SafeAreaView>
  )
}

function Chatting({ navigation }) {
  const webViewRef = useRef(null);
  const [loading, setLoading] = useState(true);

  function LoadAnimation() {
      return (<Spinner visible={loading} />)
  }

  return (
      <SafeAreaView>
          <Text>안녕하세요. 여기는 Chatting 입니다.</Text>
      </SafeAreaView>
  )
}

function Setting({ navigation }) {
  const webViewRef = useRef(null);
  const [loading, setLoading] = useState(true);

  function LoadAnimation() {
      return (<Spinner visible={loading} />)
  }

  return (
      <SafeAreaView>
          <Text>안녕하세요. 여기는 Setting 입니다.</Text>
      </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
},
  text: { fontSize: 28, color: 'white' },
  icon: { fontSize: 36, color: 'white' },
})


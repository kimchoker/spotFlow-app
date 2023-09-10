import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useState, useRef } from 'react';
import { SafeAreaView, StyleSheet, Text, StatusBar } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import { WebView } from 'react-native-webview';
import Spinner from 'react-native-loading-spinner-overlay';

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
          activeTintColor: '#e91e63',
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
            <Feather name={"home"} color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen name="Board" component={Board}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name={"clipboard"} color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen name="Chatting" component={Chatting}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name={"rocketchat"} color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen name="Setting" component={Setting}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Feather name={"settings"} color={color} size={size} />
          ),
        }}
       />
    </Tab.Navigator>
  );
}

function HomeMenu({ navigation }) {
  const webViewRef = useRef(null);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
      React.useCallback(() => {
          webViewRef.current.injectJavaScript('location.href="' + 'https://www.naver.com' + '"');
          console.log("useFocusEffect : naver.com");
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
              source={{ uri: 'https://www.naver.com' }}
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
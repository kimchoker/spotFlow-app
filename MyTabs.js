import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useState, useRef, useContext, useEffect } from 'react';
import { UserContext } from './UserStore';
import { SafeAreaView, StyleSheet, Text, StatusBar } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons, Octicons, MaterialIcons, AntDesign } from '@expo/vector-icons';
import { WebView } from 'react-native-webview';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomerApi from './CustomerApi';
import { useNavigation } from '@react-navigation/native';


const Tab = createBottomTabNavigator();

export default function MyTabs() {
  StatusBar.setBackgroundColor("transparent");
  StatusBar.setTranslucent(true);
  StatusBar.setBarStyle("dark-content");

  const [isNew, setIsNew] = useState("");
  const navigation = useNavigation();
  const subscribeUrl = 'https://52.64.235.44/sub';
  const { isLoggedIn, setIsLoggedIn, joinDate, setJoinDate } = useContext(UserContext);

    useEffect(() => {
    
    const token = "sddsafdsafsdsfasd";
    AsyncStorage.setItem('exToken',token);

    console.log(token);
    const getCustomerInfo = async () => {
      if (token != null) {
        try {
          const response = await CustomerApi.getCustomerInfo(token);
          setJoinDate(response.data.joinDate);
          setIsLoggedIn(true);
          console.log(isLoggedIn);
          if (joinDate !== null) {
            const eventSource = new EventSource(subscribeUrl + "?joinDate=" + joinDate);
            console.log(eventSource);
            // addComment 이벤트 리스너 등록
            eventSource.addEventListener("addComment", function(event) {
              let message = event.data;
              setIsNew(event.data);
              console.log(message);
              // alert(message);
            });
      
            // error 이벤트 리스너 등록
            eventSource.addEventListener("error", function(event) {
              eventSource.close();
            });
      
            // 컴포넌트가 언마운트될 때 EventSource 객체 닫기
            return () => {
              eventSource.close();
            };
          } else {
            return null;
          }
        } catch (error) {
          localStorage.clear();
          setIsLoggedIn(false);
        }
      } else {
        return null;
      }
    };
    getCustomerInfo();
  }, [isLoggedIn, setJoinDate]);
  
  const logOut = () =>{
    AsyncStorage.clear();
    setIsLoggedIn(false);
    navigation.navigate("/");
  }
  
  const login = () => { 
    navigation.navigate("/login")
  }


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
      <Tab.Screen name="notification" component={Notification}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => ( 
            isNew !== "" ? <MaterialIcons name="notifications-active" size={size} color={color} /> : <MaterialIcons name="notifications" size={size} color={color} />
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
      <Tab.Screen
        name={isLoggedIn ? 'logout' : 'login'}
        component={LoginOut}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <AntDesign
              name={isLoggedIn ? 'logout' : 'login'}
              size={size} // Tab.Screen에서 전달되는 size를 그대로 사용
              color={color}
              onPress={() => {
                if (isLoggedIn) {
                  AsyncStorage.clear();
                  setIsLoggedIn(false);
                } else {
                  // 로그인 화면으로 이동
                  navigation.navigate('/login');
                }
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}



function HomeMenu({ navigation }) {
  const webViewRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const ipAdress = 'https://52.64.235.44';
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

function Notification({ navigation }) {
  const webViewRef = useRef(null);
  const [loading, setLoading] = useState(true);

  function LoadAnimation() {
      return (<Spinner visible={loading} />)
  }

  return (
    <SafeAreaView style={styles.container}>
      <WebView
          ref={webViewRef}
          onLoad={() => setLoading(false)}
          source={{ uri: ipAdress + '/notification' }}
      />
      {loading && <LoadAnimation />}
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
    <SafeAreaView style={styles.container}>
      <WebView
          ref={webViewRef}
          onLoad={() => setLoading(false)}
          source={{ uri: ipAdress + '/chat'}}
      />
      {loading && <LoadAnimation />}
    </SafeAreaView>
  )
}

function LoginOut({ navigation }) {
  const webViewRef = useRef(null);
  const [loading, setLoading] = useState(true);

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
},
  text: { fontSize: 28, color: 'white' },
  icon: { fontSize: 36, color: 'white' },
})


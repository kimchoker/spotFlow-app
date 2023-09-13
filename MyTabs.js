import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useState, useRef } from 'react';
import { SafeAreaView, StyleSheet, Text, StatusBar } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons, Octicons, MaterialIcons, AntDesign } from '@expo/vector-icons';
import { WebView } from 'react-native-webview';
import Spinner from 'react-native-loading-spinner-overlay';

const Tab = createBottomTabNavigator();

export default function MyTabs() {
  StatusBar.setBackgroundColor("transparent");
  StatusBar.setTranslucent(true);
  StatusBar.setBarStyle("dark-content");

  const { email, setEmail, nickname, setNickname,setProfilePic,setStatMsg,setFollower, setFollowing ,isLoggedIn, setIsLoggedIn, joinDate, setJoinDate } = useContext(UserContext);
  const [isNew, setIsNew] = useState("");


  const subscribeUrl = "http://52.64.235.44/sub";
    useEffect(() => {
    const token = localStorage.getItem('authToken');
    const getCustomerInfo = async () => {
      if (token != null) {
        try {
          const response = await CustomerApi.getCustomerInfo(token);
          setEmail(response.data.customer.email);
          setNickname(response.data.customer.nickName);
          setProfilePic(response.data.customer.profilePic);
          setStatMsg(response.data.customer.statMsg);
          setFollower(response.data.follower.follower);
          setFollowing(response.data.follower.following);
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
  }, [isLoggedIn,setEmail, setNickname, setProfilePic, setStatMsg, setIsLoggedIn,setFollower, setFollowing, setJoinDate]);


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
            <Octicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen name="notification" component={Noti}
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
      <Tab.Screen name="Login/out" component={LoginOut}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            isLoggedIn ? <AntDesign name="logout" size={size} color={color} /> : <AntDesign name="login" size={size} color={color} /> 
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


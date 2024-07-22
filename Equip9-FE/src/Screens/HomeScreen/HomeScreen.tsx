import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Animated,
  Easing,
  Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {setIsLogin, setUserDetails} from '../../Redux/Reducers';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {dataManagerApiRequest} from '../../DataManager/dataManager';
import {theme} from '../../Theme/Theme';

type Props = {};

const HomeScreen: React.FC<Props> = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [greeting, setGreeting] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [greetingAnimation, setGreetingAnimation] = useState<Animated.Value>(
    new Animated.Value(0),
  );
  const dispatch = useDispatch();
  const {userDetails} = useSelector(state => state.global);

  useEffect(() => {
    if (userDetails) {
      handleGreeting();
    }
  }, [userDetails]);

  const handleGreeting = async () => {
    const hours = new Date().getUTCHours();
    let greetingMessage = '';

    if (hours < 12) {
      greetingMessage = 'Good Morning';
    } else if (hours < 18) {
      greetingMessage = 'Good Afternoon';
    } else {
      greetingMessage = 'Good Evening';
    }

    const fullName = await userDetails?.user
      ? `${userDetails?.user?.firstName} ${userDetails?.user?.lastName || ''}`
      : 'User';
    typeGreeting(greetingMessage, fullName);
    setIsLoading(false)
  };

  const typeGreeting = (greetingMessage: string, fullName: string) => {
    let index = 0;
    setGreeting('');
    setName('');

    Animated.timing(greetingAnimation, {
      toValue: 1,
      duration: 1500,
      easing: Easing.out(Easing.quad),
      useNativeDriver: false,
    }).start();

    const greetingInterval = setInterval(() => {
      if (index < greetingMessage.length) {
        setGreeting(prev => prev + greetingMessage[index]);
        index++;
      } else {
        clearInterval(greetingInterval);
        let nameIndex = 0;
        const nameInterval = setInterval(() => {
          if (nameIndex < fullName.length) {
            setName(prev => prev + fullName[nameIndex]);
            nameIndex++;
          } else {
            clearInterval(nameInterval);
          }
        }, 100);
      }
    }, 100);
  };

  const logoutFn = async () => {
    try {
      const response = await dataManagerApiRequest({
        method: 'POST',
        apiPath: 'logout',
        params: {userId: userDetails.user.id},
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': `${userDetails.token}`,
        },
      });
      console.log(response, 'here');
      if (response?.status) {
        dispatch(setIsLogin(false));
        dispatch(setUserDetails(''));
      } else {
        Alert.alert(response?.message);
      }
    } catch (e) {
      Alert.alert(e.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>EQUIP9</Text>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => logoutFn()}>
          <Icon
            name="logout"
            size={24}
            color={theme.lightBlue}
            style={styles.bellIcon}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.innerContainer}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={theme.lightBlue} />
          </View>
        ) : (
          <Animated.View
            style={[
              styles.messageContainer,
              {
                opacity: greetingAnimation,
                transform: [
                  {
                    translateY: greetingAnimation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [600, 0],
                    }),
                  },
                ],
              },
            ]}>
            <Text style={styles.greetingText}>{greeting}</Text>
            <Text style={styles.nameText}>{name}</Text>
          </Animated.View>
        )}
      </View>
      <Animated.View
        style={[
          styles.animatedBox,
          {
            transform: [
              {
                translateY: greetingAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [600, 0],
                }),
              },
            ],
          },
        ]}>
        <Text style={styles.animatedText}>Welcome to EQUIP9</Text>
      </Animated.View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.lightWhite,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 56,
    marginBottom: 16,
    paddingHorizontal: 16,
    backgroundColor: theme.lightBlue,
    shadowColor: theme.white,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.white,
  },
  iconContainer: {
    backgroundColor: theme.lightWhite,
    borderRadius: 16,
    height: 32,
    width: 32,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 5,
  },
  bellIcon: {
    width: 24,
    height: 24,
  },
  messageContainer: {
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 24,
    backgroundColor: theme.lightBlue,
    borderRadius: 12,
    shadowColor: theme.lightWhite,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    margin: 16,
  },
  greetingText: {
    fontSize: 22,
    fontWeight: '700',
    color: theme.lightWhite,
    textAlign: 'center',
  },
  nameText: {
    fontSize: 22,
    fontWeight: '700',
    color: theme.lightWhite,
    textAlign: 'center',
  },
  animatedBox: {
    position: 'absolute',
    bottom: 50,
    width: '100%',
    alignItems: 'center',
  },
  animatedText: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.lightWhite,
    textAlign: 'center',
    backgroundColor: theme.lightBlue,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
});


import {
  Alert,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import CustomTextInput from '../../Components/CustomInput/CustomInput';
import {useForm} from 'react-hook-form';
import CheckBox from '@react-native-community/checkbox';
import CustomButton from '../../Components/CustomButton/CustomButton';
import CustomSocialButton from '../../Components/CustomSocialButton/CustomSocialButton';
import {useDispatch, useSelector} from 'react-redux';
import {setIsLogin, setUserDetails} from '../../Redux/Reducers';
import {FormData} from '../../Type/Types';
import {createMobileValidation} from '../../Helper/helper';
import {dataManagerApiRequest} from '../../DataManager/dataManager';
import {theme} from '../../Theme/Theme';
import {NavigationProp} from '@react-navigation/native';

interface LoginScreenProps {
  navigation: NavigationProp<any>;
}

const LoginScreen: React.FC<LoginScreenProps> = ({navigation}) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [checkBoxError, setCheckBoxError] = useState('');
  const {
    control,
    handleSubmit,
    formState: {errors},
    getValues,
    setError,
  } = useForm<FormData>({
    defaultValues: {},
    mode: 'onChange',
    reValidateMode: 'onChange',
  });
  const {navigate} = navigation;
  const dispatch = useDispatch();

  const onValid = async () => {
    const {mobileNumber, password} = getValues();
    if (isChecked) {
      setIsLoading(true);
      const data = {
        mobileNumber: mobileNumber,
        password: password,
      };
      const result = await dataManagerApiRequest({
        method: 'POST',
        apiPath: 'login',
        data: data,
      });
      console.log(result);
      if (result?.status) {
        setIsLoading(false);
        dispatch(setIsLogin(true));
        dispatch(setUserDetails(result));
      } else if( result==='Network Error')
      {
        Alert.alert('An error occurred:', result);
        setIsLoading(false);
      }
      else {
        setIsLoading(false);
        setError('mobileNumber', {
          type: 'manual',
          message: 'Invalid Mobile Number!',
        });
        setError('password', {
          type: 'manual',
          message: 'Invalid Password!',
        });
      }
    } else {
      setIsLoading(false);
      setCheckBoxError('Please Click on the Term & Condition');
    }
  };

  const __mobileNumber = () => (
    <CustomTextInput
      control={control}
      name="mobileNumber"
      labelText="Mobile Number"
      required
      isLabel
      numeric
      rules={createMobileValidation()}
      iconName="close"
    />
  );

  const __passwordField = () => {
    return (
      <CustomTextInput
        control={control}
        name="password"
        labelText="Password"
        required
        password
        isLabel
        rules={{required: 'Password is required!'}}
      />
    );
  };

  const __checkbox = () => {
    return (
      <View style={styles.checkboxContainer}>
        <CheckBox
          boxType="square"
          onCheckColor="#fff"
          onFillColor="#1877F2"
          onValueChange={() => setIsChecked(!isChecked)}
          value={isChecked}
          style={styles.CheckBox}
        />
        <Text style={styles.checkboxText}>I've read the T&C</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.header1}>Hello</Text>
          <Text style={styles.header2}>Again!</Text>
          <Text style={styles.smallHeader}>
            Welcome back, you’ve been missed
          </Text>
        </View>
        <ScrollView style={styles.formContainer} showsVerticalScrollIndicator={false}>
          {__mobileNumber()}
          {__passwordField()}
          <View style={styles.checkboxMainContainer}>
            {__checkbox()}
            <TouchableOpacity>
              <Text style={styles.forgetText}>Forgot the password?</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.spacing} />
          {checkBoxError && (
            <Text style={styles.checkBoxError}>{checkBoxError}</Text>
          )}
          <CustomButton
            value={'Login'}
            onPress={handleSubmit(onValid)}
            loading={isLoading}
          />
          <View style={styles.orContainer}>
            <Text style={styles.checkboxText}>or continue with</Text>
          </View>
          <View style={styles.socialButtonContainer}>
            <CustomSocialButton value={'Facebook'} />
            <CustomSocialButton value={'Google'} />
            <CustomSocialButton value="Apple" />
          </View>
          <View style={styles.signUpContainer}>
            <Text style={styles.dontHaveAccount}>Don’t have an account?</Text>
            <TouchableOpacity onPress={() => navigate('Signup')}>
              <Text style={styles.signUp}> Sign Up</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.white,
    paddingTop: 36,
  },
  innerContainer: {
    marginHorizontal: 24,
  },
  headerContainer: {
    height: 240,
  },
  header1: {
    fontWeight: '700',
    fontSize: 48,
    fontFamily: 'Poppins',
    lineHeight: 72,
    letterSpacing: 0.12,
    color: theme.lightBlack,
  },
  header2: {
    fontWeight: '700',
    fontSize: 48,
    fontFamily: 'Poppins-Regular',
    lineHeight: 72,
    letterSpacing: 0.12,
    color: theme.lightBlue,
  },
  smallHeader: {
    fontWeight: '400',
    fontSize: 20,
    fontFamily: 'Poppins-Regular',
    lineHeight: 30,
    letterSpacing: 0.12,
    color: theme.lightGrey,
    width: '60%',
  },
  formContainer: {
    marginTop: 16,
  },
  spacing: {
    height: 16,
  },
  checkboxMainContainer: {
    height: 24,
    flexDirection: 'row',
    gap: 4,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: Platform.OS === 'ios' ? 3 : -6,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  CheckBox: {
    height: 20,
    width: 20,
  },
  checkboxText: {
    fontWeight: '400',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    lineHeight: 21,
    letterSpacing: 0.12,
    color: theme.lightBlue,
    marginLeft: Platform.OS === 'ios' ? 6 : 12,
  },
  forgetText: {
    fontWeight: '400',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    lineHeight: 21,
    letterSpacing: 0.12,
    color: theme.whitishBlue,
    marginLeft: 6,
    height: 20,
  },
  orContainer: {
    height: 21,
    marginVertical: 15,
    justifyContent: 'center',
    alignSelf: 'center',
    width: 114,
  },
  socialButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: 231,
    height: 21,
    alignSelf: 'center',
    margin: 15,
  },
  dontHaveAccount: {
    fontWeight: '400',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    lineHeight: 21,
    letterSpacing: 0.12,
    color: theme.lightGrey,
  },
  signUp: {
    fontWeight: '600',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    lineHeight: 21,
    letterSpacing: 0.12,
    color: theme.lightBlue,
  },
  checkBoxError: {color: theme.red, paddingBottom: 12},
});

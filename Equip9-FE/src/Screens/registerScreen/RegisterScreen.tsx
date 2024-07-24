import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Alert,
  Platform,
} from 'react-native';
import CustomTextInput from '../../Components/CustomInput/CustomInput';
import {useForm, SubmitHandler} from 'react-hook-form';
import CheckBox from '@react-native-community/checkbox';
import CustomButton from '../../Components/CustomButton/CustomButton';
import CustomSocialButton from '../../Components/CustomSocialButton/CustomSocialButton';
import {
  confirmPasswordValidation,
  createMobileValidation,
  createUsernameValidation,
  passwordValidation,
} from '../../Helper/helper';
import {FormData} from '../../Type/Types';
import {dataManagerApiRequest} from '../../DataManager/dataManager';
import { theme } from '../../Theme/Theme';
import {NavigationProp} from '@react-navigation/native';

interface LoginScreenProps {
  navigation: NavigationProp<any>;
}

const RegisterScreen: React.FC<LoginScreenProps> = ({navigation}) => {
  const [isChecked, setIsChecked] = useState(false);
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
  const onValid: SubmitHandler<FormData> = async () => {
    
    const {firstName, lastName, mobileNumber, password} = getValues();
    if (isChecked) {
      setIsLoading(true);
      const data = {
        firstName: firstName,
        lastName: lastName,
        mobileNumber: mobileNumber,
        password: password,
        createdBy: 'system_admin',
        updatedBy: 'system_admin',
      };
      console.log(data)
      try {
        const response = await dataManagerApiRequest({
          method: 'POST',
          apiPath: 'register',
          data: data,
        });
        console.log("response",response);
        if (response?.error === 'ER_DUP_ENTRY') {
          setIsLoading(false);
          setError('mobileNumber', {
            type: 'manual',
            message: response?.message,
          });
          console.log(response)
        } else if (!response?.status) {
          Alert.alert('An error occurred:', response?.message );
          setIsLoading(false);
        } else {
          // Alert.alert(response?.message)
          setIsLoading(false);
          navigate('Login');
        }
      } catch (error) {
        setIsLoading(false);
        Alert.alert(error);
      }
    } else {
      setIsLoading(false);
      setCheckBoxError('Please Click on the Term & Condition');
    }
  };

  const __firstName = () => (
    <CustomTextInput
      control={control}
      name="firstName"
      labelText="First Name"
      required
      isLabel
      rules={createUsernameValidation('First Name')}
      iconName="close"
    />
  );

  const __lastName = () => (
    <CustomTextInput
      control={control}
      name="lastName"
      labelText="Last Name"
      isLabel
      iconName="close"
    />
  );

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

  const __passwordField = () => (
    <CustomTextInput
      control={control}
      name="password"
      labelText="Password"
      required
      password
      isLabel
      rules={passwordValidation}
    />
  );

  const __confirmPasswordField = () => {
    const password = getValues('password');
    return (
      <CustomTextInput
        control={control}
        name="confirmPassword"
        labelText="Confirm Password"
        required
        password
        isLabel
        rules={confirmPasswordValidation(password)}
      />
    );
  };

  const __checkbox = () => (
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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.header2}>Hello!</Text>
          <Text style={styles.smallHeader}>Signup to get Started</Text>
        </View>
        <ScrollView
          contentContainerStyle={styles.formContentContainer}
          showsVerticalScrollIndicator={false}>
          {__firstName()}
          {__lastName()}
          {__mobileNumber()}
          {__passwordField()}
          {__confirmPasswordField()}
          <View style={styles.checkboxMainContainer}>{__checkbox()}</View>
          <View style={styles.spacing} />
          {checkBoxError && (
            <Text style={styles.checkBoxError}>{checkBoxError}</Text>
          )}
          <CustomButton
            value={'Sign Up'}
            onPress={handleSubmit(onValid)}
            loading={isLoading}
          />
          <View style={styles.orContainer}>
            <Text style={styles.checkboxText}>or continue with</Text>
          </View>
          <View style={styles.socialButtonContainer}>
            <CustomSocialButton value="Facebook" />
            <CustomSocialButton value="Google" />
            <CustomSocialButton value="Apple" />
          </View>
          <View style={styles.signUpContainer}>
            <Text style={styles.dontHaveAccount}>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigate('Login')}>
              <Text style={styles.signUp}> Login</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
      <View style={styles.footer} />
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.white,
    paddingTop: 30,
  },
  innerContainer: {
    flex: 1,
    marginHorizontal: 24,
  },
  headerContainer: {
    height: 155,
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
  formContentContainer: {
    flexGrow: 1,
    // paddingBottom: 100,
  },
  spacing: {
    height: 5,
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
    marginLeft: Platform.OS === 'ios' ? 8 : 12,
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
  footer: {
    height: 20,
  },
  checkBoxError: {color: theme.red, paddingBottom: 12},
});

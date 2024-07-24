import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Controller} from 'react-hook-form';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../../Theme/Theme';

type CustomTextInputProps = {
  control: any;
  rules?: any;
  name: string;
  defaultValue?: any;
  disabled?: boolean;
  isLabel?: boolean;
  labelText?: string;
  testID?: string;
  required?: boolean;
  password?: boolean;
  iconName?: string;
  numeric?: boolean;
};

const CustomTextInput = ({
  control,
  rules,
  name,
  defaultValue,
  disabled,
  isLabel,
  labelText,
  testID,
  required,
  password,
  iconName,
  numeric,
}: CustomTextInputProps) => {
  const [isShowPass, setIsShowPass] = useState(false);

  const passwordIcon = isShowPass ? 'eye-outline' : 'eye-off-outline';

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        rules={rules}
        name={name}
   
        defaultValue={defaultValue}
        render={({field: {onChange, value}, fieldState: {error}}) => {
          return (
            <View>
              {isLabel && (
                <Text style={styles.labelText}>
                  {labelText}
                  {required && <Text style={{color: theme.red}}>*</Text>}
                </Text>
              )}
              <View
                style={[
                  styles.inputContainer,
                  error ? styles.errorInput : null,
                ]}>
                <TextInput
                  testID={testID}
                  onChangeText={(text: any) => {
                    onChange(text);
                  }}
                  keyboardType={numeric ? 'number-pad': 'default'}
                  // editable={!disabled}
                  value={value}
                  style={styles.input}
                  secureTextEntry={password && !isShowPass}
                />
                {iconName && error && (
                  <TouchableOpacity
                    style={{
                      height: 24,
                      width: 24,
                      justifyContent: 'center',
                      alignContent: 'center',
                    }}
                    onPress={() => onChange('')}>
                    <Icon name={iconName} size={22} color={theme.red} />
                  </TouchableOpacity>
                )}
                {password && (
                  <TouchableOpacity
                    style={{
                      height: 24,
                      width: 24,
                      justifyContent: 'center',
                      alignContent: 'center',
                    }}
                    onPress={() => setIsShowPass(!isShowPass)}>
                    <Icon name={passwordIcon} size={22} color={theme.lightGrey} />
                  </TouchableOpacity>
                )}
              </View>
              {error && (
                <View style={styles.errorView}>
                  <Icon name={'alert-circle-outline'} size={14} color="red" />
                  <Text style={styles.errorText}>{error?.message}</Text>
                </View>
              )}
            </View>
          );
        }}
      />
    </View>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    width: '100%',
    gap: 4,
  },
  labelText: {
    marginBottom: 4,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 21,
    letterSpacing: 0.12,
    color: theme.lightGrey,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: theme.lightGrey,
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    height: 50,
    gap: 10,
  },
  errorInput: {
    borderColor:theme.red,
    backgroundColor: theme.lightWhite,
  },
  errorView: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    height: 21,
  },
  input: {
    flex: 1,
    height: 48,
    paddingHorizontal: 10,
    fontSize: 14,
  },
  errorText: {
    color: theme.red,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 21,
    letterSpacing: 0.12,
    marginLeft: 5,
  },
});

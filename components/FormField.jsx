import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import { useState } from 'react'
import { styled } from 'nativewind'
import { icons } from '../constants';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);


const FormField = ({ title, value, placeholder, handler, handleChangeText, otherStyles, ...props }) => {
    const [showPassword, setShowPassword] = useState(false)
    return (
    <StyledView className={`space-y-2 ${otherStyles}`}>
      <StyledText className='text-base text-gray-100 font-pmedium'>{title}</StyledText>

      <StyledView className='border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row'>
        <StyledTextInput 
            className='flex-1 text-white font-psemibold text-base'
            value={value}
            placeholder={placeholder}
            placeholderTextColor={'#7b7b8b'}
            onChangeText={handleChangeText}
            secureTextEntry={title === 'Password' && !showPassword}
        />

        {title === 'Password' && (
            <StyledTouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
            >
                <Image
                    source={showPassword ? icons.eye : icons.eyeHide}
                    className='w-6 h-6'
                    resizeMode='contain'
                />
            </StyledTouchableOpacity>
        )}
      </StyledView>
    </StyledView>
  )
}

export default FormField
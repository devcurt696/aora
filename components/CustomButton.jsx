import { Text, TouchableOpacity } from 'react-native'
import { styled } from 'nativewind'

import React from 'react'
const StyledTouchablOpacity = styled(TouchableOpacity);
const StyledText = styled(Text);

const CustomButton = ({ title, handlePress, containerStyles, textStyles, isLoading }) => {
  return (
    <StyledTouchablOpacity
        onPress={handlePress}
        activeOpacity={0.7}
        className={`bg-secondary mt-7 rounded-xl min-h-[62px] flex flex-row justify-center items-center ${containerStyles} ${isLoading ? 'opacity-50' : ''}`}
        disabled={isLoading}
    >
        <StyledText className={`text-primary font-psemibold text-lg ${textStyles}`}>{title}</StyledText>
    </StyledTouchablOpacity>
  )
}

export default CustomButton
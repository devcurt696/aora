import { View, Text, Image } from 'react-native'
import React from 'react'
import { styled } from 'nativewind'
import { images } from '../constants'
import CustomButton from './CustomButton'
import { router } from 'expo-router'

const StyledView = styled(View);
const StyledText = styled(Text);

const EmptyState = ({ title, subtitle }) => {
  return (
    <StyledView className='justify-center items-center px-4'>
      <Image
        source={images.empty}
        className='w-[270px] h-[215px]'
        resizeMode='contain'
      />
       <StyledText className="font-pmedium text-sm text-gray-100">{title}</StyledText>
        <StyledText className="text-xl text-center font-psemibold text-white mt-2">{subtitle}</StyledText>
        <CustomButton 
            title="Create a video"
            handlePress={() => router.push('/create')}
            containerStyles='w-full my-5'
        />
    </StyledView>
  )
}

export default EmptyState
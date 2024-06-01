import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { styled } from 'nativewind'
import { ResizeMode, Video } from "expo-av";
import { icons } from '../constants';

const StyledView = styled(View);

const VideoCard = ({ title, thumbnail, video, avatar, creator }) => {
    const [play, setPlay] = useState(false);
  return (
    <StyledView className="flex-col items-center px-4 mb-14">
        <StyledView className="flex-row gap-3 items-start">
            <StyledView className="justify-center items-center flex-row">
                <StyledView className="w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5">
                    <Image 
                        source={{ uri: avatar }}
                        className="w-full h-full rounded-lg"
                        resizeMode='cover'
                    />
                </StyledView>
                <StyledView className='justify-center flex-1 ml-3 gap-y-1'>
                <Text className="text-sm text-white font-psemibold" numberOfLines={1}>{title}</Text>
                <Text className="text-xs text-gray-100 font-pregular" numberOfLines={1}>{creator}</Text>
                </StyledView>
            </StyledView>
            <StyledView className='pt-2'>
                <Image 
                    source={icons.menu}
                    className="w-5 h-5"
                    resizeMode='contain'
                />
            </StyledView>
        </StyledView>

        {play ? (
            <Video
            source={{ uri: video }}
            className="w-full h-60 rounded-xl mt-3"
            resizeMode={ResizeMode.CONTAIN}
            useNativeControls
            shouldPlay
            onPlaybackStatusUpdate={(status) => {
              if (status.didJustFinish) {
                setPlay(false);
              }
            }}
          />
        ) : (
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setPlay(true)}
                className="w-full h-60 rounded-xl mt-3 relative justify-center items-center"
            >
                <Image 
                    source={{ uri: thumbnail }}
                    className="w-full h-full rounded-xl mt-3"
                    resizeMode='cover'
                />
                <Image 
                    source={icons.play}
                    className="w-12 h-12 absolute"
                    resizeMode='contain'
                />
            </TouchableOpacity>
        )}
    </StyledView>
  )
}

export default VideoCard
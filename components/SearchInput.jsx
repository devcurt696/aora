import { View, TextInput, TouchableOpacity, Image, Alert } from 'react-native'
import { useState } from 'react'
import { styled } from 'nativewind'
import { icons } from '../constants';
import { router, usePathname } from 'expo-router';

const StyledView = styled(View);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);


const SearchInput = ({ initialQuery }) => {
    const pathname = usePathname();
    const [query, setQuery] = useState(initialQuery || '');

    return (
      <StyledView className='border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row space-x-4'>
        <StyledTextInput 
            className='text-base mt-0.5 text-white flex-1 font-pregular'
            value={query}s
            placeholder="Search for videos"
            placeholderTextColor={'#CDCDE0'}
            onChangeText={(e) => setQuery(e)}
        />

        <StyledTouchableOpacity
          onPress={() => {
            if (!query) {
              return Alert.alert('Missing query','Please enter a valid query')
            } 

            if (pathname.startsWith('/search')) {
              router.setParams({ query });
            } else {
              router.push(`/search/${query}`);
            }
          }}
        >
            <Image
                source={icons.search}
                className='w-6 h-6'
                resizeMode='contain'
            />
        </StyledTouchableOpacity>
      </StyledView>
  )
}

export default SearchInput
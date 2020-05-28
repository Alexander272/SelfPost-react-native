import React from 'react'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { AppHeaderIcon } from '../components/AppHeaderIcon';
import { PostList } from '../components/PostList';
import { useSelector } from 'react-redux';

export const BookmarkedScreen = ({ navigation }) => {
    const openPostHandler = post => {
        navigation.navigate('Post', { postId: post.id, date: post.date, bookmarked: post.bookmarked })
    }

    const bookedPost = useSelector(state => state.post.bookedPost)

    return (
        <PostList data={ bookedPost } onOpen={ openPostHandler } />
    )
}

BookmarkedScreen.navigationOptions = ({ navigation }) => ({
    headerTitle: 'Избранное',
    headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={ AppHeaderIcon }>
            <Item title='Toggle drawer' iconName='ios-menu' onPress={() => navigation.toggleDrawer()} />
        </HeaderButtons>
    )
})
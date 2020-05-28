import React, { useEffect } from 'react'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { AppHeaderIcon } from '../components/AppHeaderIcon';
import { PostList } from '../components/PostList';
import { useDispatch, useSelector } from 'react-redux';
import { loadPosts } from '../store/actions/post';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { THEME } from './../theme';

export const MainScreen = ({ navigation }) => {
    const openPostHandler = post => {
        navigation.navigate('Post', { postId: post.id, date: post.date, bookmarked: post.bookmarked })
    }

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadPosts())
    }, [dispatch])

    const allPost = useSelector(state => state.post.allPost)
    const loading = useSelector(state => state.post.loading)

    if (loading) return (
        <View style={ styles.center }>
            <ActivityIndicator size="large" color={ THEME.MAIN_COLOR } />
        </View>
    )

    return (
       <PostList data={ allPost } onOpen={ openPostHandler } />
    )
}

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

MainScreen.navigationOptions = ({ navigation }) => ({
    headerTitle: 'Блог',
    headerRight: () => (
        <HeaderButtons HeaderButtonComponent={ AppHeaderIcon }>
            <Item title='Take photo' iconName='ios-camera' onPress={() => navigation.push('Create')} />
        </HeaderButtons>
    ),
    headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={ AppHeaderIcon }>
            <Item title='Toggle drawer' iconName='ios-menu' onPress={() => navigation.toggleDrawer()} />
        </HeaderButtons>
    )
})
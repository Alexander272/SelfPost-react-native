import React, { useEffect, useCallback } from 'react'
import { StyleSheet, View, Text, Image, Button, ScrollView, Alert } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { AppHeaderIcon } from '../components/AppHeaderIcon';
import { THEME } from './../theme';
import { useDispatch, useSelector } from 'react-redux';
import { toggleBooked, removePost } from '../store/actions/post';

export const PostScreen = ({ navigation }) => {
    const dispatch = useDispatch()

    const postId = navigation.getParam('postId')
    const post = useSelector(state => state.post.allPost.find(p => p.id === postId))

    const bookmarked = useSelector(state => state.post.bookedPost.some(post => post.id === postId))

    useEffect(() => {
        navigation.setParams({ bookmarked })
    }, [bookmarked])

    const toggleHandler = useCallback(() => {
        dispatch(toggleBooked(post))
    }, [dispatch, post])

    useEffect(() => {
        navigation.setParams({ toggleHandler })
    }, [toggleHandler])

    const removeHandler = () => {
        Alert.alert(
            'Удаление',
            'Удалить пост?',
            [
                {
                    text: 'Отменить',
                    style: 'cancel'
                },
                { text: 'Удалить', style: 'destructive', onPress: () => {
                    navigation.navigate('Main')
                    dispatch(removePost(postId))
                } }
            ],
            { cancelable: false }
        );
    }

    if (!post) return null

    return (
        <ScrollView >
            <Image style={ styles.image } source={{ uri: post.img }} />
            <View style={ styles.textWrap }>
                <Text style={ styles.title } >{ post.text }</Text>
            </View>
            <Button title="Удалить" color={ THEME.DANGER_COLOR } onPress={ removeHandler } />
        </ScrollView>
    )
}

PostScreen.navigationOptions = ({ navigation }) => {
    const date = navigation.getParam('date')
    const bookmarked = navigation.getParam('bookmarked')
    const toggleHandler = navigation.getParam('toggleHandler')
    const iconName = bookmarked ? 'ios-star' : 'ios-star-outline'
    return {
        headerTitle: 'Пост от ' + new Date(date).toLocaleDateString(),
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={ AppHeaderIcon }>
                <Item title='Take photo' iconName={ iconName } onPress={ toggleHandler } />
            </HeaderButtons>
        )
    }
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 200
    },
    textWrap: {
        padding: 10
    },
    title: {
        fontFamily: 'open-regular'
    }
})
import React from 'react'
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import { createDrawerNavigator } from 'react-navigation-drawer'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { Platform } from "react-native";
import { MainScreen } from './../screens/MainScreen';
import { PostScreen } from './../screens/PostScreen';
import { THEME } from './../theme';
import { BookmarkedScreen } from './../screens/BookmarkedScreen';
import { AboutScreen } from './../screens/AboutScreen';
import { CreateScreen } from './../screens/CreateScreen';

const navigatorOption = {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? THEME.MAIN_COLOR : '#fff'
        },
        headerTintColor: Platform.OS === 'ios' ? THEME.MAIN_COLOR : '#fff'
    }
}

const PostNavigator = createStackNavigator({
    Main: MainScreen,
    Post: PostScreen
}, navigatorOption)

const BookedNavigator = createStackNavigator({
    Bookmarked: BookmarkedScreen,
    Post: PostScreen
}, navigatorOption)

const bottomTabsConfig = {
    Post: {
        screen: PostNavigator,
        navigationOptions: {
            tabBarLabel: 'Все посты',
            tabBarIcon: info => <Ionicons name='ios-albums' size={ 25 } color={ info.tintColor } />
        }
    },
    Bookmarked: {
        screen: BookedNavigator,
        navigationOptions: {
            tabBarLabel: 'Избранное',
            tabBarIcon: info => <Ionicons name='ios-star' size={ 25 } color={ info.tintColor } />
        }
    }
}

const BottomNavigator = Platform.OS === 'android' 
    ? createMaterialBottomTabNavigator(bottomTabsConfig, {
        activeTintColor: '#fff',
        shifting: true,
        barStyle: {
            backgroundColor: THEME.MAIN_COLOR
        }
    }) 
    : createBottomTabNavigator(bottomTabsConfig, {
        tabBarOptions: {
            activeTintColor: THEME.MAIN_COLOR
        }
    })

const AboutNavigator = createStackNavigator({
    About: AboutScreen
}, navigatorOption)

const CreateNavigator = createStackNavigator({
    Create: CreateScreen
}, navigatorOption)

const MainNavigator = createDrawerNavigator({
    PostTabs: {
        screen: BottomNavigator,
        navigationOptions: {
            drawerLabel: 'Главная',
            drawerIcon: <Ionicons name='ios-home' size={ 20 } color={ THEME.MAIN_COLOR } />
        }
    },
    About: {
        screen: AboutNavigator,
        navigationOptions: {
            drawerLabel: 'О приложении',
            drawerIcon: <MaterialIcons name='description' size={ 20 } color={ THEME.MAIN_COLOR } />
        }
    },
    Create: {
        screen: CreateNavigator,
        navigationOptions: {
            drawerLabel: 'Новый пост',
            drawerIcon: <Ionicons name='ios-add' size={ 20 } color={ THEME.MAIN_COLOR } />
        }
    }
}, {
    contentOptions: {
        activeTintColor: THEME.MAIN_COLOR,
        labelStyle: {
            fontFamily: 'open-bold'
        }
    }
})

export const AppNavigation = createAppContainer(MainNavigator)
import Button from '@/components/buttons/Button';
import { Themedlogo } from '@/components/Themedlogo';
import { ThemedView } from '@/components/ThemedView';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList
} from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Dimensions, useColorScheme, View } from 'react-native';
import { HomeScreen } from './home';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { SavedClients } from './savedClients';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props: any) {
    const theme = useColorScheme() ?? 'light';

    const screenHeight = Dimensions.get('window').height;
    return (
        <DrawerContentScrollView {...props}>
            <View
                style={{ height: screenHeight - 70 }}
                className=" flex justify-between"
            >
                <View>
                    <View
                        className={`items-center h-56 pt-14 justify-center ${theme === 'light' ? 'bg-neutral-200' : 'bg-neutral-600'} mt-[-18%]`}
                    >
                        <Themedlogo />
                    </View>
                    <DrawerItemList {...props} />
                </View>
                <View className="flex items-center">
                    <Button
                        onClick={async () => {
                            await AsyncStorage.removeItem('username');
                            router.push('/');
                        }}
                        data-testid="sair-btn"
                        className="w-[90%]"
                    >
                        Sair
                    </Button>
                </View>
            </View>
        </DrawerContentScrollView>
    );
}

function Auth() {
    const theme = useColorScheme() ?? 'light';

    return (
        <NavigationContainer
            theme={{
                dark: theme === 'dark',
                colors: {
                    primary: '#f4511e',
                    background: theme === 'light' ? '#fff' : '#333',
                    border: theme === 'light' ? '#f4511e' : '#333',
                    card: theme === 'light' ? '#fff' : '#333',
                    notification: theme === 'light' ? '#f4511e' : '#333',
                    text: theme === 'light' ? '#333' : '#fff'
                }
            }}
        >
            <Drawer.Navigator
                initialRouteName="Home"
                drawerContent={(props) => <CustomDrawerContent {...props} />}
                screenOptions={{
                    drawerPosition: 'right',
                    header: ({ navigation }) => (
                        <ThemedView
                            className={`h-28 flex flex-row items-end justify-between p-4 pr-6 pl-6 bg-orange-700 border-b-2 ${
                                theme === 'light'
                                    ? 'border-neutral-100'
                                    : 'border-neutral-800'
                            }`}
                        >
                            <Themedlogo />
                            <MaterialCommunityIcons
                                name="menu"
                                size={32}
                                color={theme === 'dark' ? '#fff' : '#333'}
                                onPress={() => navigation.openDrawer()}
                            />
                        </ThemedView>
                    ),
                    headerTitle: () => <></>
                }}
            >
                <Drawer.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                        title: 'Home',
                        drawerIcon: ({ color, size }) => (
                            <MaterialCommunityIcons
                                name="home-outline"
                                color={color}
                                size={size}
                            />
                        )
                    }}
                />
                <Drawer.Screen
                    name="Salvos"
                    component={SavedClients}
                    options={{
                        title: 'Clientes Salvos',
                        drawerIcon: ({ color, size }) => (
                            <MaterialCommunityIcons
                                name="content-save"
                                color={color}
                                size={size}
                            />
                        )
                    }}
                />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}

export default Auth;

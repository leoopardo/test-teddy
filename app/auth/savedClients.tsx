import { ClientCard } from '@/components/card/clientCard';
import { ThemedText } from '@/components/ThemedText';
import { User } from '@/services/users/list';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';
import { Alert, ScrollView, useColorScheme, View } from 'react-native';

export function SavedClients() {
    const theme = useColorScheme() ?? 'light';
    const [savedClients, setSavedClients] = useState<User[]>([]);

    async function listSavedClients() {
        const saved = await AsyncStorage.getItem('savedUsers');
        const savedUsers: User[] = saved ? JSON.parse(saved) : [];
        setSavedClients(savedUsers);
    }

    async function removeClient(user: User) {
        Alert.alert(
            'Remover dos salvos',
            'Tem certeza de que remover dos salvos?',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel'
                },
                {
                    text: 'Confirmar',
                    onPress: async () => {
                        const saved = savedClients;

                        await AsyncStorage.setItem(
                            'savedUsers',
                            JSON.stringify(
                                saved.filter((value) => value.id !== user.id)
                            )
                        );
                        listSavedClients();
                    }
                }
            ],
            { cancelable: true }
        );
    }

    useFocusEffect(
        useCallback(() => {
            listSavedClients();
        }, [])
    );

    return (
        <ScrollView className="h-full">
            <View
                className={`h-[100vh] p-6 ${theme === 'light' ? 'bg-neutral-100' : 'bg-neutral-900'}`}
            >
                <ThemedText className="w-full text-center text-xl">
                    <ThemedText className="font-extrabold">
                        {savedClients?.length || 0}
                    </ThemedText>{' '}
                    Clientes encontrados
                </ThemedText>

                <View className="flex gap-2 mt-4">
                    {savedClients?.map((user, index) => (
                        <ClientCard
                            data-testid={`client-card-${index}`}
                            key={user.id}
                            companyValuation={user.companyValuation}
                            name={user.name}
                            salary={user.salary}
                            actions={[
                                {
                                    name: 'Adicionar',
                                    icon: (
                                        <MaterialCommunityIcons
                                            name="minus"
                                            size={24}
                                            color={'red'}
                                        />
                                    ),
                                    onClick: () => {
                                        removeClient(user);
                                    }
                                }
                            ]}
                        />
                    ))}
                </View>
            </View>
        </ScrollView>
    );
}

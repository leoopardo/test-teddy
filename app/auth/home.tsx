import Button from '@/components/buttons/Button';
import { ClientCard } from '@/components/card/clientCard';
import { Pagination } from '@/components/pagination';
import { ThemedText } from '@/components/ThemedText';
import { useListUsers, User } from '@/services/users/list';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useEffect, useState } from 'react';
import {
    Alert,
    Modal,
    ScrollView,
    Text,
    TouchableOpacity,
    useColorScheme,
    View
} from 'react-native';
import { MutateCostumerDrawer } from './_components/mutateCostumer';
import { useDeleteClient } from '@/services/users/delete';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Drawer = createDrawerNavigator();

export function HomeScreen() {
    const theme = useColorScheme() ?? 'light';
    const [params, setParams] = useState({ page: 1, limit: 10 });
    const [isPickerVisible, setPickerVisible] = useState(false);
    const { data, loading, fetchUsers } = useListUsers(params);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const deleteClient = useDeleteClient();
    const [userUpdateId, setUserUpdateId] = useState<string | undefined>(
        undefined
    );

    function openPicker() {
        setPickerVisible(true);
    }

    function closePicker() {
        setPickerVisible(false);
    }

    useEffect(() => {
        if (!isCreateOpen && !deleteClient.loading) {
            fetchUsers();
            setUserUpdateId(undefined);
        }
    }, [isCreateOpen, deleteClient.loading]);

    return (
        <ScrollView className="h-full">
            <View
                className={`h-full p-6 ${theme === 'light' ? 'bg-neutral-100' : 'bg-neutral-900'}`}
            >
                <ThemedText className="w-full text-center text-xl">
                    <ThemedText className="font-extrabold">
                        {data?.clients?.length || 0}
                    </ThemedText>{' '}
                    Clientes encontrados
                </ThemedText>

                <ThemedText className="w-full text-center text-xl">
                    Clientes por página:{' '}
                    <TouchableOpacity
                        onPress={openPicker}
                        className="border-2 border-neutral-200 rounded-md h-8 w-12 flex flex-row justify-center items-center"
                    >
                        <ThemedText>
                            {params.limit}{' '}
                            <MaterialCommunityIcons
                                name="chevron-down"
                                size={16}
                            />
                        </ThemedText>
                    </TouchableOpacity>
                </ThemedText>

                {/* Picker Modal */}
                <Modal
                    visible={isPickerVisible}
                    transparent={true}
                    animationType="slide"
                >
                    <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
                        <View className="bg-white w-3/4 rounded-lg p-4">
                            <Picker
                                selectedValue={params.limit}
                                onValueChange={(itemValue) =>
                                    setParams((prev) => ({
                                        ...prev,
                                        limit: itemValue
                                    }))
                                }
                            >
                                <Picker.Item label="10" value={10} />
                                <Picker.Item label="50" value={50} />
                                <Picker.Item label="100" value={100} />
                            </Picker>
                            <TouchableOpacity
                                onPress={closePicker}
                                className="mt-4"
                            >
                                <Text className="text-center text-blue-500">
                                    Fechar
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                <View className="flex gap-2 mt-4">
                    {data?.clients?.map((user, index) => (
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
                                            name="plus"
                                            size={24}
                                        />
                                    ),
                                    onClick: () => {
                                        Alert.alert(
                                            'Salvar',
                                            'Tem certeza de que salvar?',
                                            [
                                                {
                                                    text: 'Cancelar',
                                                    style: 'cancel'
                                                },
                                                {
                                                    text: 'Confirmar',
                                                    onPress: async () => {
                                                        const saved =
                                                            await AsyncStorage.getItem(
                                                                'savedUsers'
                                                            );
                                                        const savedUsers: User[] =
                                                            saved
                                                                ? [
                                                                      ...JSON.parse(
                                                                          saved
                                                                      )
                                                                  ].filter(
                                                                      (user) =>
                                                                          user.id !==
                                                                          user.id
                                                                  )
                                                                : [];

                                                        await AsyncStorage.setItem(
                                                            'savedUsers',
                                                            JSON.stringify([
                                                                ...savedUsers,
                                                                user
                                                            ])
                                                        );
                                                    }
                                                }
                                            ],
                                            { cancelable: true }
                                        );
                                    }
                                },
                                {
                                    name: 'Editar',
                                    icon: (
                                        <MaterialCommunityIcons
                                            name="pencil"
                                            size={24}
                                            color={'#3b82f6'}
                                        />
                                    ),
                                    onClick: () => {
                                        setUserUpdateId(`${user.id}`);
                                        setIsCreateOpen(true);
                                    }
                                },
                                {
                                    name: 'Excluir',
                                    icon: (
                                        <MaterialCommunityIcons
                                            name="trash-can"
                                            size={24}
                                            color={'#f63b3b'}
                                        />
                                    ),
                                    onClick: () =>
                                        deleteClient.confirmDelete(
                                            `${user?.id}`
                                        )
                                }
                            ]}
                        />
                    ))}
                </View>
                <Button
                    data-testid="nre-client-btn"
                    onClick={() => {
                        setIsCreateOpen(true);
                    }}
                    variant="outline"
                    className="mt-4"
                >
                    Adicionar cliente
                </Button>
                <Pagination
                    page={params.page}
                    totalPages={data?.totalPages || 1}
                    onChange={(page) => {
                        setParams((prev) => ({ ...prev, page }));
                    }}
                />
            </View>
            <MutateCostumerDrawer
                visible={isCreateOpen}
                onClose={setIsCreateOpen}
                userId={userUpdateId}
            />
        </ScrollView>
    );
}

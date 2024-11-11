import Button from '@/components/buttons/Button';
import TextField from '@/components/inputs/TextField';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useCreateClient } from '@/services/users/create';
import { useGetClient } from '@/services/users/getById';
import { useUpdateClient } from '@/services/users/update';
import { Formik } from 'formik';
import { Dispatch, useEffect, useRef } from 'react';
import {
    Animated,
    KeyboardAvoidingView,
    Modal,
    Platform,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import * as yup from 'yup';

interface BottomDrawerProps {
    visible: boolean;
    onClose: Dispatch<React.SetStateAction<boolean>>;
    userId?: string;
}

const loginSchema = yup.object().shape({
    name: yup.string().required('Nome é obrigatório'),
    salary: yup.number().required('Salário é obrigatório'),
    companyValuation: yup.number().required('Valor da empresa é obrigatório')
});

export function MutateCostumerDrawer({
    onClose,
    visible,
    userId
}: BottomDrawerProps) {
    const backdropOpacity = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(2000)).current;
    const { createUser } = useCreateClient(() => onClose(false));
    const getById = useGetClient(userId);
    const update = useUpdateClient(() => onClose(false), userId);

    useEffect(() => {
        if (visible) {
            Animated.parallel([
                Animated.timing(backdropOpacity, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true
                }),
                Animated.timing(slideAnim, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true
                })
            ]).start();
        } else {
            Animated.parallel([
                Animated.timing(backdropOpacity, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true
                }),
                Animated.timing(slideAnim, {
                    toValue: 800,
                    duration: 300,
                    useNativeDriver: true
                })
            ]).start();
        }
    }, [visible, backdropOpacity, slideAnim]);

    return (
        <Modal
            transparent
            visible={visible}
            onRequestClose={() => onClose(false)}
            animationType="none"
            testID="mutate-costumer-drawer"
        >
            <TouchableWithoutFeedback onPress={() => onClose(false)}>
                <Animated.View
                    style={{
                        flex: 1,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        opacity: backdropOpacity
                    }}
                >
                    <TouchableWithoutFeedback>
                        <Animated.View
                            style={{
                                transform: [{ translateY: slideAnim }],
                                position: 'absolute',
                                bottom: 0,
                                width: '100%'
                            }}
                        >
                            <KeyboardAvoidingView
                                behavior={
                                    Platform.OS === 'ios'
                                        ? 'position'
                                        : undefined
                                }
                                keyboardVerticalOffset={
                                    Platform.OS === 'ios' ? 220 : 0
                                }
                                style={{ flex: 1 }}
                            >
                                <ThemedView className="h-[500px] w-full bg-white rounded-t-xl pt-12 p-6">
                                    <ThemedText
                                        type="title"
                                        className="text-2xl mb-8"
                                    >
                                        {userId
                                            ? 'Atualizar cliente'
                                            : 'Criar cliente'}
                                    </ThemedText>
                                    {!getById.loading && (
                                        <Formik
                                            initialValues={
                                                getById.data && userId
                                                    ? {
                                                          name: getById.data
                                                              .name,
                                                          salary: `${
                                                              getById.data
                                                                  .salary
                                                          }`,
                                                          companyValuation: `${
                                                              getById.data
                                                                  .companyValuation
                                                          }`
                                                      }
                                                    : {
                                                          name: '',
                                                          salary: 70,
                                                          companyValuation: 70
                                                      }
                                            }
                                            onSubmit={(values) => {
                                                if (userId) {
                                                    update.updateUser(values);
                                                    return;
                                                }
                                                createUser(values);
                                            }}
                                            validationSchema={loginSchema}
                                        >
                                            {({
                                                handleChange,
                                                handleBlur,
                                                handleSubmit,
                                                values,
                                                errors
                                            }) => (
                                                <View className="w-full flex flex-col gap-4">
                                                    <TextField
                                                        data-testid="name-input"
                                                        label="Nome"
                                                        placeholder="Digite o nome"
                                                        name="name"
                                                        value={values.name}
                                                        onChange={handleChange(
                                                            'name'
                                                        )}
                                                        onBlur={handleBlur(
                                                            'name'
                                                        )}
                                                        errors={errors.name}
                                                    />
                                                    <TextField
                                                        data-testid="salary-input"
                                                        label="Salário"
                                                        placeholder="Digite o salário"
                                                        name="salary"
                                                        value={values.salary}
                                                        onChange={handleChange(
                                                            'salary'
                                                        )}
                                                        onBlur={handleBlur(
                                                            'salary'
                                                        )}
                                                        errors={errors.salary}
                                                    />
                                                    <TextField
                                                        data-testid="company-valuation-input"
                                                        label="Valor da Empresa"
                                                        placeholder="Digite o valor da empresa"
                                                        name="companyValuation"
                                                        value={
                                                            values.companyValuation
                                                        }
                                                        onChange={handleChange(
                                                            'companyValuation'
                                                        )}
                                                        onBlur={handleBlur(
                                                            'companyValuation'
                                                        )}
                                                        errors={
                                                            errors.companyValuation
                                                        }
                                                    />
                                                    <Button
                                                        data-testid="login-button"
                                                        onClick={handleSubmit}
                                                    >
                                                        {userId
                                                            ? 'Atualizar'
                                                            : 'Criar'}
                                                    </Button>
                                                </View>
                                            )}
                                        </Formik>
                                    )}
                                </ThemedView>
                            </KeyboardAvoidingView>
                        </Animated.View>
                    </TouchableWithoutFeedback>
                </Animated.View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}

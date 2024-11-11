import Button from '@/components/buttons/Button';
import TextField from '@/components/inputs/TextField';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useNavigation } from 'expo-router';
import { Formik } from 'formik';
import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import * as yup from 'yup';

const loginSchema = yup.object().shape({
    name: yup.string().required('Nome é obrigatório')
});

export default function Start() {
    const navigation = useNavigation();

  
    
    async function handleLogin(values: { name: string }) {
        try {
            await AsyncStorage.setItem('username', values.name);
            router.push('/auth');
            console.log('ok');
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <ThemedView className="flex justify-center flex-col h-full w-full p-8 gap-8">
            <ThemedText className="text-3xl">Olá, seja bem-vindo</ThemedText>
            <Formik
                initialValues={{ name: '' }}
                onSubmit={(values) => handleLogin(values)}
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
                            label="Digite o seu nome"
                            name="name"
                            value={values.name}
                            onChange={handleChange('name')}
                            onBlur={handleBlur('name')}
                            errors={errors.name}
                        />
                        <Button
                            data-testid="login-button"
                            onClick={handleSubmit}
                        >
                            Entrar
                        </Button>
                    </View>
                )}
            </Formik>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        paddingTop: '10%',
        paddingLeft: '5%',
        paddingRight: '5%'
    }
});

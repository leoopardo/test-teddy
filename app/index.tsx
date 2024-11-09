import TextField from '@/components/inputs/TextField';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

export default function Start() {
    const [name, setName] = useState('');
    return (
        <ThemedView className="flex justify-center flex-col h-full w-full p-8 gap-8">
            <ThemedText className='text-3xl'>Olá, seja bem vindo</ThemedText>
            <View className='w-full'>
                <TextField
                    data-testid="name-input"
                    label="Digite o seu nome"
                    name="name"
                    onChange={setName}
                    value={name}
                />
            </View>
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

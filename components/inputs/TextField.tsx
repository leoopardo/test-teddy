import { Text, TextInput, View } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

interface TextFieldProps {
    label: string;
    value: string;
    name: string;
    'data-testid': string;
    onChange: any;
}

export default function TextField({
    label,
    name,
    onChange,
    value,
    ...params
}: TextFieldProps) {
    const color = useThemeColor({ light: undefined, dark: undefined }, 'text');
    return (
        <View className="flex flex-col gap-2">
            <Text className="text-xl" style={[{ color }]} >
                {label}
            </Text>
            <TextInput
                value={value}
                testID={params['data-testid']}
                onChange={onChange}
                aria-label={label}
                className="bg-white border border-gray-300 p-2 rounded-md w-full text-2xl h-12 focus:border-orange-400 focus:border-1 focus:border-solid transition-all"
            />
        </View>
    );
}

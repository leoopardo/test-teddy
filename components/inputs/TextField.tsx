import { Text, TextInput, View } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

interface TextFieldProps {
    label: string;
    value: string;
    name: string;
    'data-testid': string;
    onChange?: (value: string) => void;
    errors?: string;
    isTouched?: boolean;
    onBlur?: (e: any) => void;
}

export default function TextField({
    label,
    name,
    onChange,
    value,
    errors,
    isTouched,
    onBlur,
    ...params
}: TextFieldProps) {
    const color = useThemeColor({ light: undefined, dark: undefined }, 'text');
    return (
        <View className="flex flex-col gap-2">
            <Text className="text-xl" style={[{ color }]}>
                {label}
            </Text>
            <TextInput
                value={value}
                testID={params['data-testid']}
                onChangeText={(value) => onChange && onChange(value)}
                onBlur={onBlur}
                aria-label={label}
                className="bg-white border border-gray-300 p-2 rounded-md w-full text-2xl h-12 focus:border-orange-400 focus:border-1 focus:border-solid transition-all"
            />
            {isTouched && errors && (
                <Text className="text-red-500 text-sm">{errors}</Text>
            )}
        </View>
    );
}

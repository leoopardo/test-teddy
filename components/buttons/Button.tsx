import { TouchableOpacity } from 'react-native';
import { Pressable, Text } from 'react-native';

interface ButtonProps {
    onClick: any;
    'data-testid': string;
    variant?: 'primary' | 'outline' | 'text';
    children: any;
    disabled?: boolean;
    loading?: boolean;
    className?: string;
}

export default function Button({
    children,
    onClick,
    variant = 'primary',
    disabled,
    loading,
    className,
    ...params
}: ButtonProps) {
    return (
        <TouchableOpacity
            onPress={onClick}
            className={`${className} ${variant === "primary" && "bg-orange-500"} ${variant === "outline" && "border-2 border-orange-500"} rounded-lg  p-3 flex justify-center items-center  transition-all`}
            testID={params['data-testid']}
            disabled={disabled || loading}
        >
            <Text className={`text-xl font-semibold ${variant === "outline" && "text-orange-600"}`}>{children}</Text>
        </TouchableOpacity>
    );
}

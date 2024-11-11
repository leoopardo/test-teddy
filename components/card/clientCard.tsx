import { formatter } from '@/utils/foratter';
import { TouchableOpacity, useColorScheme, View } from 'react-native';
import { ThemedText } from '../ThemedText';
import { ThemedView } from '../ThemedView';

interface CardProps {
    name: string;
    salary: number;
    companyValuation: number;
    actions?: { name: string; icon: React.ReactNode; onClick: () => void }[];
    'data-testid': string;
}

export function ClientCard({
    name,
    companyValuation,
    salary,
    actions,
    'data-testid': testId
}: CardProps) {
    const theme = useColorScheme() ?? 'light';
    return (
        <ThemedView className="rounded-lg p-4 shadow-sm" testID={testId}>
            <View className="flex flex-col gap-2 justify-center items-center">
                <ThemedText className="text-xl font-bold">{name}</ThemedText>
                <ThemedText className="text-lg">
                    Salário: {formatter.Currency(salary || 0)}
                </ThemedText>
                <ThemedText className="text-lg">
                    Empresa: {formatter.Currency(companyValuation || 0)}
                </ThemedText>
                <View className="flex flex-row justify-between w-full pl-8 pr-8">
                    {actions &&
                        actions.map((action) => (
                            <TouchableOpacity
                                onPress={action.onClick}
                                testID={`action-${action.name || ''}`}
                            >
                                {action.icon}
                            </TouchableOpacity>
                        ))}
                </View>
            </View>
        </ThemedView>
    );
}

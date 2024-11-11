import { Image, useColorScheme, type ViewProps } from 'react-native';


export type ThemedViewProps = ViewProps & {
    className?: string;
};

export function Themedlogo({ className }: ThemedViewProps) {
    const theme = useColorScheme() ?? 'light';

    return (
        <Image
            className={`w-24 h-12 ${className}`}
            source={
                theme === 'light'
                    ? require('../assets/images/logo.png')
                    : require('../assets/images/logo-dark.png')
            }
            alt='logo'
        />
    );
}

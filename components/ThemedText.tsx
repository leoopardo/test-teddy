import { Text, type TextProps, StyleSheet } from 'react-native';
import '../global.css';
import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedTextProps = TextProps & {
    lightColor?: string;
    darkColor?: string;
    type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
    className?: string;
};

export function ThemedText({
    style,
    lightColor,
    darkColor,
    type = 'default',
    ...rest
}: ThemedTextProps) {
    const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

    return (
        <Text
            style={[
                { color },
                type === 'default' ? styles.default : undefined,
                type === 'title' ? styles.title : undefined,
                type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
                type === 'subtitle' ? styles.subtitle : undefined,
                type === 'link' ? styles.link : undefined,
                style
            ]}
            {...rest}
        />
    );
}

const styles = StyleSheet.create({
    default: {
        lineHeight: 24
    },
    defaultSemiBold: {
        lineHeight: 24,
        fontWeight: '600'
    },
    title: {
        fontWeight: 'bold',
        lineHeight: 32
    },
    subtitle: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    link: {
        lineHeight: 30,
        color: '#0a7ea4'
    }
});

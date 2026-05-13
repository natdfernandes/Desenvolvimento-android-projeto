import { usePathname, useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Navbar() {
    const router = useRouter();
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;

    return (
        <SafeAreaView style={styles.navbar}>

            <TouchableOpacity
                style={[
                    styles.tab,
                    isActive('/estoque') && styles.tabActive,
                ]}
                onPress={() => router.push('/estoque')}
            >
                <Text
                    style={[
                        styles.tabText,
                        isActive('/estoque') && styles.tabTextActive,
                    ]}
                >
                    Estoque
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[
                    styles.tab,
                    isActive('/tarefas') && styles.tabActive,
                ]}
                onPress={() => router.push('/tarefas')}
            >
                <Text
                    style={[
                        styles.tabText,
                        isActive('/tarefas') && styles.tabTextActive,
                    ]}
                >
                    Tarefas
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    navbar: {
        flexDirection: 'row',
        backgroundColor: '#FAFAFA',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5',
        gap: 0,
    },
    tab: {
        flex: 1,
        paddingVertical: 12,
        paddingHorizontal: 16,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 3,
        borderBottomColor: 'transparent',
    },
    tabActive: {
        borderBottomColor: '#0284C7',
    },
    tabText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#A3A3A3',
    },
    tabTextActive: {
        color: '#0284C7',
    },
});

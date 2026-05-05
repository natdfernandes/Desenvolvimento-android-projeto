import { Checkbox } from "expo-checkbox";
import { Image as ExpoImage } from 'expo-image';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

export default function LoginScreen() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberPassword, setRememberPassword] = useState(false);

    const handleLogin = () => {
        // Implementar lógica de login aqui
        console.log('Email:', email);
        console.log('Password:', password);
        console.log('Remember:', rememberPassword);
        router.push('/estoque');
    };

    return (
        <ScrollView
            contentContainerStyle={styles.container}
            showsVerticalScrollIndicator={false}
        >
            {/* Header Container */}
            <View style={styles.headerContainer}>
                <ExpoImage
                    source={require('../assets/images/logo.png')}
                    style={styles.logo}
                    contentFit="contain"
                />
                <Text style={styles.header}>BEM VINDO</Text>
                <Text style={styles.subHeader}>SEU APP FAVORITO DE COMPRAS</Text>
            </View>

            {/* Form Container */}
            <View style={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#A3A3A3"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Senha"
                    placeholderTextColor="#A3A3A3"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
            </View>

            {/* Access Control Container */}
            <View style={styles.accessControlContainer}>
                <TouchableOpacity>
                    <Text style={styles.forgotPasswordLink}>Esqueceu sua senha?</Text>
                </TouchableOpacity>

                <View style={styles.checkboxContainer}>
                    <Checkbox
                        value={rememberPassword}
                        onValueChange={(e) => setRememberPassword(e)}
                    />
                    <Text style={styles.checkboxLabel}>Lembrar senha</Text>
                </View>
            </View>

            {/* Login Button */}
            <TouchableOpacity
                style={styles.loginButton}
                onPress={handleLogin}
            >
                <Text style={styles.loginButtonText}>ENTRAR</Text>
            </TouchableOpacity>

            {/* Footer */}
            <View style={styles.footer}>
                <Text style={styles.footerText}>
                    Desenvolvido por: Natalia Dias Fernandes 2026 ®
                </Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        gap: 24,
        paddingHorizontal: 24,
        paddingVertical: 16,
        backgroundColor: '#FAFAFA',
        justifyContent: 'space-between',
    },

    // Header Container
    headerContainer: {
        gap: 24,
        alignItems: 'center',
    },
    logo: {
        width: '100%',
        height: 200,
        marginTop: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#171717',
        textAlign: 'center',
    },
    subHeader: {
        fontSize: 14,
        color: '#A3A3A3',
        textAlign: 'center',
    },

    // Form Container
    formContainer: {
        gap: 8,
    },
    input: {
        borderRadius: 9999,
        gap: 4,
        borderWidth: 1,
        borderColor: '#D4D4D4',
        color: '#171717',
        paddingHorizontal: 20,
        paddingVertical: 8,
        fontSize: 14,
    },

    // Access Control Container
    accessControlContainer: {
        gap: 8,
        alignItems: 'center',
    },
    forgotPasswordLink: {
        color: '#0284C7',
        fontSize: 14,
        textDecorationLine: 'underline',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 2,
        borderWidth: 2,
        borderColor: '#A3A3A3',
    },
    checkboxInput: {
        width: 18,
        height: 18,
        borderRadius: 2,
        borderWidth: 2,
        borderColor: '#A3A3A3',
        cursor: 'pointer',
    },
    checkboxLabel: {
        color: '#171717',
        fontSize: 14,
    },

    // Login Button
    loginButton: {
        width: '100%',
        backgroundColor: '#0891B2',
        paddingVertical: 12,
        paddingHorizontal: 12,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 4,
    },
    loginButtonText: {
        color: '#FAFAFA',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    },

    // Footer
    footer: {
        width: '100%',
        alignItems: 'center',
        marginTop: 20,
    },
    footerText: {
        color: '#0284C7',
        fontSize: 12,
        textAlign: 'center',
    },
});

import { StyleSheet, Text, View } from "react-native";

export default function Footer() {
    return (
        <View style={styles.footer}>
            <Text style={styles.footerText}>
                Desenvolvido por: Natalia Dias Fernandes 2026 ®
            </Text>
        </View>)
}

const styles = StyleSheet.create({
    footer: {
        width: '100%',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20,
    },
    footerText: {
        color: '#0284C7',
        fontSize: 12,
        textAlign: 'center',
    },
});
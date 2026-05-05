import { FontAwesome } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Alert,
    FlatList,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

interface Produto {
    id: string;
    nome: string;
}

export default function EstoqueScreen() {
    const [produtos, setProdutos] = useState<Produto[]>([
        { id: '1', nome: 'Arroz' },
        { id: '2', nome: 'Feijão' },
    ]);
    const [nomeProduto, setNomeProduto] = useState('');
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editingNome, setEditingNome] = useState('');

    const handleAddProduto = () => {
        if (nomeProduto.trim() === '') {
            Alert.alert('Erro', 'Por favor, digite um nome de produto');
            return;
        }

        if (editingId) {
            // Modo de edição
            setProdutos(produtos.map(p =>
                p.id === editingId ? { ...p, nome: nomeProduto } : p
            ));
            setEditingId(null);
            setNomeProduto('');
        } else {
            // Modo de adição
            const newProduto: Produto = {
                id: Date.now().toString(),
                nome: nomeProduto,
            };
            setProdutos([...produtos, newProduto]);
            setNomeProduto('');
        }
    };

    const handleEditProduto = (produto: Produto) => {
        setEditingId(produto.id);
        setNomeProduto(produto.nome);
    };

    const handleDeleteProduto = (id: string) => {
        Alert.alert(
            'Confirmar exclusão',
            'Deseja realmente excluir este produto?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Excluir',
                    onPress: () => {
                        setProdutos(produtos.filter(p => p.id !== id));
                    },
                    style: 'destructive',
                },
            ]
        );
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setNomeProduto('');
    };

    const renderProduto = ({ item }: { item: Produto }) => (
        <View style={styles.produtoItem}>
            <Text style={styles.produtoNome}>{item.nome}</Text>
            <View style={styles.acoesBotoes}>
                <TouchableOpacity
                    style={styles.botaoEditar}
                    onPress={() => handleEditProduto(item)}
                >
                    <FontAwesome name="pencil" size={16} color="#0284C7" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.botaoDeletar}
                    onPress={() => handleDeleteProduto(item.id)}
                >
                    <FontAwesome name="trash" size={16} color="#0000" />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <ScrollView
            contentContainerStyle={styles.container}
            showsVerticalScrollIndicator={false}
        >
            {/* Header Container */}
            <View style={styles.headerContainer}>
                <Text style={styles.header}>Estoque</Text>
            </View>

            {/* Form Container */}
            <View style={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Cadastrar produto"
                    placeholderTextColor="#A3A3A3"
                    value={nomeProduto}
                    onChangeText={setNomeProduto}
                />
                <TouchableOpacity
                    style={styles.cadastrarButton}
                    onPress={handleAddProduto}
                >
                    <Text style={styles.cadastrarButtonText}>
                        {editingId ? 'Atualizar' : 'Cadastrar'}
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Botão de Cancelar (aparece apenas em modo de edição) */}
            {editingId && (
                <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={handleCancelEdit}
                >
                    <Text style={styles.cancelButtonText}>Cancelar</Text>
                </TouchableOpacity>
            )}

            {/* Lista de Produtos */}
            <View style={styles.listContainer}>
                <Text style={styles.listTitle}>Produtos Cadastrados</Text>
                {produtos.length > 0 ? (
                    <FlatList
                        data={produtos}
                        renderItem={renderProduto}
                        keyExtractor={item => item.id}
                        scrollEnabled={false}
                        ItemSeparatorComponent={() => <View style={styles.separator} />}
                    />
                ) : (
                    <Text style={styles.emptyMessage}>Nenhum produto cadastrado</Text>
                )}
            </View>

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
        justifyContent: 'flex-start',
    },

    // Header Container
    headerContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    header: {
        fontSize: 60,
        fontWeight: 'bold',
        color: '#171717',
        textAlign: 'center',
    },

    // Form Container
    formContainer: {
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center',
    },
    input: {
        flex: 1,
        borderRadius: 9999,
        borderWidth: 1,
        borderColor: '#D4D4D4',
        color: '#171717',
        paddingHorizontal: 20,
        paddingVertical: 8,
        fontSize: 14,
    },
    cadastrarButton: {
        backgroundColor: '#0284C7',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cadastrarButtonText: {
        color: '#FAFAFA',
        fontSize: 14,
        fontWeight: '600',
    },

    // Cancel Button
    cancelButton: {
        backgroundColor: '#A3A3A3',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-start',
    },
    cancelButtonText: {
        color: '#FAFAFA',
        fontSize: 14,
        fontWeight: '600',
    },

    // List Container
    listContainer: {
        gap: 12,
    },
    listTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#171717',
    },
    produtoItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 12,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#E5E5E5',
    },
    produtoNome: {
        fontSize: 16,
        color: '#171717',
        fontWeight: '500',
        flex: 1,
    },
    acoesBotoes: {
        flexDirection: 'row',
        gap: 12,
    },
    botaoEditar: {
        padding: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    botaoDeletar: {
        padding: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    separator: {
        height: 8,
    },
    emptyMessage: {
        fontSize: 14,
        color: '#A3A3A3',
        textAlign: 'center',
        paddingVertical: 20,
    },

    // Footer
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

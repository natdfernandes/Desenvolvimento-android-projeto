import Navbar from '@/components/ui/Navbar';
import { FontAwesome } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Alert,
    FlatList,
    Modal,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

interface Funcionario {
    id: string;
    nome: string;
    cargo: string;
    funcoes: string[];
}

export default function TarefasScreen() {
    const [funcionarios, setFuncionarios] = useState<Funcionario[]>([
        {
            id: '1',
            nome: 'João Silva',
            cargo: 'Gerente',
            funcoes: ['Supervisionar equipe', 'Planejamento'],
        },
        {
            id: '2',
            nome: 'Maria Santos',
            cargo: 'Vendedora',
            funcoes: ['Atendimento ao cliente'],
        },
    ]);

    const [modalVisible, setModalVisible] = useState(false);
    const [nomeFuncionario, setNomeFuncionario] = useState('');
    const [cargoFuncionario, setCargoFuncionario] = useState('');
    const [funcoes, setFuncoes] = useState<string[]>([]);
    const [novaFuncao, setNovaFuncao] = useState('');

    const handleAddFuncao = () => {
        if (novaFuncao.trim() === '') {
            Alert.alert('Erro', 'Por favor, digite uma função');
            return;
        }
        setFuncoes([...funcoes, novaFuncao]);
        setNovaFuncao('');
    };

    const handleRemoveFuncao = (index: number) => {
        setFuncoes(funcoes.filter((_, i) => i !== index));
    };

    const handleAddFuncionario = () => {
        if (nomeFuncionario.trim() === '') {
            Alert.alert('Erro', 'Por favor, digite o nome do funcionário');
            return;
        }
        if (cargoFuncionario.trim() === '') {
            Alert.alert('Erro', 'Por favor, digite o cargo');
            return;
        }
        if (funcoes.length === 0) {
            Alert.alert('Erro', 'Por favor, adicione pelo menos uma função');
            return;
        }

        const newFuncionario: Funcionario = {
            id: Date.now().toString(),
            nome: nomeFuncionario,
            cargo: cargoFuncionario,
            funcoes: funcoes,
        };

        setFuncionarios([...funcionarios, newFuncionario]);
        setModalVisible(false);
        setNomeFuncionario('');
        setCargoFuncionario('');
        setFuncoes([]);
        setNovaFuncao('');
    };

    const handleDeleteFuncionario = (id: string) => {
        const mensagem = 'Deseja realmente excluir este funcionário?';
        if (Platform.OS === 'web') {
            if (window.confirm(mensagem)) {
                removerFuncionario(id);
            }
            return;
        }
        Alert.alert(
            'Confirmar exclusão',
            mensagem,
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Excluir',
                    onPress: () => {
                        removerFuncionario(id);
                    },
                    style: 'destructive',
                },
            ]
        );
    };

    const handleCloseModal = () => {
        setModalVisible(false);
        setNomeFuncionario('');
        setCargoFuncionario('');
        setFuncoes([]);
        setNovaFuncao('');
    };

    const renderFuncionario = ({ item }: { item: Funcionario }) => (
        <View style={styles.funcionarioItem}>
            <View style={styles.funcionarioInfo}>
                <Text style={styles.funcionarioNome}>{item.nome}</Text>
                <Text style={styles.funcionarioCargo}>{item.cargo}</Text>
                <View style={styles.funcoesContainer}>
                    {item.funcoes.map((funcao, index) => (
                        <View key={index} style={styles.funcaoBadge}>
                            <Text style={styles.funcaoTexto}>{funcao}</Text>
                        </View>
                    ))}
                </View>
            </View>
            <TouchableOpacity
                style={styles.botaoDeletar}
                onPress={() => handleDeleteFuncionario(item.id)}
            >
                <FontAwesome name="trash" size={16} color="#000000" />
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <Navbar />
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Header Container */}
                <View style={styles.headerContainer}>
                    <Text style={styles.header}>Tarefas</Text>
                </View>

                {/* Botão Adicionar */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.adicionarButton}
                        onPress={() => setModalVisible(true)}
                    >
                        <FontAwesome name="plus" size={16} color="#FAFAFA" />
                        <Text style={styles.adicionarButtonText}>
                            Adicionar Novo Funcionário
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Lista de Funcionários */}
                <View style={styles.listContainer}>
                    <Text style={styles.listTitle}>Funcionários Cadastrados</Text>
                    {funcionarios.length > 0 ? (
                        <FlatList
                            data={funcionarios}
                            renderItem={renderFuncionario}
                            keyExtractor={item => item.id}
                            scrollEnabled={false}
                            ItemSeparatorComponent={() => (
                                <View style={styles.separator} />
                            )}
                        />
                    ) : (
                        <Text style={styles.emptyMessage}>
                            Nenhum funcionário cadastrado
                        </Text>
                    )}
                </View>
            </ScrollView>

            {/* Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={handleCloseModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>
                                Adicionar Novo Funcionário
                            </Text>
                            <TouchableOpacity onPress={handleCloseModal}>
                                <FontAwesome name="close" size={24} color="#171717" />
                            </TouchableOpacity>
                        </View>

                        <ScrollView
                            contentContainerStyle={styles.modalFormContainer}
                            showsVerticalScrollIndicator={false}
                        >
                            {/* Nome Input */}
                            <View style={styles.formGroup}>
                                <Text style={styles.label}>Nome do Funcionário</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Digite o nome"
                                    placeholderTextColor="#A3A3A3"
                                    value={nomeFuncionario}
                                    onChangeText={setNomeFuncionario}
                                />
                            </View>

                            {/* Cargo Input */}
                            <View style={styles.formGroup}>
                                <Text style={styles.label}>Cargo</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Digite o cargo"
                                    placeholderTextColor="#A3A3A3"
                                    value={cargoFuncionario}
                                    onChangeText={setCargoFuncionario}
                                />
                            </View>

                            {/* Funções */}
                            <View style={styles.formGroup}>
                                <Text style={styles.label}>Funções</Text>

                                {/* Input de Nova Função */}
                                <View style={styles.funcaoInputContainer}>
                                    <TextInput
                                        style={styles.funcaoInput}
                                        placeholder="Digite uma função"
                                        placeholderTextColor="#A3A3A3"
                                        value={novaFuncao}
                                        onChangeText={setNovaFuncao}
                                    />
                                    <TouchableOpacity
                                        style={styles.adicionarFuncaoButton}
                                        onPress={handleAddFuncao}
                                    >
                                        <FontAwesome name="plus" size={14} color="#FAFAFA" />
                                    </TouchableOpacity>
                                </View>

                                {/* Funções Adicionadas */}
                                {funcoes.length > 0 && (
                                    <View style={styles.funcoesAdicionadasContainer}>
                                        {funcoes.map((funcao, index) => (
                                            <View
                                                key={index}
                                                style={styles.funcaoAdicionadaBadge}
                                            >
                                                <Text style={styles.funcaoAdicionadaTexto}>
                                                    {funcao}
                                                </Text>
                                                <TouchableOpacity
                                                    onPress={() =>
                                                        handleRemoveFuncao(index)
                                                    }
                                                    style={styles.removeFuncaoButton}
                                                >
                                                    <FontAwesome
                                                        name="times"
                                                        size={12}
                                                        color="#FAFAFA"
                                                    />
                                                </TouchableOpacity>
                                            </View>
                                        ))}
                                    </View>
                                )}
                            </View>
                        </ScrollView>

                        {/* Modal Buttons */}
                        <View style={styles.modalButtonContainer}>
                            <TouchableOpacity
                                style={styles.cancelarButton}
                                onPress={handleCloseModal}
                            >
                                <Text style={styles.cancelarButtonText}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.cadastrarButton}
                                onPress={handleAddFuncionario}
                            >
                                <Text style={styles.cadastrarButtonText}>Cadastrar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );

    function removerFuncionario(id: string) {
        setFuncionarios(funcionarios.filter(f => f.id !== id));
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAFA',
    },
    scrollContent: {
        gap: 24,
        paddingHorizontal: 24,
        paddingVertical: 16,
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

    // Button Container
    buttonContainer: {
        alignItems: 'center',
    },
    adicionarButton: {
        backgroundColor: '#0284C7',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 4,
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    adicionarButtonText: {
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
    funcionarioItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingVertical: 12,
        paddingHorizontal: 12,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#E5E5E5',
    },
    funcionarioInfo: {
        flex: 1,
        gap: 8,
    },
    funcionarioNome: {
        fontSize: 16,
        color: '#171717',
        fontWeight: '600',
    },
    funcionarioCargo: {
        fontSize: 14,
        color: '#666666',
        fontWeight: '500',
    },
    funcoesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 6,
    },
    funcaoBadge: {
        backgroundColor: '#E0F2FE',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#0284C7',
    },
    funcaoTexto: {
        fontSize: 12,
        color: '#0284C7',
        fontWeight: '500',
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

    // Modal Styles
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: '#FAFAFA',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingTop: 20,
        paddingHorizontal: 24,
        paddingBottom: 24,
        maxHeight: '90%',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#171717',
    },
    modalFormContainer: {
        gap: 16,
        marginBottom: 20,
    },
    formGroup: {
        gap: 8,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#171717',
    },
    input: {
        borderRadius: 9999,
        borderWidth: 1,
        borderColor: '#D4D4D4',
        color: '#171717',
        paddingHorizontal: 16,
        paddingVertical: 10,
        fontSize: 14,
    },
    funcaoInputContainer: {
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center',
    },
    funcaoInput: {
        flex: 1,
        borderRadius: 9999,
        borderWidth: 1,
        borderColor: '#D4D4D4',
        color: '#171717',
        paddingHorizontal: 16,
        paddingVertical: 10,
        fontSize: 14,
    },
    adicionarFuncaoButton: {
        backgroundColor: '#10B981',
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    funcoesAdicionadasContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginTop: 8,
    },
    funcaoAdicionadaBadge: {
        backgroundColor: '#10B981',
        flexDirection: 'row',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        alignItems: 'center',
        gap: 6,
    },
    funcaoAdicionadaTexto: {
        fontSize: 12,
        color: '#FAFAFA',
        fontWeight: '500',
    },
    removeFuncaoButton: {
        padding: 2,
    },
    modalButtonContainer: {
        flexDirection: 'row',
        gap: 12,
    },
    cancelarButton: {
        flex: 1,
        backgroundColor: '#A3A3A3',
        paddingVertical: 12,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cancelarButtonText: {
        color: '#FAFAFA',
        fontSize: 14,
        fontWeight: '600',
    },
    cadastrarButton: {
        flex: 1,
        backgroundColor: '#0284C7',
        paddingVertical: 12,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cadastrarButtonText: {
        color: '#FAFAFA',
        fontSize: 14,
        fontWeight: '600',
    },
});

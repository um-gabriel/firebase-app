import React from 'react';
import { Modal, View, Text, Button, StyleSheet } from 'react-native';

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  selectedItem: { nome: string; empresa: string; salario: number; descricaoVaga: string } | null;
}

const MyModal: React.FC<ModalProps> = ({ visible, onClose, selectedItem }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {selectedItem && (
            <>
              <Text style={styles.modalTitle}>Detalhes da Vaga</Text>
              <Text style={styles.modalText}>Nome: {selectedItem.nome}</Text>
              <Text style={styles.modalText}>Empresa: {selectedItem.empresa}</Text>
              <Text style={styles.modalText}>Salário: R${selectedItem.salario}</Text>
              <Text style={[styles.modalText, {fontWeight: 'bold'}]}>Sobre a Vaga:</Text>
              <Text style={styles.modalText}>{selectedItem.descricaoVaga}</Text>
            </>
          )}
          <Button title="Fechar Modal" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo escurecido
  },
  modalContent: {
    width: '100%',
    height: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    // alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default MyModal;

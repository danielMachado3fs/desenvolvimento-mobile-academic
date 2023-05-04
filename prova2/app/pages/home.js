import React, { useState } from "react";
// import RNPickerSelect from "react-native-picker-select";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { TextInputMask } from "react-native-masked-text";
import ModalSelector from 'react-native-modal-selector';
import { formatCurrency } from "../utils/formatCurrency";

//Produtos do select
const produtos = [
  { key: "", section: true, label: "Produtos" },
  {
    key: "bicicleta",
    label: "Bicicleta",
    preco: 1000.0,
  },
  {
    key: "notebook",
    label: "Notebook",
    preco: 7000.99,
  },
  {
    key: "televisao",
    label: "Televisao",
    preco: 3500.3,
  },
  {
    key: "ps5",
    label: "PS5",
    preco: 4399.99,
  },
];

export function Home() {

  //Componente para deixar a letra em negrito
  const B = (props) => (
    <Text style={{ fontWeight: "bold" }}>{props.children}</Text>
  );

  //hooks utilizados nos campos
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("0");
  const [quantidade, setQuantidade] = useState("");
  const [total, setTotal] = useState(0);
  const [viewCard, setViewCard] = useState(false);

  //Função para setar o valor da quantidade e fechar o card toda vez que alterar o campo "Quantidade"
  const changeQtd = (qtd) => {
    if (viewCard) setViewCard(false);
    setQuantidade(qtd);
  };

  //Função para setar os valores nas variaveis nome e preco de acordo com o produto selecionado
  const produtosChange = (item) => {
    if (viewCard) setViewCard(false);
    let produtoSelecionado = produtos.find((produto) => {
      return produto.key == item.key;
    });
    setNome(produtoSelecionado.label);
    setPreco(produtoSelecionado.preco);
  };

  //Função para calcular o valor da compra
  const calcularValorCompra = () => {
    const total = parseFloat(preco) * parseFloat(quantidade);
    setTotal(total.toFixed(2));
    setViewCard(true);
  };

  return (
    <View style={styles.container}>
      <Image
        resizeMode="center"
        source={require(`../assets/avatar.png`)}
        style={styles.ava}
      />
      {/* <RNPickerSelect
        placeholder={{
          label: 'Selecione um produto...',
          value: null
        }}
        style={pickerStyle}
        onValueChange={(item) => produtosChange(item)}
        items={produtos}
      /> */}

      {/* Seletor de produtos */}
      <ModalSelector
        data={produtos}
        initValue="Selecione um produto..."
        supportedOrientations={["landscape", "portrait"]}
        cancelText="Cancelar"
        onChange={(option) => {
          produtosChange(option);
        }}
        style={{width:'100%'}}
      >
        <TextInput
          style={styles.inputText}
          editable={false}
          placeholder="Selecione um produto..."
          value={nome}
        />
      </ModalSelector>

      <TextInputMask
        editable={false}
        style={styles.inputText}
        type={"money"}
        options={{
          precision: 2,
          separator: ",",
          delimiter: ".",
          unit: "R$",
          suffixUnit: "",
        }}
        value={preco}
        onChangeText={(text) => {
          setPreco(text);
        }}
      />
      <TextInput
        keyboardType="numeric"
        style={styles.inputText}
        value={quantidade}
        placeholder="Quantidade"
        onChangeText={(text) => {
          changeQtd(text);
        }}
      />
      <TouchableOpacity style={styles.button} onPress={calcularValorCompra}>
        <Text style={styles.textButton}>Confimar pagamento</Text>
      </TouchableOpacity>
      {viewCard ? (
        <View style={styles.card}>
          <Text style={styles.textCard}>
            <B>Produto:</B> {nome}
          </Text>
          <Text style={styles.textCard}>
            <B>Preço unitário:</B> {formatCurrency(preco)}
          </Text>
          <Text style={styles.textCard}>
            <B>Quantidade:</B> {quantidade} unidades
          </Text>
          <Text style={styles.textCard}>
            <B>Total:</B> {formatCurrency(total)}
          </Text>
        </View>
      ) : (
        <></>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  ava: {
    height: 150,
    width: 150,
    margin: 40,
    borderRadius: 10,
  },
  inputText: {
    backgroundColor: "#fff",
    width: "100%",
    marginTop: 10,
    height: 50,
    padding: 10,
  },
  button: {
    backgroundColor: "#1690f8",
    padding: 15,
    borderRadius: 10,
    margin: 20,
    width: "80%",
    height: 50,
    alignItems: "center",
  },
  textButton: {
    fontSize: 18,
    color: "#fff",
  },
  card: {
    marginTop: 20,
    alignItems: "flex-start",
    justifyContent: "center",
    width: "80%",
    height: "auto",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
  },
  textCard: {
    fontSize: 20,
  },
});

import React, {useState} from 'react';
import { View, StyleSheet, StatusBar, SafeAreaView, Image, Text, TouchableOpacity } from 'react-native';

let timer = null;
let segundos = 0;
let minutos = 0;
let horas = 0;

export default function App() {
  const[numero,setNumero] = useState(0);
  const[botao,setBotao] = useState('Iniciar');
  const[Ultimo,setUltimo] = useState(null);

  function iniciar(){
    if(timer !== null){
      clearInterval(timer);
      timer = null;
      setBotao('Iniciar');
    }else{
      timer = setInterval(() => {
        segundos++;
        
        if (segundos >= 60) {
            segundos = 0;
            minutos++;
        }

        if(minutos >= 60){
          minutos = 0;
          horas++;
        }

        let formatado = (horas < 10? '0' + horas : horas) + ':' 
        + (minutos < 10? '0' + minutos : minutos ) + ':' 
        + (segundos < 10? '0' + segundos : segundos);
        setNumero(formatado);
      },100);
      setBotao('Parar');
    }
  }

  function zerar(){
    clearInterval(timer);
    timer = null;
    setUltimo(numero);
    setNumero(0);
    segundos = 0;
    minutos = 0;
    horas = 0;
    setBotao('Iniciar');
    console.log(Ultimo);
  }


  return (
   <SafeAreaView style={styles.container}>
      <StatusBar  style= "auto"/>
   
      <Image
      source={require('./src/Images/crono.png')}
      style={styles.img}
      />

      <Text style={styles.texto}>
        {numero == 0? '00:00:00' : numero}
      </Text>

      <View style={styles.areaBtn}>
        <TouchableOpacity style={styles.btn} onPress={ iniciar }>
          <Text style={styles.btnText}>
              {botao}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={ zerar }>
          <Text style={styles.btnText}>
              Zerar
          </Text>

        </TouchableOpacity>

      </View>

      <Text style={styles.tempoMedido}>
        {Ultimo !== null? 'Ultimo tempo medido: ' + Ultimo : null}
      </Text>
   
   </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00aeef',
    alignItems: 'center',
    justifyContent: 'center',
  },
  img:{
    width:400,
    height:400,
    resizeMode: 'contain'
  },
  texto:{
    fontSize: 45,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: -185
  },
  areaBtn:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 155
  },
  btn:{
    height: 45,
    width: '40%',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  btnText:{
    fontSize: 20,
    fontWeight: 'bold'
  },
  tempoMedido:{
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 15
  }
});

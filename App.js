import React, {useState} from 'react';
import { View, StyleSheet, StatusBar, SafeAreaView, Image, Text, TouchableOpacity } from 'react-native';

let timer = null;
let segundos = 0;
let minutos = 0;
let horas = 0;


export default function App() {
  const [number, setNumber] = useState(0)
  const [button, setButton] = useState('Start')
  const [last, setLast] = useState(null)

  function start(){
    if(timer !== null){
      clearInterval(timer)
      timer = null
      setButton('Start')
  } else {
    timer = setInterval(() => {
      segundos++
      if(segundos == 60){
        segundos = 0
        minutos++
      }
      if(minutos == 60){
        minutos = 0
        horas++
      }
      let format = (horas < 10 ? '0' + horas : horas) + ':' + (minutos < 10 ? '0' + minutos : minutos) + ':' + (segundos < 10 ? '0' + segundos : segundos)
      setNumber(format)
    }, 1000)
    setButton('Stop')

  }
}

function reset(){
  if(timer !== null){
    clearInterval(timer)
    timer = null
  }
  setLast(number)
  setNumber(0)
  segundos = 0
  minutos = 0
  horas = 0
  setButton('Start')
}

 return (
   <SafeAreaView style={styles.container}>
      <StatusBar  style= "auto"/>
   
      <Image
      source={require('./src/Images/crono.png')}
      style={styles.img}
      />

      <Text style={styles.texto}>
        {number == 0 ? last : number}
      </Text>

      <View style={styles.areaBtn}>
        <TouchableOpacity style={styles.btn} onPress={}>
          <Text style={styles.btnText}>
            {button}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnText}>
              {reset}
          </Text>

        </TouchableOpacity>

      </View>

      <Text style={styles.tempoMedido}>
        Last measured time: 02:50:45
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

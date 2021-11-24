import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Modal, Alert, Pressable, Button } from 'react-native';
import { getAudio, getDictionaryEntry } from '../utils/dictionary';
import { Audio } from 'expo-av';

export default function Word(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [sound, setSound] = useState();
  const [index, setIndex] = useState(0);
  const definition = props.definition;
  const setDefinition = props.setDefinition;

  const sanitize = text => text.replace(/[^a-zA-Z]+/g, '');
  const lower = text => text.toLowerCase();
  const compose = (f, g) => (x) => f(g(x));
  const s = compose(lower, sanitize);

  async function playSound() {
    //console.log('Loading sound...');
    let url = undefined;
    if (s(props.word).length > 0) {
      try {
        url = await getAudio(s(props.word));
      } catch {
        url = undefined;
      }
    }
    if (url === undefined) {
      return;
    }

    //'https://media.merriam-webster.com/audio/prons/en/us/mp3/l/lettuc01.mp3'
	console.log(url);
    const { sound } = await Audio.Sound.createAsync(
      { uri: url }
    );
    setSound(sound);
    await sound.playAsync();
  }

  useEffect(() => {
    return sound ? () => {
      //console.log('Unloading sound...');
      sound.unloadAsync();
    } : undefined;
  }, [sound]);

  useEffect(() => {
    if (modalVisible && !(s(props.word) in definition)) {
      getDictionaryEntry(s(props.word))
        .then(def => {
          //console.log(JSON.stringify(def[0].shortdef, null, 2));
          try {
            const defText = def[0].shortdef[0];
            setDefinition({ ...definition, [s(props.word)]: defText });
          } catch {
            setDefinition({ ...definition, [s(props.word)]: "No definition found."});
          }
        });
    }
  }, [modalVisible]);

  useEffect(() => {
    getDictionaryEntry(s(props.word))
        .then(def => {
          try {
            const defText = def[index].shortdef[0];
            setDefinition({ ...definition, [s(props.word)]: defText });
          } catch {
            setIndex(0);
          }
        })
        .catch(e => {
          setIndex(0);
        });
  }, [index]);
  
  if (props.word === '\n')
    return (
      <View style={[styles.centeredView, {flexBasis: "100%"}]}>
        <Text></Text>
      </View>
    );

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              { s(props.word) }
              { "\n" }
              { s(props.word) in definition ? definition[s(props.word)] : "Loading..." }
            </Text>
            <View style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-evenly"
            }}>
              <Button title="Close"
                      style={[styles.button, styles.buttonClose]}
                      onPress={() => setModalVisible(!modalVisible)}/>
              <Button title="Next"
                      onPress={() => {
                        setIndex(index + 1);
                      }}/>
            </View>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.view, styles.buttonOpen]}
        onPress={() => {setModalVisible(true); playSound();}}
      >
        <Text style={[styles.text, (modalVisible ? styles.highlight : null)]}>{props.word}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    //borderColor: "black",
    //borderWidth: 3,
    margin: 0,
  },
  text: {
    backgroundColor: "white",
    padding: 5,
    width: "auto",
    color: "black",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    //borderStyle: "solid",
  },
  highlight: {
    backgroundColor: "pink",
  },

  // Popup styling below
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  textStyle: {
    color: "white"
  }
});

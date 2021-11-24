import React, { useState, useEffect } from 'react';
import {
    View,
    StatusBar,
    Text,
    TouchableOpacity,
    StyleSheet,
    TouchableHighlight,
    Modal,
    Alert,
    Image, Button
} from 'react-native';
import { Dimensions } from 'react-native';
import Page from './Page';
import { DeviceMotion } from "expo-sensors";

export default function BookScreen({ route, navigation }) {
    const book = route.params.book;
    const[page, setPage] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    
    const isPortrait = () => {
        const dim = Dimensions.get("screen");
        return dim.height >= dim.width;
    }

    const [orientation, setOrientation] = useState(isPortrait());

    useEffect(() => {
      const updateOrientation = res => {
        const degrees = res.orientation;
        if (degrees === 0 || degrees === 180) {
          // Portrait
          setOrientation(true);
        } else {
          // Landscape
          setOrientation(false);
        }
      };
  
      DeviceMotion.isAvailableAsync().then(available => {
          if (available) {
            DeviceMotion.addListener(updateOrientation);
          }
      });
    });

    return (
    <View style={{
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: 'column'
    }}>
        <View style={{
            flex: 1,
            backgroundColor: "#fff",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: (orientation ? 'column' : 'row'),
        }}
        >
            <StatusBar style="auto" />

            <Page
                orientation={ orientation }
                image={ book.pages[page].image }
                text={ book.pages[page].text }
            />
        </View>

        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            useNativeDriver ={true}
            onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
            }}
        >


            <View >
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>
                        Title:{" "+book.title}
                    </Text>
                    <Text style={styles.modalText}>
                        Author:{" "+book.author}
                    </Text>

                    <Image
                        style={{
                            maxWidth: '100%',
                            height:'50%',
                            aspectRatio: 1,
                        }}
                        source={ book.titleImage }
                    />
                    <Text style={styles.modalText}>
                        Pages:{" "+book.numPages}
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

                    </View>
                </View>
            </View>
        </Modal>

        <View style = {{
            flex:(orientation ? .1 : .22),
            height:"10%",
            alignItems: "center",
            flexDirection: 'row',
            justifyContent: 'space-evenly'
        }}>
            <View style={styles.bottomTab}>
                <TouchableHighlight
                    activeOpacity={0.9}
                    underlayColor="#555555"
                    style = {{alignSelf: 'stretch'}}
                    onPress={() => {
                        if(page-1>=0)setPage(page-1)
                    }}
                >
                    <Text style = {styles.bottomTabText}>{"<"}</Text>
                </TouchableHighlight>
            </View>


            <View style={styles.bottomTab}>
                <TouchableHighlight
                    height ="100%"
                    activeOpacity={1}
                    underlayColor="#555555"
                    style = {{alignSelf: 'stretch'}}
                    onPress={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    <Text style = {styles.bottomTabText}>{"Page "+(page+1)}</Text>
                </TouchableHighlight>
            </View>

            <View style={styles.bottomTab}>
                <TouchableHighlight
                    activeOpacity={1}
                    underlayColor="#555555"
                    style = {{alignSelf: 'stretch'}}
                    onPress={() => {
                        if(page+1<book.numPages)setPage(page+1)
                    }}
                >
                    <Text style = {styles.bottomTabText}>{">"}</Text>
                </TouchableHighlight>
            </View>

        </View>
    </View>
    );
}

const styles = StyleSheet.create({
    bottomTab: {
        alignItems: "center",
        backgroundColor: "gray",
        flex: 1,
    },
    bottomTabText: {
        padding: 15,
        width: "auto",
        color: "white",
        fontWeight: "bold",
        fontSize: 20,
        textAlign: "center",
        height:"100%"

    },
    bottomTabButton:{
        alignSelf: 'stretch',

    },

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
    modalText: {
        marginBottom: 15,
        textAlign: "center"
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
});
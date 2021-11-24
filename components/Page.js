import React, {useEffect, useState} from 'react';
import { ScrollView, SafeAreaView, View, Image, StyleSheet } from 'react-native';
import Word from "./Word";
import {LinearGradient} from "expo-linear-gradient";

let scrollRef = null;
export default function Page(props) {
    const [definition, setDefinition] = useState({});

    useEffect(() => {
        if(scrollRef!=null){
            scrollRef.scrollTo({ animated: false, x: 0, y: 0 });

        }
    }, [props])
    let wordComps = [];

    //useEffect(() => {console.log(JSON.stringify(definition))}, [definition]);

    props.text.split('\n').forEach((words, line) => {
        const w = words.split(' ');
        wordComps = wordComps.concat(
            w.map((word, index) =>
                <Word definition={definition}
                      setDefinition={setDefinition}
                      word={word}
                      key={10000 * line + index} />)
        );
        wordComps.push(<Word word={"\n"}
                             key={10000 * line + w.length} />);
    });

    return (
        <View style={{

            alignItems: "center",
            justifyContent: "center",
            height: '95%',
            width: '95%',
            flexDirection: (props.orientation ? 'column' : 'row'),

          }}
        >

            <Image
                style={{
                    maxHeight: (props.orientation ? '50%' : '100%'),
                    width: (props.orientation ? '100%': '50%'),
                    aspectRatio:1,
                    resizeMode: "center"
                }}
                source={ props.image }
            />


            <SafeAreaView style={{

                justifyContent: "center",
                alignItems: "center",
                height: (props.orientation ? '50%' :'100%'),
                width: (props.orientation ? '100%': '50%'),

            }}>
                { !props.orientation ?
                    <View style={{
                        width: "100%"
                    }}>

                            <ScrollView
                                ref={ref =>  scrollRef = ref}
                                showsVerticalScrollIndicator={true}
                                persistentScrollbar={true}
                                contentContainerStyle={{
                                    width: "100%",
                                    display: "flex",
                                    flexWrap: "wrap",
                                    flexDirection: "row",
                                    padding: 10,
                                    justifyContent: "center",
                                }}

                            >


                                { wordComps }
                            </ScrollView>

                    </View>
                    :
                    <ScrollView
                        ref={ref =>  scrollRef = ref}
                        showsVerticalScrollIndicator={true}
                        persistentScrollbar={true}
                        contentContainerStyle={{
                            width: "100%",
                            display: "flex",
                            flexWrap: "wrap",
                            flexDirection: "row",
                            justifyContent: "center",
                        }}
                    >
                    { wordComps }
                    </ScrollView>
                }
                
            </SafeAreaView>

        </View>
    );
}

const styles = StyleSheet.create({

    background: {
        width:"100%",
        height: "10%",
    }
});
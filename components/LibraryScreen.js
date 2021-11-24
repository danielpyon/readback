import React from 'react';
import { ScrollView, Pressable, Text, Image } from 'react-native';
import { books } from '../books/books';
import { Dimensions } from 'react-native';

export default function LibraryScreen({ navigation }) {
    const dim = Dimensions.get("screen");
    return (
        <ScrollView contentContainerStyle={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
        }}>
            {
                books.map((book, index) => (
                    <Pressable
                        onPress={() => navigation.navigate("Book", { book: book }) }
                        key={ index }
                        style={{
                            width: ( dim.width - 20 * 4 ) / 2,
                            margin: 20,
                        }}
                    >
                        <Image
                            style={{
                                width: '100%',
                                height: undefined,
                                aspectRatio: 1,
                            }}
                            source={ book.titleImage }
                        />
                        <Text style={{
                            marginTop: 10,
                        }}>{ book.title }</Text>
                    </Pressable>
                ))
            }
        </ScrollView>
    );
}
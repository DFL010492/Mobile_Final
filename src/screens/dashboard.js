import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, FlatList, Image, TouchableOpacity, ActivityIndicator, StyleSheet, Animated, Easing } from 'react-native';
import useSuperheroApi from '../hooks/useSuperheroApi';

export default function DashboardScreen({ navigation }) {
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
  const { data, loading, error } = useSuperheroApi(query);

  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (loading) {
      Animated.loop(
        Animated.timing(spinValue, {
          toValue: 1,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();
    } else {
      spinValue.stopAnimation();
    }
  }, [loading]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const handleSearch = () => {
    if (search.trim()) {
      setQuery(search.trim());
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('Details', { hero: item })}
      style={styles.card}
    >
      <Image source={{ uri: item.image.url }} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.tittle}>BatDataBase</Text>
      <TextInput
        placeholder="Digite o nome do herói"
        value={search}
        onChangeText={setSearch}
        onSubmitEditing={handleSearch}
        style={styles.input}
      />
      {loading && (
        <Animated.Image
          source={require('../../assets/imagens/bat-logo.png')}
          style={[styles.spinner, { transform: [{ rotate: spin }] }]}
        />
      )}
      {error && <Text style={{ color: 'red' }}>{error}</Text>}
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '90%',
    width: '100%',
    padding: 20,
    backgroundColor: "green",
  },
  input: {
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    backgroundColor: '#f8f8f8',
    padding: 10,
    borderRadius: 8,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10
  },
  name: {
    fontSize: 18
  },
  tittle: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
    textAlign: 'center',
  },
  spinner: {
    width: 100,
    height: 60,
    alignSelf: 'center',
    marginVertical: 20,
  },
});

import React, { useState, useEffect } from 'react';
import { Text, View, Button, Image, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
const DogApp = () => {
  const [dogImageUrl, setDogImageUrl] = useState('');
  const [error, setError] = useState(null);

  const fetchRandomDogImage = async () => {
    try {
      const response = await fetch('https://dog.ceo/api/breeds/image/random');
      if (!response.ok) {
        throw new Error('Failed to fetch');
      }
      const data = await response.json();
      setDogImageUrl(data.message);
      setError(null);
    } catch (error) {
      console.error('Error fetching random dog image:', error);
      setError(error);
    }
  };

  useEffect(() => {
    fetchRandomDogImage();
  }, []);
  optionsImage = {
    selectionLimit: 1,
    mediaType: 'photo',
  };
  const openGallery = () => {
    launchImageLibrary(optionsImage, (response) => {
      if (response.didCancel) {
        console.log('El usuario canceló la selección de la imagen');
      } else if (response.errorCode) {
        console.log('Error de ImagePicker:', response.errorMessage);
      } else {
        const source = response.assets[0].uri;
        // Aquí puedes usar el URI de la imagen, por ejemplo, para mostrarla en la UI o subirla a un servidor
        console.log(source);
      }
    });
  };
  


  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Dog App! 🐶</Text>
      <Image source={{ uri: dogImageUrl }} style={styles.image} />
      <TouchableOpacity style={styles.button} onPress={fetchRandomDogImage}>
        <Text style={styles.dogText}>Random Image 🐕</Text>
      </TouchableOpacity>
      {error && <Text>{error.message}</Text>}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <TouchableOpacity style={styles.button} onPress={openGallery}>
          <Text style={styles.dogText}>Cargar PerroImagen 🐕 🦴</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={error}>
          <Text style={styles.dogText}>Eliminar Imagen 🐶</Text>  
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#5ed6ec',
    paddingTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 20,
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#1badd8',
    width: 250,
    height: 40,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  dogText: {
    color: '#fff',
    fontSize: 20,
    
  },
});

export default DogApp;
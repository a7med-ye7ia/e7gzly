import { View, Text, ScrollView, TextInput, TouchableOpacity, Switch } from "react-native"
import { useLocalSearchParams, useRouter } from "expo-router"
import { useState } from "react";

import stylesAuth from "../../styles/stylesAuth";
import stylePages from "../../styles/stylePages";

import { updateDocument, deleteDocument, addDocument} from "../../services/uploads";



export default function ProductInfo() {
  const router = useRouter()
  const params = useLocalSearchParams()

  const interests = params.interests ? JSON.parse(params.interests) : []

  const [name, setName] = useState(params.name)
  const [location, setLocation] = useState(params.location)
  const [image, setImage] = useState(params.image)
  const [featured, setFeatured] = useState(params.featured)
  const [rating, setRating] = useState(params.rating)
  const [price, setPrice] = useState(params.price)
  const [neww, setNeww] = useState(params.new)


  const handleSave = () => {
    const updates = {
      name: name,
      location: location,
      image: image,
      featured: featured,
      rating: rating || 5,
      price: price,
      new: neww || true, // ! update this when the search page is done
    }

    try{
      if (params.id) {
        updateDocument(params.id, 'flights-destinations', updates)
      } else {
        addDocument(updates, 'flights-destinations')
      }
    } catch (error){
      console.log(console.error);
    }
  }

  const handleDelete = () => {
    try{
      deleteDocument(params.id, 'flights-destinations');
    } catch(error) {
      console.log(error)
    }
    router.back();
  }

  return (
    <ScrollView style={stylesAuth.containerSigUp}>
      <Text style={stylesAuth.title}>Edit flight</Text>

      <View style={stylesAuth.inputContainer}>
        <Text style={stylesAuth.label}>Name</Text>
        <TextInput
          style={stylesAuth.input}
          placeholder='Enter a name'
          value={name}
          onChangeText={setName}
        />
      </View>

      <View style={stylesAuth.inputContainer}>
        <Text style={stylesAuth.label}>Location</Text>
        <TextInput
          style={stylesAuth.input}
          placeholder='Enter the location'
          value={location}
          onChangeText={setLocation}
        />
      </View>

      <View style={stylesAuth.inputContainer}>
        <Text style={stylesAuth.label}>Image</Text>
        <TextInput
          style={stylesAuth.input}
          placeholder='Enter an image'
          value={image}
          onChangeText={setImage}
        />
      </View>

      <View style={stylesAuth.inputContainer}>
        <Text style={stylesAuth.label}>price</Text>
        <TextInput
          style={stylesAuth.input}
          placeholder='Enter the price'
          value={price}
          onChangeText={setPrice}
        />
      </View>

      <Switch
        trackColor={{ false: "red", true: "green" }}
        thumbColor={featured ? "#007AFF" : "#f4f3f4"}
        onValueChange={() => setFeatured(!featured)}
        value={featured}
      />
      
      <Switch
      trackColor={{ false: "red", true: "green" }}
      thumbColor={neww ? "#007AFF" : "#f4f3f4"}
      onValueChange={() => setNeww(!neww)}
      value={neww}
    />

      <TouchableOpacity style={stylePages.editButton} onPress={handleSave}>
        <Text style={stylePages.editButtonText}>{params.id ? 'update' : 'save'}</Text>
      </TouchableOpacity>

      {params.id && <TouchableOpacity style={[stylePages.editButton, {backgroundColor: "red", marginTop: '10'}]} onPress={handleDelete}>
        <Text style={stylePages.editButtonText}>delete</Text>
      </TouchableOpacity>}
    </ScrollView>
  )
}
import { View, Text, ScrollView, TextInput, TouchableOpacity, Switch, Image } from "react-native"
import { useLocalSearchParams, useRouter } from "expo-router"
import { useState } from "react";
import { Ionicons } from '@expo/vector-icons';

import stylesAuth from "../../styles/stylesAuth";
import stylePages from "../../styles/stylePages";

import { addFlight, deleteFlight, updateFlight, getFlightById } from "../../services/flightService";
import { deleteImage, pickImage } from "../../hooks/imagePiker2";
import { uploadImage } from "../../upload/uploads";


export default function ProductInfo() {
  const router = useRouter()
  const params = useLocalSearchParams()

  const interests = params.interests ? JSON.parse(params.interests) : []

  // data use cases
  const [name, setName] = useState(params.name)
  const [location, setLocation] = useState(params.location)
  const [featured, setFeatured] = useState(params.featured || false)
  const [rating, setRating] = useState(params.rating)
  const [price, setPrice] = useState(params.price)
  const [neww, setNeww] = useState(params.new)
  
  // image use cases
  const [image, setImage] = useState(params.image)
  const [imageFile, setImageFile] = useState(null)
  const [isImageUpdated, setIsImageUpdated] = useState(false)

  // loading use cases
  const [isUploading, setIsUploading] = useState(false)


  const handleSave = async () => {
    console.log("updates is uploading, please wait...");
   
    setIsUploading(true);
    let uploadResult = {}
    if (isImageUpdated) {
      uploadResult = await uploadImage(imageFile);
    }

    if (uploadResult.success) {
      console.log("Image uploaded successfully");
      setImage(uploadResult.data.url);
    } else { 
      console.log("Image upload failed, error message: ", uploadResult.err.message);
    }
    

    const updates = {
      name: name,
      location: location,
      image: image,
      featured: featured,
      rating: rating || 0,
      price: price,
      new: neww || true, // ! update this when the search page is done
    }

    if (params.id) {
      const { success, id, error } = await updateFlight(params.id, updates)
      if (success) {
        console.log("Document updated with ID: ", id);
      }
      else {
        console.log(error)
      }
    }
    else {
      const { success, id, error } = await addFlight(updates)
      if (success) {
        console.log("Document written with ID: ", id);
      }
      else {
        console.log(error)
      }
    }

    setIsUploading(false);
    router.back();
  }
  const handleDelete =  async () => {
    const data = await getFlightById(params.id);
    const imageUrl = data.image;
    const { success, error } = await deleteFlight(params.id);

    if (success) {
      console.log("Document deleted successfully");
    }
    else {
      console.log(error)
    }
    router.back();
  }

  const getImage = async () => {
    setIsImageUpdated(true);
    const result = await pickImage();
    if (result.success) {
      setImageFile(result.file);
      console.log("Image selected successfully");
    } else {
      console.log("Image selection failed", error);
    }
  }

  const handleUpload = async () => {
    setIsUploading(true);
    const imageUrl = await uploadImage();
    setIsUploading(false);
    setImage(imageUrl);
  }

  return (

      <ScrollView
          style={stylesAuth.containerSigUp}
          contentContainerStyle={{ paddingBottom: 80 }}
      >

      <Text style={stylesAuth.title}>{params.id ? "Edit flight" : "Add flight"}</Text>

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
        <Text style={stylesAuth.label}>price</Text>
        <TextInput
          style={stylesAuth.input}
          placeholder='Enter the price'
          value={price}
          onChangeText={setPrice}
        />
      </View>

      <View style={stylePages.switchContainer}>
        <Text style={stylesAuth.label}>
          Set as a featured flight:
        </Text>
        
        <Switch
        value={featured}
        onValueChange={() => setFeatured(!featured)}
        trackColor={{ false: '#9f9d9d', true: '#766bbd' }}
        thumbColor={featured ? '#5D50C6' : '#4c4c4e'}
      />
      </View>

      <View style={stylePages.switchContainer}>
        <Text style={stylesAuth.label}>
          Set as a new flight:
        </Text>
        
        <Switch
        value={neww}
        onValueChange={() => setNeww(!neww)}
        trackColor={{ false: '#9f9d9d', true: '#857cbf' }}
        thumbColor={neww ? '#5D50C6' : '#4c4c4e'}
      />
      </View>

      <TouchableOpacity onPress={() => getImage()}> 
        <View style={{flex:1, justifyContent: 'center', alignItems: 'center', marginVertical: 10, width: '100%', height: image ? 'auto' : 200, backgroundColor: '#eeeee4'}}>
          {image ? <Image source={{ uri: image }} style={stylePages.mainImage} resizeMode="cover" />
                 : isImageUpdated ? <Image source={{ uri: image }} style={stylePages.mainImage} resizeMode="cover" /> 
                                 : <Ionicons name="add" size={40} color={'grey'} />}
        </View>    
      </TouchableOpacity>

      {/* <View style={stylePages.section}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={stylePages.photosScroll}>
          {photos.map((photo, index) => (
            <Image key={index} source={{ uri: photo }} style={stylePages.thumbnail} resizeMode="cover" />
          ))}
        </ScrollView>
      </View> */}
      
      <TouchableOpacity style={[stylePages.editButton]} onPress={handleSave}>
        <Text style={stylePages.editButtonText}>{params.id ? 'update' : 'save'}</Text>
      </TouchableOpacity>

      {params.id && (<TouchableOpacity style={[stylePages.editButton, { backgroundColor: "red", marginTop: '10' }]} onPress={handleDelete}>
        <Text style={stylePages.editButtonText}>delete</Text>
      </TouchableOpacity>)}
      </ScrollView>
  )
}
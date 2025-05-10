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

  // const interests = params.interests ? JSON.parse(params.interests) : []

  // data use cases
  const [cityFromCode, setCityFromCode] = useState(params.cityFromCode || "");
  const [cityFromName, setCityFromName] = useState(params.cityFromName || "");
  const [flightTime, setFlightTime] = useState(params.flightTime || "");
  const [cityToCode, setCityToCode] = useState(params.cityToCode || "");
  const [cityToName, setCityToName] = useState(params.cityToName || "");
  const [arrivalTime, setArrivalTime] = useState(params.arrivalTime || "");
  const [flightDuration, setFlightDuration] = useState(params.flightDuration || "");
  const [airLine, setAirLine] = useState(params.airLine || "");
  const [flightClass, setFlightClass] = useState(params.class || "");
  const [price, setPrice] = useState(params.price)
  const [neww, setNeww] = useState(params.new)
  const [featured, setFeatured] = useState(params.featured || false)
  const [about, setAbout] = useState(params.about || "");
  const [photos, setPhotos] = useState(params.photos || []);
  const [interests, setInterests] = useState(params.interests || []);
  const [rating, setRating] = useState(params.rating || 0)

  // image useCases
  const [images, setImages] = useState(params.photos ? params.photos : []) // we will use this to show the updated data till upload finish
  const [imageFiles, setImageFiles] = useState([]) // we will use this to save the files need to upload
  const [isImageUpdated, setIsImageUpdated] = useState([false, false, false, false]) // to know if images updated

  // for animation
  const [isUploading, setIsUploading] = useState(false)

  const handleSave = async () => {
    console.log("updates is uploading, please wait...");
   
    setIsUploading(true);
    let uploadResult = []
    
    if (isImageUpdated[0]) {
      console.log("Image[0] is updated");
      const temp = await uploadImage(imageFiles[0]);
      if(temp.success) {
        uploadResult[0] = temp.url;
        console.log("Image[0] uploaded successfully");
      } else {
        console.log("Image[0] upload failed, error message: ", uploadResult[0].error);
        uploadResult[0] = photos.url;
      }
    }
    if (isImageUpdated[1]) {
      console.log("Image[0] is updated");
      const temp = await uploadImage(imageFiles[1]);
      if(temp.success) {
        uploadResult[1] = temp.url;
        console.log("Image[0] uploaded successfully");
      } else {
        console.log("Image[1] upload failed, error message: ", uploadResult[0].error);
        uploadResult[1] = photos.url;
      }
    }
    if (isImageUpdated[2]) {
      console.log("Image[0] is updated");
      const temp = await uploadImage(imageFiles[2]);
      if(temp.success) {
        uploadResult[2] = temp.url;
        console.log("Image[0] uploaded successfully");
      } else {
        console.log("Image[2] upload failed, error message: ", uploadResult[0].error);
        uploadResult[2] = photos.url;
      }
    }
    if (isImageUpdated[3]) {
      console.log("Image[0] is updated");
      const temp = await uploadImage(imageFiles[3]);
      if(temp.success) {
        uploadResult[3] = temp.url;
        console.log("Image[0] uploaded successfully");
      } else {
        console.log("Image[3] upload failed, error message: ", uploadResult[0].error);
        uploadResult[3] = photos.url;
      }
    }
    

    setPhotos(uploadResult);
    
    const updates = {
      cityFromCode,
      cityFromName,
      flightTime,
      cityToCode,
      cityToName,
      arrivalTime,
      flightDuration,
      airLine,
      flightClass,
      price,
      neww,
      featured,
      about,
      photos,
      interests,
      rating,
      new: neww,
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

  const getImage = async (index) => {
    setIsImageUpdated(true);
    const result = await pickImage();
    if (result.success) {
      const temp = [...imageFiles];
      temp[index] = result.file;
      setImageFiles(temp);

      const temp2 = [...isImageUpdated];
      temp2[index] = true;
      setIsImageUpdated(temp2);
      
      const temp3 = [...images];
      temp3[index] = result.file.uri;
      setImages(temp3);
      console.log("Image selected successfully");
    } else {
      console.log("Image selection failed", error);
    }
  }

  // const handleUpload = async () => {
  //   setIsUploading(true);
  //   const imageUrl = await uploadImage();
  //   setIsUploading(false);
  //   setImage(imageUrl);
  // }

  return (
    <ScrollView style={[stylesAuth.containerSigUp, { paddingBottom: 100 }]}>
      <Text style={stylesAuth.title}>
        {params.id ? "Edit Flight" : "Add Flight"}
      </Text>
  
      {/* FROM CITY */}
      <View style={stylesAuth.inputContainer}>
        <Text style={stylesAuth.label}>From (City Name)</Text>
        <TextInput
          style={stylesAuth.input}
          placeholder='e.g. Sao Paulo'
          value={cityFromName}
          onChangeText={setCityFromName}
        />
      </View>
  
      <View style={stylesAuth.inputContainer}>
        <Text style={stylesAuth.label}>From (Airport Code)</Text>
        <TextInput
          style={stylesAuth.input}
          placeholder='e.g. GRU'
          value={cityFromCode}
          onChangeText={setCityFromCode}
        />
      </View>
  
      {/* TO CITY */}
      <View style={stylesAuth.inputContainer}>
        <Text style={stylesAuth.label}>To (City Name)</Text>
        <TextInput
          style={stylesAuth.input}
          placeholder='e.g. Bangkok'
          value={cityToName}
          onChangeText={setCityToName}
        />
      </View>
  
      <View style={stylesAuth.inputContainer}>
        <Text style={stylesAuth.label}>To (Airport Code)</Text>
        <TextInput
          style={stylesAuth.input}
          placeholder='e.g. BKK'
          value={cityToCode}
          onChangeText={setCityToCode}
        />
      </View>
  
      {/* TIMES */}
      <View style={stylesAuth.inputContainer}>
        <Text style={stylesAuth.label}>Flight Time</Text>
        <TextInput
          style={stylesAuth.input}
          placeholder='e.g. 10:00 PM'
          value={flightTime}
          onChangeText={setFlightTime}
        />
      </View>
  
      <View style={stylesAuth.inputContainer}>
        <Text style={stylesAuth.label}>Arrival Time</Text>
        <TextInput
          style={stylesAuth.input}
          placeholder='e.g. 01:00 PM'
          value={arrivalTime}
          onChangeText={setArrivalTime}
        />
      </View>
  
      <View style={stylesAuth.inputContainer}>
        <Text style={stylesAuth.label}>Flight Duration</Text>
        <TextInput
          style={stylesAuth.input}
          placeholder='e.g. 18h 00m'
          value={flightDuration}
          onChangeText={setFlightDuration}
        />
      </View>
  
      {/* Airline & Class */}
      <View style={stylesAuth.inputContainer}>
        <Text style={stylesAuth.label}>Airline</Text>
        <TextInput
          style={stylesAuth.input}
          placeholder='e.g. Thai Airways'
          value={airLine}
          onChangeText={setAirLine}
        />
      </View>
  
      <View style={stylesAuth.inputContainer}>
        <Text style={stylesAuth.label}>Class</Text>
        <TextInput
          style={stylesAuth.input}
          placeholder='e.g. Economy Class'
          value={flightClass}
          onChangeText={setFlightClass}
        />
      </View>
  
      {/* Price */}
      <View style={stylesAuth.inputContainer}>
        <Text style={stylesAuth.label}>Price</Text>
        <TextInput
          style={stylesAuth.input}
          placeholder='e.g. IDR 13.000.000'
          value={price}
          onChangeText={setPrice}
        />
      </View>
  
      {/* Description */}
      <View style={stylesAuth.inputContainer}>
        <Text style={stylesAuth.label}>About</Text>
        <TextInput
          style={[stylesAuth.input, { height: 100 }]}
          placeholder='Flight description'
          multiline
          value={about}
          onChangeText={setAbout}
        />
      </View>
  
      {/* Switches */}
      <View style={stylePages.switchContainer}>
        <Text style={stylesAuth.label}>Set as Featured</Text>
        <Switch
          value={featured}
          onValueChange={() => setFeatured(!featured)}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={featured ? 'green' : 'red'}
        />
      </View>
  
      <View style={stylePages.switchContainer}>
        <Text style={stylesAuth.label}>Set as New</Text>
        <Switch
          value={neww}
          onValueChange={() => setNeww(!neww)}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={neww ? 'green' : 'red'}
        />
      </View>
  
      {/* Photos */}
      <TouchableOpacity onPress={() => getImage(0)}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginVertical: 10, width: '100%', height: images[0] ? 'auto' : 200, backgroundColor: '#eeeee4' }}>
          {images[0] ? (
            <Image source={{ uri: images[0] }} style={stylePages.mainImage} resizeMode="cover" />
          ) : (
            <Ionicons name="add" size={40} color={'grey'} />
          )}
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => getImage(1)}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginVertical: 10, width: '100%', height: images[1] ? 'auto' : 200, backgroundColor: '#eeeee4' }}>
          {images[1] ? (
            <Image source={{ uri: images[1] }} style={stylePages.mainImage} resizeMode="cover" />
          ) : (
            <Ionicons name="add" size={40} color={'grey'} />
          )}
        </View>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => getImage(2)}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginVertical: 10, width: '100%', height: images[2] ? 'auto' : 200, backgroundColor: '#eeeee4' }}>
          {images[2] ? (
            <Image source={{ uri: images[2] }} style={stylePages.mainImage} resizeMode="cover" />
          ) : (
            <Ionicons name="add" size={40} color={'grey'} />
          )}
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => getImage(3)}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginVertical: 10, width: '100%', height: images[3] ? 'auto' : 200, backgroundColor: '#eeeee4' }}>
          {images[3] ? (
            <Image source={{ uri: images[3] }} style={stylePages.mainImage} resizeMode="cover" />
          ) : (
            <Ionicons name="add" size={40} color={'grey'} />
          )}
        </View>
      </TouchableOpacity>
  
      {/* Save & Delete Buttons */}
      <TouchableOpacity style={stylePages.editButton} onPress={handleSave}>
        <Text style={stylePages.editButtonText}>{params.id ? 'Update' : 'Save'}</Text>
      </TouchableOpacity>
  
      {params.id && (
        <TouchableOpacity style={[stylePages.editButton, { backgroundColor: "red", marginTop: 10 }]} onPress={handleDelete}>
          <Text style={stylePages.editButtonText}>Delete</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );  
}
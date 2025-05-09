import { useState, useEffect } from "react";
import { Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function useProfileImagePicker() {
    const [profileImageUri, setProfileImageUri] = useState(null);

    useEffect(() => {
        const loadImage = async () => {
            const savedImage = await AsyncStorage.getItem("profileImage");
            if (savedImage) setProfileImageUri(savedImage);
        };
        loadImage();
    }, []);

    const openCamera = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
            Alert.alert("Permission required", "Camera access is needed.");
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            const uri = result.assets[0].uri;
            setProfileImageUri(uri);
            await AsyncStorage.setItem("profileImage", uri);
        }
    };

    const openGallery = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
            Alert.alert("Permission required", "Gallery access is needed.");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            const uri = result.assets[0].uri;
            setProfileImageUri(uri);
            await AsyncStorage.setItem("profileImage", uri);
        }
    };

    const showImagePickerOptions = () => {
        Alert.alert("Select Photo", "Choose image source", [
            { text: "Camera", onPress: openCamera },
            { text: "Gallery", onPress: openGallery },
            { text: "Cancel", style: "cancel" },
        ]);
    };

    return {
        profileImageUri,
        showImagePickerOptions,
    };
}

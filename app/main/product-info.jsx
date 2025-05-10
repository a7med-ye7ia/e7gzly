import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native"
import { useLocalSearchParams, useRouter } from "expo-router"
import { Ionicons } from "@expo/vector-icons"
import styles from '../../styles/stylePages';

export default function ProductInfo() {
  const router = useRouter()
  const params = useLocalSearchParams()
  const [cityFrom, cityTo] = [params.cityFromName, params.cityToName];
  const photoArray = params.photos.split(',')
  const photos = [
    photoArray[1],
    photoArray[2].replace("w=800", "w=801"),
    photoArray[3].replace("w=800", "w=802"),
  ]

  const handelDetailTraveler = () => {
    router.push({
      pathname: "/Book",
      params: {
        id: params.id,
        cityFromCode: params.cityFromCode,
        cityFromName: params.cityFromName,
        cityToCode: params.cityToCode,
        cityToName: params.cityToName,
        price: params.price,
      },
    })
  }

  return (
    <ScrollView style={styles.containerProduct}>
      <View style={styles.headerProduct}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <Image source={{ uri: photoArray[0] }} style={styles.mainImage} resizeMode="cover" />

      <View style={styles.infoContainer}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{params.cityToName}</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.rating}>4.8</Text>
          </View>
        </View>
        <Text style={styles.location}>Popular destination</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.description}>{params.about}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Photos</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.photosScroll}>
            {photos.map((photo, index) => (
              <Image key={index} source={{ uri: photo }} style={styles.thumbnail} resizeMode="cover" />
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Interests</Text>
          <View style={styles.interestsContainer}>
            {/* Interest items will be added here when available */}
          </View>
        </View>

        {!params.showOnly && <View style={styles.bookingContainer}>
          <View>
            <Text style={styles.priceLabel}>start from</Text>
            <Text style={styles.price}>IDR {params.price}</Text>
          </View>
          <TouchableOpacity style={styles.bookButton} onPress={handelDetailTraveler}>
            <Text style={styles.bookButtonText}>Book Now</Text>
          </TouchableOpacity>
        </View>}
      </View>
    </ScrollView>
  )
}
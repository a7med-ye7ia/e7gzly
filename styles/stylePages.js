import { StyleSheet  } from 'react-native';

export default StyleSheet.create({

// bookingStyle :
    containerBooking: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#f5f5f5",
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 15,
        padding: 30,
        marginLeft: 10,
        width: "95%",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 3,

    },
    icon: {
        marginBottom: 20,
    },

    message: {
        fontSize: 18,
        textAlign: "center",
        marginBottom: 15,
        color: "#555",
    },
    details: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 20,
        color: "#333",
    },
    subtext: {
        fontSize: 14,
        textAlign: "center",
        marginBottom: 30,
        color: "#777",
    },

// flightStyle :

    containerFlight: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 20,
    },
    headerFlight: {
        flexDirection: "row",
        justifyContent: "space-between",
        // alignItems: "flex-start",
        marginBottom: 20,
        marginTop: 20,
    },
    greeting: {
        fontSize: 18,
        color: "#333",
    },
    userName: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#1a1a2e",
        marginBottom: 2,
    },
    userEmail: {
        fontSize: 14,
        color: "#666",
        marginBottom: 5,
    },
    searchPrompt: {
        fontSize: 16,
        color: "#888",
        marginTop: 5,
    },
    signOutButton: {
        backgroundColor: "#FF3B30",
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: "center",
        alignItems: "center",
    },
    searchBar: {
        borderColor: "#9f9d9d",
        height: 40,
        borderWidth: 1,
        borderHeight: 5,
        borderRadius: 30,
        paddingLeft: 15,
        marginBottom: 20,
        fontSize: 16,
        width: '100%',
        alignSelf: 'center',
        backgroundColor: '#f0f0f0',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 3,


    },
    featuredContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 25,
    },
    featuredCard: {

        borderRadius: 16,
        overflow: "hidden",
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    featuredImage: {
        width: "100%",
        height: 150,
        borderRadius: 16,
    },
    ratingBadge: {
        position: "absolute",
        top: 10,
        right: 10,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    ratingText: {
        fontSize: 12,
        fontWeight: "bold",
        marginLeft: 3,
    },
    featuredInfo: {
        padding: 12,
    },
    destinationName: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
    },
    destinationLocation: {
        fontSize: 14,
        color: "#888",
        marginTop: 2,
    },
    sectionContainer: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#1a1a2e",
        marginBottom: 15,
    },
    newDestinationCard: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
        backgroundColor: "#fff",
        borderRadius: 16,
        overflow: "hidden",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    newDestinationImage: {
        width: 70,
        height: 70,
        borderRadius: 12,
        margin: 10,
    },
    newDestinationInfo: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingRight: 15,
    },
    newDestinationName: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
    },
    newDestinationLocation: {
        fontSize: 14,
        color: "#888",
    },
    newDestinationRating: {
        flexDirection: "row",
        alignItems: "center",
    },
    newDestinationRatingText: {
        fontSize: 14,
        fontWeight: "bold",
        marginLeft: 3,
    },

// indexStyle :

    containerIndex: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        width: "100%",
        height: "100%",
    },
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "space-between",
        paddingVertical: 40,
        paddingHorizontal: 20,
    },
    logoContainer: {
        alignItems: "center",
        marginTop: 20,
    },
    contentContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 30,
    },
    title: {
        fontSize: 36,
        fontWeight: "bold",
        color: "white",
        marginBottom: 16,
        textAlign: "center",
    },
    subtitle: {
        fontSize: 18,
        color: "white",
        lineHeight: 24,
        textAlign: "center",
        marginHorizontal: 20,
    },
    buttonContainer: {
        marginBottom: 30,
        gap: 12,
        alignItems: "center",
    },
    button: {
        backgroundColor: "#5C40CC",
        paddingVertical: 15,
        paddingHorizontal: 50,
        borderRadius: 10,
        alignItems: "center",
        width: "80%",
        justifyContent: "center",
    },
    buttonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "600",
        textAlign: "center",
    },
    secondaryButton: {
        backgroundColor: "transparent",
        paddingVertical: 15,
        paddingHorizontal: 50,
        borderRadius: 10,
        alignItems: "center",
        borderWidth: 1,
        borderColor: "white",
        width: "80%",
        justifyContent: "center",
    },
    secondaryButtonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "600",
        textAlign: "center",
    },
    //style product :
    containerProduct: {
        flex: 1,
        backgroundColor: "#fff",
    },
    headerProduct: {
        position: "absolute",
        top: 40,
        left: 20,
        zIndex: 10,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    mainImage: {
        width: "100%",
        height: 300,
    },
    infoContainer: {
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: -20,
        backgroundColor: "#fff",
    },
    titleRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 5,
    },

    ratingContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    rating: {
        marginLeft: 5,
        fontSize: 16,
        fontWeight: "bold",
        color: "#000",
    },
    location: {
        fontSize: 16,
        color: "#666",
        marginBottom: 20,
    },
    section: {
        marginBottom: 20,
    },

    description: {
        fontSize: 16,
        lineHeight: 24,
        color: "#444",
    },
    photosScroll: {
        flexDirection: "row",
        marginBottom: 10,
    },
    thumbnail: {
        width: 100,
        height: 80,
        borderRadius: 10,
        marginRight: 10,
    },
    interestsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    interestItem: {
        flexDirection: "row",
        alignItems: "center",
        width: "50%",
        marginBottom: 10,
    },
    interestText: {
        marginLeft: 8,
        fontSize: 14,
        color: "#333",
    },
    bookingContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 20,
        paddingTop: 20,
        borderTopWidth: 1,
        borderTopColor: "#eee",
    },
    priceLabel: {
        fontSize: 14,
        color: "#666",
    },
    price: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#000",
    },
    bookButton: {
        backgroundColor: "#6200EE",
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 10,
    },
    bookButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    //Profile style
    profileHeader: {
        marginTop: 40,
        marginBottom: 30,
        alignItems: "center",
    },

    greetingText: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
    },

    balanceText: {
        fontSize: 18,
        color: "#555",
    },

    buttonProfile: {
        backgroundColor: "#007BFF",
        padding: 15,
        borderRadius: 10,
        marginHorizontal: 20,
        marginVertical: 10,
        alignItems: "center",
    },

    logoutButton: {
        backgroundColor: "#ec1b0f",
        padding: 15,
        borderRadius: 10,
        marginHorizontal: 20,
        marginVertical: 30,
        alignItems: "center",
    },

    logoutText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 80,
        marginBottom: 15,
        borderWidth: 2,
        borderColor: "#ccc",
    },

    // travels :
    pageTitle: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 5,
    },

    profileIcon: {
        width: 70,
        height: 70,
        borderColor: "#0e2955",

        borderRadius: 80,
        marginBottom: 15,
    },
    backButtonProfile: {
        backgroundColor: "#0e2955",
        padding: 20,
        borderRadius: 25,
        alignItems: "center",
        marginHorizontal: 40,
        marginVertical: 40,
    },
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: '#ffffff',
    },
    profileHeaderRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20,
        padding: 16,
    },

    profileTitle: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        flex: 1,
    },



    profileTopSection: {
        alignItems: "center",
        marginVertical: 16,
    },

    profilePicLarge: {
        width: 120,
        height: 120,
        borderRadius: 70,
        marginBottom: 12,
    },

    profileName: {
        fontSize: 18,
        fontWeight: "bold",
    },

    profileEmail: {
        fontSize: 14,
        color: "#666",
        marginBottom: 10,
    },

    editButton: {
        backgroundColor: "#5C40CC",
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 6,
    },


    editButtonText: {
        color: "white",
        fontSize: 14,
    },

    profileOptions: {
        marginHorizontal: 16,
        marginTop: 10,
    },

    optionRow: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 14,

    },

    optionLabel: {
        fontSize: 16,
        marginLeft: 12,
    },
    separator: {
        height: 1,
        backgroundColor: "#ffffff",
        marginVertical: 10,
    },
    back:{
        backgroundColor: '#6C3BD4',   // Purple background
        padding: 12,
        borderRadius: 16,             // Rounded corners
        width: 48,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,                 // Shadow for Android
        shadowColor: '#000',         // Shadow for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },

    // manage flight (admin dashboard)

    switchContainer: {
        flexDirection: "row",
        alignItems: "center",
        // marginBottom: 20,
        justifyContent: "space-between",
    }

});
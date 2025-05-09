import { StyleSheet } from 'react-native';

export default StyleSheet.create({

// loginStyle :
    containerLogin: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30,
        color: '#000',
    },

    inputLabel: {
        fontSize: 16,
        marginBottom: 8,
        color: '#666',
    },
    divider: {
        height: 1,
        backgroundColor: '#eee',
        marginVertical: 25,
    },
    loginButton: {
        backgroundColor: '#007AFF',
        borderRadius: 8,
        padding: 16,
        alignItems: 'center',
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
    },

// signupStyle :

    containerSigUp: {
        flex: 1,
        padding: 24,
        backgroundColor: '#ffffff',

    },
    inputContainer: {
        marginBottom: 7,
        position: 'relative',
    },
    label: {
        fontSize: 14,
        marginBottom: 8,
        color: '#666666',
    },
    toggleButton: {
        position: 'absolute',
        right: 16,
        top: 40,
    },
    toggleText: {
        color: '#5C40CC',
        fontSize: 16,
    },

    primaryButton: {
        backgroundColor: '#5C40CC',
        borderRadius: 8,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    primaryButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
    },

    footerText: {
        fontSize: 14,
        color: '#666666',
        marginRight: 4,
    },
    footerLink: {
        fontSize: 14,
        color: '#5C40CC',
        fontWeight: '600',
    },

// forget passwordStyle :

    containerForgetPass: {
        flex: 1,
        backgroundColor: '#F2F2F2',
        paddingHorizontal: 24,
        paddingTop: 100,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
    },
    header: {
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 32,
        color: '#333',
        textAlign: 'left',
    },
    input: {
        fontSize: 16,
        fontWeight: '600',
        backgroundColor: '#FFF',
        borderColor: '#CCC',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginBottom: 24,
        color: '#000',
    },
    button: {
        backgroundColor: '#5C40CC',
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFF',
        fontWeight: '600',
        fontSize: 16,
    },
    // edit page
    profilePicLarge: {
        width: 120,
        height: 120,
        borderRadius: 70,
        marginBottom: 12,
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
    editIcon: {
        position: "absolute",
        bottom: 0,
        right: 0,
        backgroundColor: "#5C40CC",
        borderRadius: 20,
        padding: 6,
        marginRight: 135,
    },
    errorText: {
        color: "red",
        fontSize: 12,
        marginTop: -10,
        // paddingLeft: 40,
    },
    saveButton: {
        backgroundColor: "#5C40CC",
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 6,
        width:"30%",
        alignItems: "center",
        marginBottom: 50,
    },
    inputFocused: {
        borderColor: '#5C40CC',
        borderWidth: 1.5,
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
    }
});
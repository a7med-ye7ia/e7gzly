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
    // inputContainer: {
    //     marginBottom: 20,
    // },
    inputLabel: {
        fontSize: 16,
        marginBottom: 8,
        color: '#666',
    },
    // input: {
    //     borderWidth: 1,
    //     borderColor: '#ddd',
    //     borderRadius: 8,
    //     padding: 12,
    //     fontSize: 16,
    // },
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
    // footerLink: {
    //     color: '#007AFF',
    //     fontSize: 14,
    // },


// signupStyle :

    containerSigUp: {
        flex: 1,
        padding: 24,
        backgroundColor: '#ffffff',
    },
    // header: {
    //     fontSize: 24,
    //     fontWeight: 'bold',
    //     marginBottom: 16,
    //     color: '#000000',
    // },
    // title: {
    //     fontSize: 20,
    //     fontWeight: '600',
    //     marginBottom: 24,
    //     color: '#000000',
    // },
    inputContainer: {
        marginBottom: 16,
        position: 'relative',
    },
    label: {
        fontSize: 14,
        marginBottom: 8,
        color: '#666666',
    },
    // input: {
    //     height: 48,
    //     borderWidth: 1,
    //     borderColor: '#dddddd',
    //     borderRadius: 8,
    //     paddingHorizontal: 16,
    //     fontSize: 16,
    // },
    toggleButton: {
        position: 'absolute',
        right: 16,
        top: 40,
    },
    toggleText: {
        color: '#007AFF',
        fontSize: 14,
    },
    // divider: {
    //     height: 1,
    //     backgroundColor: '#eeeeee',
    //     marginVertical: 24,
    // },
    primaryButton: {
        backgroundColor: '#007AFF',
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
    // footer: {
    //     flexDirection: 'row',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    // },
    footerText: {
        fontSize: 14,
        color: '#666666',
        marginRight: 4,
    },
    footerLink: {
        fontSize: 14,
        color: '#007AFF',
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
    // label: {
    //     fontSize: 14,
    //     color: '#888',
    //     marginBottom: 8,
    // },
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
        backgroundColor: '#007AFF',
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFF',
        fontWeight: '600',
        fontSize: 16,
    }
});
import React , { useState ,useRef , useEffect } from 'react';

import { 
    StyleSheet ,
    Text ,
    View ,
    TouchableOpacity,
    TextInput,
    FlatList,
    KeyboardAvoidingView,
    Platform,
    Keyboard,
    Dimensions,
    ActivityIndicator,
    Animated,     
 } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useRouter } from "expo-router";



const genAI = new GoogleGenerativeAI("AIzaSyBvncl5FLhVQLnHS4wkXeremyRRLL2G6XE");
const model = genAI.getGenerativeModel({model : "gemini-2.0-flash"});

const ActionButton = ({ icon, label, onPress }) => {
    return (
        <TouchableOpacity style={styles.attachButton} onPress={onPress}>
            <Ionicons name={icon} size={20} color="#8E8E93" />
            <Text style={styles.actionButtonText}>{label}</Text>
        </TouchableOpacity>
    );
};

const {width} = Dimensions.get("window");

export default function ChatBot() {
    const [messages , setMessages] = useState([]);
    const [inputText , setInputText] = useState("");
    const [isLoading ,setIsLoading] = useState(false);
    const scrollViewRef = useRef(null);
    const fadeAnim = useRef(new Animated.Value(1)).current;

    const router = useRouter();

    useEffect(() => {
        const keyboardWillShow = Keyboard.addListener(
            Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow",
            () => {
                Animated.timing(fadeAnim , {
                    toValue : 0,
                    duration: 200,
                    useNativeDriver: true,
                }).start();
            }
        );
        const keyboardWillHide = Keyboard.addListener(
            Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide",
            () => {
                Animated.timing(fadeAnim , {
                    toValue : 1,
                    duration: 200,
                    useNativeDriver: true,
                }).start();
            }
        );
        
        return ()=>{
            keyboardWillShow.remove();
            keyboardWillHide.remove();
        };
    }, [])


    const generateAIResponse = async (userMessage)=>{
        try {
            const prompt = `Respond in simple English with a witty  : ${userMessage}`;
            const result = await model.generateContent(prompt);
            const response = await result.response;
            return response.text();
        }catch (error){
            console.error("Error Generating AI RES: " ,error);
            return "Oops, there is some errors come back later 🫠";
        }
    };
    const sendMessage = async () => {
        if(!inputText.trim())return;

        const userMessage = {
            id : Date.now().toString(),
            text: inputText.trim(),
            isUser: true,
        };

        setMessages((prev) => [...prev, userMessage]);
        setInputText("");
        setIsLoading(true);

        const aiResponse = await generateAIResponse(userMessage.text);

        setMessages((prev) => [
            ...prev,{
                id: (Date.now() + 1).toString(),
                text: aiResponse,
                isUser: false,
            },
        ]);
        setIsLoading(false);
    };

    const renderResponseText = (text) => {
        const parts = [];
        const regex =  /\*([^*]+)\*/g;
        let match;
        let lastIndex = 0;
        while ((match = regex.exec(text)) !== null) {
            const before = text.slice(lastIndex , match.index);
            if(before) parts.push(<Text key={lastIndex}>{before}</Text>);
            const boldText = match[1];
            parts.push(
                <Text key={match.index} style={{fontWeight: "bold"}}>
                    {boldText}
                </Text>
            );
            lastIndex = regex.lastIndex;
        }
        const after = text.slice(lastIndex);
        if(after) parts.push(<Text key={lastIndex}>{after}</Text>)
        return parts;
    }
    const renderMessage = ({item}) => {
        return(
            <View style={[
                styles.messeageBubble,
                item.isUser ? styles.userMessage : styles.aiMessage,

                ]}
            >
                {item.isUser ? (
                    <Text style={styles.messageText}>{item.text}</Text>
                ): (
                    <>{renderResponseText(item.text)}</>
                )}
            </View>
    
        )
    }

  return (
    <View style={styles.container}>
        <StatusBar style="light"/>
        {/* Enhance Top Bar */}
        <Animated.View style={[styles.topBar , {opacity:fadeAnim}]}>
            <View style={styles.topBarContent}>
                <View style={{flexDirection:"row" , alignItems:"center"}}>
                    <Ionicons
                     name="chatbubbles"
                     size={24}
                     color="#FFFFFF"
                     style={{marginRight:8}}                    
                    />
                    <Text style={styles.appTitle}>Chat Bot</Text>
                </View>
                <TouchableOpacity  onPress={() => router.back()} 
                style={styles.settingButton}
               >
                    <Ionicons name="arrow-redo-outline" size={24} color="#8E8E93"/>
                </TouchableOpacity>
            </View> 
        </Animated.View>     
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios"?"padding":undefined}
            style={styles.mainContainer}
            keyboardVerticalOffset={Platform.OS === "ios"?5:0}
        >
            {messages.length == 0? (
                <View style={styles.welcomeContainer}>
                    <View style={styles.welcomeSection}>
                        <Text style={styles.greeting}>Good morning</Text>
                        <Text style={styles.subGreeting}>How can I help you</Text>
                    </View>
                </View>
            ) : (
              <FlatList
                ref={scrollViewRef}
                data={messages}
                renderItem={renderMessage}
                keyExtractor={(item) => item.id}
                // style={styles.chatContainer}
                contentContainerStyle={[
                    // styles.chatContainer,
                    styles.messageContainer,
                    // styles.chatContentContainer
                ]}
                onContentSizeChange={()=>
                    scrollViewRef.current?.scrollToEnd({Animated : true})
                }
                keyboardShouldPersistTaps="handled"
                ListFooterComponent={
                    isLoading?(
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator color="#0A84FF" size="small" />
                        </View>
                    ): null
                }   
              />            
            )}
            {/* Input Area */}
            <View style={styles.inputAreaContainer}>
                <View style={styles.inputArea}>
                    <TextInput
                        style ={styles.input}
                        value= {inputText}
                        onChangeText={setInputText}
                        placeholder="Message AI Assistant..."
                        placeholderTextColor="#666"
                        // multiline={true}
                        maxHeight={100}
                        onSubmitEditing={sendMessage}
                    />
                    <TouchableOpacity
                        style={[
                            styles.sendButton,
                            !inputText.trim() && styles.sendButtonDisabled,
                        ]}
                        onPress={sendMessage}
                        disabled={!inputText.trim() || isLoading}
                    >
                        <Ionicons
                            name = "send"
                            size={24}
                            color={inputText.trim() && !isLoading ? "#5A41D7" : "#666"}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    </View>
  )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: "#FFFFFF", // ← أبيض
    },
    topBar:{
        flexDirection :"row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingTop:50,
        paddingBottom:20,
        backgroundColor:"#5C40CC", // ← بنفسجي بدل الرمادي
    },
    topBarContent: {
        flexDirection :"row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
    },
    appTitle:{
        fontSize:20,
        fontWeight:"600",
        color: "#FFFFFF",
    },
    settingButton: {
        padding: 8,
    },
    chatContainer: {
        flex: 1,
    },
    chatContentContainer: {
        flexGrow: 1,
    },
    welcomeContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    welcomeSection: {
        alignItems:"center",
        marginBottom: 40,
    }, 
    greeting: {
        textAlign:"center",
        marginBottom: 8,
        fontSize: 24,
        color: "#333333", // ← لون غامق ليتناسب مع الأبيض
    },
    subGreeting: {
        textAlign:"center",
        fontSize: 18,
        color: "#666666", // ← رمادي أفتح
    },
    actionContainer: {
        alignItems:"center",
        width: "100%",
    },
    actionRow: {
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 15,
        width: "100%",
    },
    ActionButton: {
        flexDirection: "row",
        alignItems:"center",
        backgroundColor:"#E5E5EA",
        paddingVertical: 12 ,
        paddingHorizontal: 16,
        borderRadius: 8,
        marginHorizontal: 5,
        minWidth: width * 0.4,
        justifyContent: "center",
    },
    actionButtonText: {
        color: "#333333",
        marginLeft: 8,
        fontSize: 16,
    },
    messageContainer: {
        padding:20,
    },
    messeageBubble: {
        maxWidth: "80%",
        padding:12,
        borderRadius:20,
        marginBottom:10,
    },
    userMessage: {
        backgroundColor: "#5C40CC", 
        alignSelf: "flex-end",
        borderBottomLeftRadius: 5,
    },
    messageText: {
        color: "#FFFFFF",
        fontSize: 16,
    },
    aiMessage: {
        backgroundColor: "#F2F2F7",  
        alignSelf: "flex-start",
        borderBottomLeftRadius:5,
    },
    loadingContainer: {
        padding: 10,
        alignItems: "flex-start",
    },
    inputAreaContainer: {
        backgroundColor: "#F2F2F7",
        borderTopWidth: 1,
        borderBottomColor: "#E5E5EA",
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    inputArea: {
        flexDirection : "row",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        borderRadius: 25,
        paddingHorizontal: 15,
        paddingVertical: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity:0.1,
        shadowRadius: 2,
        elevation: 3,
    },
    input:{
        flex: 1,
        color: "#000000",
        fontSize: 16,
        marginHorizontal:10,
        maxHeight: 100,
        paddingTop: 0,
    },
    attachButton: {
        padding: 4,
    },
    sendButton: {
        padding: 4,
    },
    sendButtonDisabled: {
        opacity: 0.5,
    },
    mainContainer: {
        flex : 1,
        backgroundColor : "#FFFFFF", // ← أبيض
    },
});
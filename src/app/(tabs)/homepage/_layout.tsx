// PÁGINA RESPONSÁVEL PELO LAYOUT DAS TABS DO  'INDEX DE DASHBOARD' E 'PÁGINA DE SETTINGS'
import { Tabs } from "expo-router";

import { AntDesign, FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'

export default function Layout() {

    return (
        <Tabs
screenOptions={{
        tabBarStyle: {
          position: 'absolute',
          bottom: 8, // distancia da parte inferior da tela
          left: 20, // distancia da lateral esquerda
          right: 20, // distancia da lateral direita
          borderRadius: 15, // bordas arredondadas
          paddingHorizontal: 20,
          margin: 20,
          justifyContent: "center",
          height: 60, // altura da tab
          backgroundColor: 'white', // cor de fundo da tab
          elevation: 10, // sombra (para Android)
        },
        // tabBarShowLabel: false, // opcional: para esconder os labels das tabs
      }}
        >
            <Tabs.Screen 
            name="primeira" 
            options={{ 
                // headerShown: false, 
                title: "tela 1",
                headerTitleStyle: {
                   color: "#000"
                },
                tabBarIcon: ({ size, color, focused }) => {
                    return <FontAwesome name='home' color={color} size={24}/>
                    
                },
            }}
        />  


        <Tabs.Screen
          name="segunda"
          options={{ 
            // headerShown: false, 
            title: "tela 2",
            headerTitleStyle: {
               color: "#000"
            },
            tabBarIcon: ({ size, color, focused }) => {
                return <MaterialCommunityIcons name='wallet' color={color} size={24}/>
                
            },
        }}
    />   
    
        <Tabs.Screen
          name="terceira"
          options={{ 
            // headerShown: false, 
            title: "tela 3",
            headerTitleStyle: {
               color: "#000"
            },
            tabBarIcon: ({ size, color, focused }) => {
                return <AntDesign name='pluscircle' color={color} size={24}/>
                
            },
        }}
        />

        <Tabs.Screen
          name="quarta"
          options={{ 
            // headerShown: false, 
            title: "tela 4",
            headerTitleStyle: {
               color: "#000"
            },
            tabBarIcon: ({ size, color, focused }) => {
                return <AntDesign name='bars' color={color} size={24}/>
                
            },
        }}
        />
      </Tabs>
    );

}
import * as React    from 'react';
import  { useState, useEffect } from 'react';
import { Button, View, Text,StyleSheet,TouchableOpacity,TouchableHighlight,Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Searchbar } from 'react-native-paper';



const styles = StyleSheet.create({
  container: {
    flex : 1,
    flexDirection: "column",
    fontSize: 30,
    textAlign: "center",
    // height : 0.5
  },
  left: {
    backgroundColor: "#D9C2BD",
    padding: 50,
    flex: 0.5,
    width: 100,
    height: 100,
    justifyContent: 'center',
      alignItems: 'center',
    
  },
  
  right: {
    backgroundColor: "dodgerblue",
    padding: 10,
    flex: 0.5,
    width: 50,
    height: 50,
  },
  box: {
    width: 50,
    height: 50,
  },

  image: {
    width: 150,
    height: 200,
    borderRadius: 200/2,
  },
  container2: {
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  
});


function HomeScreen({ navigation }) {

const [error, setError] = useState(null);
const [isLoaded, setIsLoaded] = useState(false);
const [items, setItems] = useState([]);
const [searchQuery, setSearchQuery] = React.useState('');

const onChangeSearch = query => setSearchQuery(query); 

useEffect(() => {
  fetch("https://powerful-reef-47354.herokuapp.com/members")
    .then(res => res.json())
    .then(
      (result) => {
        setIsLoaded(true);
        setItems(result);
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {
        setIsLoaded(true);
        setError(error);
      }
    )
   
}, [])
  
  return (
    
      <View >
             {/* <Searchbar
      placeholder="Search"
      onChangeText={onChangeSearch}
      value={searchQuery}/> */}
      

          <View
          style={{
            flexDirection: "row",
            height: 160,
            padding: 30
          }}>
             
     
          <View  > 
     
          
          {items.map(item => (
          <View key={item.id} style={styles.left}>
            
            <TouchableHighlight onPress={() => navigation.navigate('Profile', 
            { id: item.id , image: item.image_name , firstname:item.firstname.en , lastname:item.lastname.en
              , firstnameTH:item.firstname.th , lastnameTH:item.lastname.th , nicknameEN :item.nickname.en 
              , nicknameTH :item.nickname.th , birthDay :item.birthDay , height :item.height , province :item.province
              , hobbies :item.hobbies , likes :item.likes  , generation :item.generation , instagram :item.instagram })} >
          <Image 
            source={{
              uri: "https://murmuring-mountain-39162.herokuapp.com/images/"+item.id+"/s/"+item.image_name ,
              method: 'GET'
            }}
            style={{width: 70, height: 100}}
            
            /> 
            </TouchableHighlight>
          </View>
     
        ))}
          
          
           </View>

          <View style={{ backgroundColor: "#A2C4C6", flex: 1 }} >
        
          
              {items.map(item => (
          <View key={item.id} >
          <Text style={{
            backgroundColor: "#A2C4C6",
            height: 100,
            padding: 30
          }} onPress={() => navigation.navigate('Profile', 
          { id: item.id , image: item.image_name , firstname:item.firstname.en , lastname:item.lastname.en
            , firstnameTH:item.firstname.th , lastnameTH:item.lastname.th , nicknameEN :item.nickname.en 
            , nicknameTH :item.nickname.th , birthDay :item.birthDay , height :item.height , province :item.province
            , hobbies :item.hobbies , likes :item.likes  , generation :item.generation , instagram :item.instagram })}> 
          

          <Text style={{ color: 'gray', fontSize: 13, textAlign: 'center',fontWeight: '500',lineHeight: 15, }}>
          ชื่อ: {item.firstname.th}  {item.lastname.th} 
                ({item.nickname.th})  </Text>



                </Text>

          </View>
     
        ))}


          </View>
        
        </View>

      
</View>

     );
}

function DetailsScreen({ navigation }) {
  useEffect(() => {
    fetch("https://powerful-reef-47354.herokuapp.com/members")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
     
  }, [])

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Button
        title="Go to Details... again"
        onPress={() => navigation.push('Details')}
      />
    </View>
  );
}


const ProfileScreen = ({ navigation, route }) => {


  return (
    <View style={styles.container2} >
  
 
  
  <Image 
            source={{
              uri: "https://murmuring-mountain-39162.herokuapp.com/images/"+route.params.id+"/s/"+route.params.image ,
              method: 'GET'
            }}
           
             style={styles.image}
            
            />
          
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: 'gray', fontSize: 20, textAlign: 'center',fontWeight: '800',lineHeight: 50, }}>
        {route.params.firstname} {route.params.lastname} ({route.params.nicknameEN}) </Text>
            </View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: 'gray', fontSize: 20, textAlign: 'center',fontWeight: '800',lineHeight: 10, }}>
        {route.params.firstnameTH} {route.params.lastnameTH} ({route.params.nicknameTH})  </Text>
            </View>

        <Text style={{ lineHeight: 30 }} >
        <Image 
                  source={{
                    uri: "https://img.icons8.com/office/16/undefined/birthday.png" ,
                    method: 'GET'
                  }}
                  
                    style={{width: 15, height: 15 }}
                  
                  /> 
                  <Text style={{ color: 'gray', fontSize: 13, textAlign: 'center',fontWeight: '500',lineHeight: 15, }}>
                  {route.params.birthDay}  </Text>


                  <Image 
                  source={{
                    uri: "https://img.icons8.com/external-microdots-premium-microdot-graphic/64/undefined/external-height-medical-healthcare-vol2-microdots-premium-microdot-graphic.png" ,
                    method: 'GET'
                  }}
                  
                    style={{width: 15, height: 15 }}
                  
                  /> 
                  <Text style={{ color: 'gray', fontSize: 13, textAlign: 'center',fontWeight: '500',lineHeight: 15, }}>
                   {route.params.height}Cm </Text>


                  <Image 
                  source={{
                    uri: "https://img.icons8.com/doodle/48/undefined/city-buildings.png" ,
                    method: 'GET'
                  }}
                  
                    style={{width: 15, height: 15 }}
                  
                  /> 
                  <Text style={{ color: 'gray', fontSize: 13, textAlign: 'center',fontWeight: '500',lineHeight: 15, }}>
                   {route.params.province}  </Text>


            </Text>   

            <Text style={{ lineHeight: 20 }} >

            
                  <Text style={{ color: 'gray', fontSize: 13, textAlign: 'center',fontWeight: '500',lineHeight: 15, }}>
                  hobbies: {route.params.hobbies} </Text>

            </Text>

            <Text style={{ lineHeight: 20 }} >

            
                  <Text style={{ color: 'gray', fontSize: 13, textAlign: 'center',fontWeight: '500',lineHeight: 15, }}>
                  likes: {route.params.likes} </Text>

            </Text>

            <Text style={{ lineHeight: 20 }} >

            
                  <Text style={{ color: 'gray', fontSize: 13, textAlign: 'center',fontWeight: '500',lineHeight: 15, }}>
                  generation: {route.params.generation} </Text>

            </Text>

            <Text style={{ lineHeight: 30 }} >

            <Image 
                  source={{
                    uri: "https://img.icons8.com/doodle/48/undefined/instagram-new.png" ,
                    method: 'GET'
                  }}
                  
                    style={{width: 25, height: 25  }}
                  
                  /> 
                  <Text style={{ color: 'gray', fontSize: 18, textAlign: 'center',fontWeight: '500',lineHeight: 20, }}>
                    {route.params.instagram} </Text>
                  

            </Text>
           
          </View>
           
            
          )
    
};

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator  initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen}   
          options={{
          title: 'Member',
          headerStyle: {
            backgroundColor: '#E2E5CC',
          },
          headerTintColor: 'black',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} 
        
         options={{
          title: 'Profile',
          headerStyle: {
            backgroundColor: '#E2E5CC',
          },
          headerTintColor: 'black',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

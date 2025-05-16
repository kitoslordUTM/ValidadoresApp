import * as Index from '../index/Index'
import { initialValues } from './Const';
const { View, Text, TouchableOpacity, TextInput  } = Index


const NameInput = () => (
  <View>
    <TextInput
      placeholder="Ingrese su nombre"
      style={{
        borderWidth: 1,
        borderColor: 'black',
        padding: 10,
        marginBottom: 10,
      }}
      value={initialValues.username}
    />
  </View>
);

const PassWordInput = () => (
  <View>
    <TextInput
      placeholder="Ingrese su contraseña"
      secureTextEntry={true}
      style={{
        borderWidth: 1,
        borderColor: 'black',
        padding: 10,
        marginBottom: 10,
      }}
      value={initialValues.password}
    />
  </View>
)

const SubmitButton = () => (
  <TouchableOpacity
    style={{
      backgroundColor: 'blue',
      padding: 10,
      borderRadius: 5,
    }}
    onPress={() => console.log('Button pressed')}
  >
    <Text style={{ color: 'white' }}>Iniciar sesión</Text>
  </TouchableOpacity>
);


export default function Login() {
  return (
    <View>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Iniciar sesión</Text>
      <NameInput />
      <PassWordInput />
      <SubmitButton />
    </View>   
  )
}

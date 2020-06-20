import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../../services/api';
import AsyncStorage from '@react-native-community/async-storage';
import {Keyboard, ActivityIndicator} from 'react-native';

import {
  Container,
  Form,
  Input,
  SubmitButton,
  List,
  User,
  Avatar,
  Name,
  Bio,
  ProfileButton,
  ProfileButtonText,
  ErrorGet,
} from './styles';

interface User {
  name: string;
  login: string;
  bio: string;
  avatar_url: string;
}

type Users = Array<User>;

const Main: React.FC = () => {
  const navigation = useNavigation();
  const [newUser, setNewUser] = useState('');
  const [users, setUsers] = useState<Users>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<boolean>(false);

  async function handleAddUser() {
    setLoading(true);
    try {
      const response = await api.get(`/users/${newUser}`);
      setUsers([...users, response.data]);
    } catch (err) {
      setErrors(true);
    }
    Keyboard.dismiss();
    setLoading(false);
  }

  function handleNavigate(user: User) {
    navigation.navigate('User', {...user});
  }

  useEffect(() => {
    setTimeout(() => {
      setErrors(false);
    }, 7000);
  }, [errors]);

  useEffect(() => {
    async function getStorageUsers() {
      const usersStorage = await AsyncStorage.getItem('users');
      if (usersStorage) {
        setUsers(JSON.parse(usersStorage));
      }
    }
    getStorageUsers();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  return (
    <Container>
      <Form>
        <Input
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Adicionar usuário"
          onChangeText={(text) => setNewUser(text)}
          returnKeyType="send"
          onSubmitEditing={handleAddUser}
        />
        <SubmitButton onPress={handleAddUser} loading={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Icon name="add" size={20} color="#eee" />
          )}
        </SubmitButton>
      </Form>

      {errors && <ErrorGet>Algum erro ao procurar o Usuário!</ErrorGet>}

      <List
        data={users}
        keyExtractor={(user) => user.login}
        renderItem={({item}) => (
          <User>
            <Avatar source={{uri: item.avatar_url}} />
            <Name>{item.name}</Name>
            <Bio>{item.bio}</Bio>

            <ProfileButton onPress={() => handleNavigate(item)}>
              <ProfileButtonText>Ver Perfil</ProfileButtonText>
            </ProfileButton>
          </User>
        )}
      />
    </Container>
  );
};

export default Main;

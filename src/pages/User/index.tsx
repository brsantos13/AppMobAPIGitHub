import React, {useEffect, useState} from 'react';
import {useRoute, useNavigation} from '@react-navigation/native';
import {StackParamList} from '../../routes/types';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import api from '../../services/api';

import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  StarsList,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
  Load,
} from './styles';

export interface Star {
  id: number;
  name: string;
  html_url: string;
  owner: {
    avatar_url: string;
    login: string;
  };
}
type Stars = Array<Star>;

const User: React.FC = () => {
  const route = useRoute<RouteProp<StackParamList, 'User'>>();
  const navigation = useNavigation<
    StackNavigationProp<StackParamList, 'User'>
  >();
  const user = route.params;
  const [stars, setStars] = useState<Stars>([]);
  const [loadingPage, setLoadingPage] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [refrestList, setRefrestList] = useState<boolean>(false);
  const [loadingListEnd, setLoadingListEnd] = useState<boolean>(false);

  function handleNavigate(item: Star) {
    navigation.navigate('PageWeb', {url: item.html_url, nameLib: item.name});
  }

  async function getLoadStarsPage() {
    setLoadingListEnd(true);
    const newPage = page + 1;
    const response = await api.get(
      `/users/${user.login}/starred?page=${newPage}`,
    );
    setPage(newPage);
    setStars([...stars, ...response.data]);
    setLoadingListEnd(false);
  }

  function handleRefresh() {
    setRefrestList(true);
    async function getLoadStars() {
      const response = await api.get(`/users/${user.login}/starred`);
      setStars(response.data);
    }
    getLoadStars();
    setRefrestList(false);
  }

  useEffect(() => {
    navigation.setOptions({title: user.name});
  }, [navigation, user]);

  useEffect(() => {
    async function getLoadStars() {
      const response = await api.get(`/users/${user.login}/starred`);
      setStars(response.data);
    }
    getLoadStars();
    setLoadingPage(false);
  }, [user, refrestList]);

  return (
    <Container>
      <Header>
        <Avatar source={{uri: user.avatar_url}} />
        <Name>{user.name}</Name>
        <Bio>{user.bio}</Bio>
      </Header>

      {loadingPage ? (
        <Load />
      ) : (
        <>
          <StarsList
            data={stars}
            keyExtractor={(userKey) => String(userKey.id)}
            renderItem={({item}) => (
              <Starred onPress={() => handleNavigate(item)}>
                <OwnerAvatar source={{uri: item.owner.avatar_url}} />
                <Info>
                  <Title>{item.name}</Title>
                  <Author>{item.owner.login}</Author>
                </Info>
              </Starred>
            )}
            onEndReachedThreshold={0.3}
            onEndReached={getLoadStarsPage}
            onRefresh={handleRefresh}
            refreshing={refrestList}
          />
          {loadingListEnd && <Load />}
        </>
      )}
    </Container>
  );
};

export default User;

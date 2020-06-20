import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';
import {FlatList} from 'react-native';

interface User {
  name: string;
  login: string;
  bio: string;
  avatar_url: string;
}

interface Load {
  loading: boolean;
}

export const Container = styled.View`
  flex: 1;
  padding: 30px;
`;

export const Form = styled.View`
  flex-direction: row;
  padding-bottom: 20px;
  border-bottom-width: 1px;
  border-color: #ccc;
`;

export const Input = styled.TextInput`
  flex: 1;
  height: 40px;
  background: #ccc;
  border-radius: 4px;
  padding: 0 15px;
  border: 1px solid #ccc;
`;

Input.defaultProps = {
  placeholderTextColor: '#000',
};

export const SubmitButton = styled(RectButton)<Load>`
  align-items: center;
  justify-content: center;
  background: #7159c1;
  border-radius: 4px;
  margin-left: 10px;
  padding: 0 12px;
  opacity: ${(props) => (props.loading ? 0.7 : 1)};
`;

export const List = styled(FlatList as new () => FlatList<User>)`
  margin-top: 20px;
`;

List.defaultProps = {
  showsVerticalScrollIndicator: false,
};

export const User = styled.View`
  align-items: center;
  margin: 0 20px 30px;
`;

export const Avatar = styled.Image`
  width: 64px;
  height: 64px;
  border-radius: 32px;
  background: #ccc;
`;

export const Name = styled.Text`
  font-size: 14px;
  color: #333;
  font-weight: bold;
  margin-top: 4px;
  text-align: center;
`;

export const Bio = styled.Text`
  font-size: 13px;
  line-height: 18px;
  color: #999;
  margin-top: 5px;
  text-align: center;
`;

Bio.defaultProps = {
  numberOfLines: 2,
};

export const ProfileButton = styled(RectButton)`
  margin-top: 10px;
  align-self: stretch;
  border-radius: 4px;
  background: #7159c1;
  justify-content: center;
  align-items: center;
  height: 36px;
`;

export const ProfileButtonText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #fff;
  text-transform: uppercase;
`;

export const ErrorGet = styled.Text`
  color: red;
  text-align: center;
  padding: 16px 0px;
  text-transform: uppercase;
`;

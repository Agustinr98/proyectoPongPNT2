//ESTO NO SE LLEGO A IMPLEMENTAR
import React from 'react';
import { ScrollView } from 'react-native';
import UserItem from './UserItem';

export default function UserList({ usuarios = [], currentUsername }) {
  return (
    <ScrollView>
      {usuarios.map((usuario, index) => (
        <UserItem
          key={index}
          user={usuario}
          isCurrentUser={usuario.nombre === currentUsername}
        />
      ))}
    </ScrollView>
  );
}

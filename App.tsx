/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors, Header} from 'react-native/Libraries/NewAppScreen';
import {GO_SERVER_USER_DATA_URL} from '@env';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';

const queryClient = new QueryClient();

interface User {
  id: string;
  name: string;
}

function App(): JSX.Element {
  const {isLoading, error, data} = useQuery({
    queryKey: ['users'],
    queryFn: (): Promise<User[]> =>
      fetch(`${GO_SERVER_USER_DATA_URL}/users`).then(res => res.json()),
  });

  return (
    <SafeAreaView>
      {isLoading && <ActivityIndicator />}
      <Text style={styles.title}>Users from server</Text>
      {data?.map(user => {
        return (
          <View key={user.id} style={styles.userContainer}>
            <Text>
              {user.name} with id {user.id}
            </Text>
          </View>
        );
      })}
      {error && <Text>Some error occured: {error}</Text>}
    </SafeAreaView>
  );
}

function AppWrapped(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  userContainer: {
    padding: 16,
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 30,
  },
});

export default AppWrapped;

import * as React from 'react';
import  { useEffect } from 'react';
import { FontAwesome as Icon } from '@expo/vector-icons';
import Space from '../components/Space';
import ButtonIcon from '../components/ButtonIcon';

import { Text, View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

import { Title, Paragraph, Card, Button, TextInput } from 'react-native-paper';

import { connect } from 'react-redux';
import { addTodo, deleteTodo } from '../redux/actions';
import { LogBox } from 'react-native';


const Todo_App = ({ todo_list, addTodo, deleteTodo }) => {
  const [task, setTask] = React.useState('');

  const handleAddTodo = () => {
    addTodo(task)
    setTask('')
  }

  const handleDeleteTodo = (id) => {
    deleteTodo(id)
  }
  useEffect(() => {
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
}, [])

  return (
    <View style={styles.container}>
      <Card title="Card Title">
        <Text style={styles.paragraph}>ToDo App</Text>
      </Card>
      <Space />
      <Card>
        <Card.Content>
          <Title>Add ToDo Here</Title>
          
          <TextInput
            mode="outlined"
            label="Task"
            onChangeText={task => setTask(task)}
            value={task}
          />
          <Space/>
          <Button mode="contained" onPress={handleAddTodo}>
            Add Task
          </Button>
        </Card.Content>
      </Card>
      <Space />
      <FlatList
        data={todo_list}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item, index}) => {
          return (
            <>
            <Card>
              <Card.Title
                title={'Task'}
                left={(props) => <Icon name="tasks" size={24} color="black" />}
                right={(props) => <ButtonIcon iconName="close" color="red" onPress={() => handleDeleteTodo(item.id)} />}
              />
              <Card.Content>
                <Paragraph>{item.task}</Paragraph>
              </Card.Content>
            </Card>
            <Space />
            </>
          );
        }}
      />
      <Space />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: '#ecf0f1',
    padding: 10,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

const mapStateToProps = (state, ownProps) => {
  return {
    todo_list: state.todos.todo_list,
  }
}

const mapDispatchToProps = { addTodo, deleteTodo }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Todo_App)

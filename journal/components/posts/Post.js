import React, { Component } from 'react';
import {View,Text, ActivityIndicator, StyleSheet} from 'react-native';
import navStyles from '../../styles/navStyles';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import Posts from './Posts';
import {Fab,Icon} from 'native-base'

class Post extends Component {
	static navigationOptions = ({navigation}) => {
		return{
    title: navigation.state.params.title,
    ...navStyles
  	};
  };

  updatePost = () => {
  	const {Post} = this.props;
  	this.props.navigation.navigate("UpdatePost", {
           id: Post.id,
           title: Post.title 
       });
  	};

	render() {
		console.log(this.props);
		const {Post, allPosts,loading} = this.props
		if (loading) return <ActivityIndicator size="large"/>;
		return (
			<View style={styles.container}>
				<Text style={styles.bodyText}> {this.props.Post.body} </Text>
				<Fab
            onPress={this.updatePost}
            style={styles.updatePost}
          >
            <Icon name="ios-create" />
         </Fab>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		padding: 20,
		flex: 1
	},
	bodyText: {
		fontSize: 16
	},
	 UpdatePost: {
  	backgroundColor: "#82D8D8"
  }
});



const postQuery = gql`
 query Post($id: ID!) {
   Post(id: $id) {
   	id
   	title 
   	body
   }
 }
`;

export default graphql(postQuery, {
	props: ({data}) => ({...data}),
	options: ({navigation}) => ({
    variables: {
    	id: navigation.state.params.id
    }
	})
})(Post);
import React from 'react'
import {StyleSheet, View, Text} from 'react-native'

class FilmDetail extends React.Component{
  render(){
    console.log(this.props.route.params.idFilm);
    return(
      <View style={styles.main_container}>
        <Text>Détail du film {this.props.route.params.idFilm}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1
  }
})

export default FilmDetail

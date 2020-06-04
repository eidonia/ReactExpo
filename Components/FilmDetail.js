import React from 'react'
import {StyleSheet, View, Text, ActivityIndicator, ScrollView, Image } from 'react-native'
import { getFilmDetailFromApi, getImageFromApi } from '../Api/TMDBApi'
import { connect } from 'react-redux'


const mapStateToProps = (state) => {
  return state
}

class FilmDetail extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      film: undefined,
      isLoading: true
    }
  }

  _displayLoading(){
    if (this.state.isLoading) {
      return(
        <View style={styles.loading_container}>
          <ActivityIndicator size='large'/>
        </View>
      )
    }
  }

  _displayFilm(){
    if (this.state.film != undefined) {
      return(
        <ScrollView style={styles.scroll}>
        <View style={styles.image_view}>
          <Image
            style={styles.image}
            source={{uri: getImageFromApi(this.state.film.backdrop_path)}}
          />
        </View>
          <View style={styles.title_view}>
            <Text style={styles.text_title}>{this.state.film.title}</Text>
          </View>
          <View style={styles.descr_view}>
            <Text style={styles.text_descr}>{this.state.film.overview}</Text>
          </View>
          <View style={styles.origtitle_view}>
            <Text style={styles.text}>Sorti le {this.state.film.release_date}</Text>
          </View>
          <View style={styles.origtitle_view}>
            <Text style={styles.text}>Titre original: {this.state.film.original_title}</Text>
          </View>
          <View style={styles.origtitle_view}>
            <Text style={styles.text}>Note: {this.state.film.vote_average}/10</Text>
          </View>
          <View style={styles.origtitle_view}>
            <Text style={styles.text}>Nombre de vote: {this.state.film.vote_count}</Text>
          </View>
          <View style={styles.origtitle_view}>
            <Text style={styles.text}>Budget: {this.state.film.budget}</Text>
          </View>
          <View style={styles.origtitle_view}>
            <Text style={styles.text}>Genre: {this.state.film.genres.map(function(genre){
              return genre.name;
            }).join(" / ")}</Text>
          </View>
          <View style={styles.origtitle_view}>
            <Text style={styles.text}>Companies: {this.state.film.production_companies.map(function(company){
              return company.name
            }).join(" / ")}</Text>
          </View>

        </ScrollView>
      )
    }
  }


  render(){
    console.log(this.props)
    return(
      <View style={styles.main_container}>
        {this._displayLoading()}
        {this._displayFilm()}
      </View>
    )
  }


  componentDidMount(){
    getFilmDetailFromApi(this.props.route.params.idFilm).then(data => {
      this.setState({
        film: data,
        isLoading: false
      })
    })
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  scroll: {
    flex: 1
  },
  title_view:{
    paddingTop: 10,
    alignItems: 'center'
  },
  text_title: {
    fontWeight: "bold",
    flexWrap: 'wrap',
    fontSize: 45,
    marginRight: 10,
    marginLeft: 10
  },
  image_view: {
    paddingTop: 10,
  },
  image: {
    alignSelf: 'stretch',
    height: 250,
    backgroundColor: 'gray',
  },
  release_view:{
    paddingTop: 10,
    alignItems: 'center'
  },
  origtitle_view: {
    paddingLeft: 10
  },
  text_descr: {
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    color: 'gray'
  }

})

export default connect(mapStateToProps)(FilmDetail)

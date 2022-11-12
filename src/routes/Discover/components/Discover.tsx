import React, { Component } from 'react';
import DiscoverBlock from './DiscoverBlock/components/DiscoverBlock';
import '../styles/_discover.scss';

import {
  getAccessToken,
  getNewReleases,
  getFeaturedPlayLists,
  getCategories
} from '../../../services/service';
//TODO: Fix `any` types here

interface IDiscoverProps { }

interface IDiscoverState {
  newReleases: Array<any>;
  playlists: Array<any>;
  categories: Array<any>;
}

export default class Discover extends Component<IDiscoverProps, IDiscoverState> {
  constructor(props: IDiscoverProps) {
    super(props);

    this.state = {
      newReleases: [],
      playlists: [],
      categories: []
    };


  }

  async componentDidMount() {
    await getAccessToken();
    const newReleases = await getNewReleases();
    const playlists = await getFeaturedPlayLists()
    const categories = await getCategories()
    
   
    this.setState({
      newReleases: newReleases,
      playlists: playlists,
      categories: categories
    })

  }

  render() {

    const { newReleases, playlists, categories } = this.state;


    return (
      <div className="discover">
        <DiscoverBlock text="RELEASED THIS WEEK" id="released" data={newReleases} />
        <DiscoverBlock text="FEATURED PLAYLISTS" id="featured" data={playlists} />
        <DiscoverBlock text="BROWSE" id="browse" data={categories} imagesKey="icons" />
      </div>
    );
  }
}


//   async componentDidMount() {
//   const token = await getToken();
//   const songsList = await fetchAllSongs(token);
//   this.setState(songsList);
// }
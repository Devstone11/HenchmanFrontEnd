import React from 'react';

class Scene extends React.Component {

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     data: '',
  //     showScene: 0
  //   };
  // }
  //
  // pickScene(encounterId) {
  //   this.setState({showScene: sceneId});
  // }
  //
  // getScenes () {
  //   $.ajax({
  //     url: this.props.url + this.props.campaignInfo.id,
  //     dataType: 'json',
  //     cache: false,
  //     success: function(data) {
  //       this.setState({data: data});
  //       console.log(this.state.data);
  //     }.bind(this),
  //     error: function(xhr, status, err) {
  //       console.error(this.props.url, status, err.toString());
  //     }.bind(this)
  //   })
  // }

  render() {
    // var url = this.props.url;
    // var sceneNodes;
    var sceneThis = this;
    // if (this.state.data.length > 0) {
    //   if (this.state.showScene === 0) {
    //     sceneNodes = this.state.data.map(function(scene) {
    //       return <Scene key={scene.id} sceneInfo={scene} url={url} pickScene={encounterThis.pickScene.bind(encounterThis)} />
    //     });
    //   } else {
    //     this.state.data.forEach(function(scene) {
    //       if (scene.id === encounterThis.state.showScene) {
    //         sceneNodes = <Scene key={scene.id} sceneInfo={scene} url={url}/>;
    //       }
    //     })
    //   }
    //   return (
    //     <div>
    //       {sceneNodes}
    //     </div>
    //   )
    // } else {
        return (
          <div>
            <p>Scene id: {sceneThis.props.sceneInfo.id}</p>
            <p>Scene name: {this.props.sceneInfo.name}</p>
          </div>
        )
    // }
  }
}

export default Scene;

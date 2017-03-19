import React, { Component } from 'react'
import Dropzone from '../DropZone'

class DropZoneDemo extends Component {
  constructor () {
    super()

    this.state = {
      files: []
    }
  }

  onDrop = (files) => {
    console.log(files[files.length-1])
    this.setState({
      files: Array.concat(this.state.files, files)
    });
  }

  onOpenClick = () => {
    this.refs.dropzone.open();
  }

  render () {
    const { files } = this.state 

    return (
      <div>
        <Dropzone ref="dropzone" onDrop={this.onDrop} />
        <div>
          <h2>Uploading {files.length} files...</h2>
          <div>
            { files.map((file, index) => <img key={index} src={file.preview} width={200} />)}
          </div>
        </div>
      </div>
    )
  }
}

export default DropZoneDemo
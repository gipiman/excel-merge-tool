import React, { Component } from 'react'
import Dropzone from '../DropZone'
//import xlsx from 'xlsx'
import xlsxStyle from 'xlsx-style'
import fileSaver from 'file-saver'

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

  openFile = () => {
    const { files } = this.state
    let reader = new FileReader()

    reader.onloadend = () => {
      let data = xlsxStyle.read(reader.result, {type: 'binary'})
      let wopts = { bookType:'xlsx', bookSST:false, type:'binary' };
      let wbout = xlsxStyle.write(data, wopts);

      function s2ab(s) {
        var buf = new ArrayBuffer(s.length);
        var view = new Uint8Array(buf);
        for (var i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
      }

      fileSaver.saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), "test.xlsx");
    }
    
    reader.readAsBinaryString(files[0])
  }

  onOpenClick = () => {
    this.refs.dropzone.open();
  }

  render () {
    const { files } = this.state
    
    return (
      <div>
        <Dropzone ref="dropzone" onDrop={this.onDrop} />
        <button onClick={this.openFile}>File Open</button>
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
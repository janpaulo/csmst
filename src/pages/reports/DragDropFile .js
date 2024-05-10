import React from 'react';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import {Button} from '@mui/material';

class DragDropFile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dragActive: false
        };
    }

    

    render() {
        const { dragActive } = this.props;
        const { handleDrag,handleDrop, onButtonClick,handleChange,inputRef } = this.props;

        return (
            <form id="form-file-upload" onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()}>
                <input ref={inputRef} type="file" id="input-file-upload" multiple={true} onChange={handleChange} />
                <label id="label-file-upload" htmlFor="input-file-upload" className={dragActive ? "drag-active" : ""}>
                    <div>
                        <p>Drag and drop your file here or</p>
                        <div> <CloudDownloadIcon fontSize='large' style={{fontSize: "85px"}}/></div>
                        <Button className="upload-button" onClick={onButtonClick}><b>Upload a file</b></Button>
                    </div>
                </label>
                {dragActive && <div id="drag-file-element" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div>}
            </form>
        );
    }
}

export default DragDropFile;
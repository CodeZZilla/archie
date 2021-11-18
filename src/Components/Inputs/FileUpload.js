import React from "react";
import {Dropzone, FileItem} from "@dropzone-ui/react";
import FilesClientAdd from "../../Store/FilesClientAdd";
import {observer} from "mobx-react-lite";

const FileUpload = observer(() => {

    const updateFiles = (incommingFiles) => {
        FilesClientAdd.setFiles(incommingFiles)
    };

    const removeFile = (id) => {
        FilesClientAdd.setFiles(FilesClientAdd.getFiles().filter((x) => x.id !== id));
    };

    return (
        <Dropzone
            style={{minWidth: "505px"}}
            onChange={updateFiles}
            value={FilesClientAdd.getFiles()}
            maxFiles={20}
            maxFileSize={20970000}
        >
            {FilesClientAdd.getFiles().map((file) =>
                <FileItem {...file} onDelete={removeFile} preview info key={file.id}/>
            )}
        </Dropzone>
    );
})

export default FileUpload
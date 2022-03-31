import axios from 'axios'

const downloadFile = async ( document ) =>{
    const url = `http://159.223.159.18:8000/api/documents/${document}/download`;
    var files = [];
    await axios.get(url).then( r => {
        files = r.data.files
        
    });

    return files;
}


const uploadFile = ( file, name ) =>{
    const url = `http://159.223.159.18:8000/api/documents/${document}/upload`;

    axios.post(url, { file: file, name: name  })
    .then(r => {
        console.log(r)
    });

}

export  { downloadFile, uploadFile }
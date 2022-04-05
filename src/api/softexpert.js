import axios from 'axios'

const downloadFile = async ( document ) =>{
    const url = `http://159.223.159.18:8000/api/documents/${document}/download`;
    var files = [];
    await axios.get(url).then( r => {
        files = r.data.files
        
    });

    return files;
}

const getDocuments = async ( request ) => {
    const url = `http://localhost:8000/api/documents/${request}`;

    var documents = [];
    await axios.get(url).then( r => {
        documents = r.data.data
        console.log( r.data )
    })
    return documents;
}

const uploadFile = async ( file, documentData ) =>{
    const url = `http://localhost:8000/api/documents/${documentData.IDDOCUMENT}/upload`;

    const data = {
        iddocument: documentData.IDDOCUMENT,
        base64: file,
        title: documentData.NMTITLE,
    };

    var result = null;
    await axios.post(url, { iddocument: documentData.IDDOCUMENT, file: file, title: documentData.NMTITLE + '- QR'  })
    .then(r => {
        result = r.data
    });

    return result;

}

export  { downloadFile, uploadFile, getDocuments }
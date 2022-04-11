import axios from 'axios'
import { softexpertApiHostDev, softexpertApiHostLocal } from '../utils';

const downloadFile = async ( document ) =>{
    const url = `${softexpertApiHostDev}/api/documents/${document}/download`;
    var files = [];
    await axios.get(url).then( r => {
        files = r.data.files
        
    });

    return files;
}

const getDocuments = async ( request ) => {
    const url = `${softexpertApiHostDev}/api/documents/${request}`;

    var documents = [];
    await axios.get(url).then( r => {
        documents = r.data.data
    })
    return documents;
}

const uploadFile = async ( file, documentData ) =>{
    const url = `${softexpertApiHostDev}/api/documents/${documentData.IDDOCUMENT}/upload`;

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

const saveDocumentData = async ( documentData, request, document ) =>{ 
    const url = `${softexpertApiHostDev}/api/documents/savedata`;

    var result = null;
    const data = {
        data: documentData,
        request_id: request,
        document_id: document
    }
    await axios.post( url, data ).then( r => {
        result = r.data
    })

    return result;
}

const getDocumentData = async ( document, request ) =>{
    const url = `${softexpertApiHostDev}/api/documents/request/${request}/document/${document}`;
    var result = null;

    await axios.get( url).then( r => {
        result = r.data
    })

    return result;
}

export  { downloadFile, uploadFile, getDocuments, getDocumentData, saveDocumentData }
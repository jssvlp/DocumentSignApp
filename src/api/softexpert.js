import axios from 'axios'
import { softexpertApi,  fileServer } from '../hosts';

const downloadFile = async ( document ) =>{
    const url = `${fileServer}/api/documents/${document}/download`;
    var files = [];
    
    await axios.get(url).then( r => {
        files = r.data.files
        
    });

    return files;
}

const getDocuments = async ( request,categories ) => {
    const url = `${softexpertApi}/api/documents/${request}?categories=${categories}`;

    var documents = [];
    await axios.get(url).then( r => {
        documents = r.data.data
    })
    return documents;
}

const uploadFile = async ( file, documentData ) =>{
    const url = `${softexpertApi}/api/documents/${documentData.IDDOCUMENT}/upload`;

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
    const url = `${softexpertApi}/api/documents/savedata`;

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
    const url = `${softexpertApi}/api/documents/request/${request}/document/${document}`;
    var result = null;

    await axios.get( url).then( r => {
        result = r.data
    })
    return result;
}

const getWorkflowData = async (workflowId) =>{
    const url = `${softexpertApi}/api/projects/dpp/${workflowId}`;

    var result = null;

    await axios.get( url).then( r => {
        result = r.data
    })
    return result;
}

export  { downloadFile, uploadFile, getDocuments, getDocumentData, saveDocumentData, getWorkflowData }
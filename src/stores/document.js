import { defineStore } from 'pinia'
import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { decode, encode } from 'base64-arraybuffer';
import  download  from 'downloadjs'
import { loadWaitPdfBytes } from '../utils/wait.js';

export const useDocumentStore = defineStore('document', {
    state: () => ({
        src: null,
        file: null,
        showThisPage: null,
        pages: 0,
        currentPage: 1,
        samePosition: false,
        insertInAllPages: false,
        size: 100,
        width: 0,
        height: 0,
        qr: null,
        position: {
            x: 0,
            y: 0
        },
        pagesDone: [],
        document: null,
        allRequestDocuments: [],
        loading: false,
        loadingMessage: 'Cargando...',
        response: {
            success:'',
            message: ''
        },
        qrData: 'https://google.com',
        documentData:null,
        validationUrl: '',
        company: '',
        request: '',
        showQr: false,
        uid: Math.floor(Math.random() * 1000000 + 1),
        waitPdfFile: null
    }),
    actions: {
        setAllRequestDocuments(documents){
            this.allRequestDocuments = documents;
        },
        setQr(qr) {
            this.qr = qr
        },
        setPages(pages) {
            this.pages = pages
        },
        next(){
            this.currentPage++
            const copy = this.file
            this.file = this.waitPdfFile
            setTimeout(() => this.file = copy, 100);
        },
        prev(){
            if(this.currentPage > 1){
                this.currentPage--
                const copy = this.file
                this.file = this.waitPdfFile
                setTimeout(() => this.file = copy, 100);
                // this.file = copy
            }
        },
        setCurrentPage( page) {
            this.currentPage = parseInt(page)
        },
        async setFile(file) {

            const waitPdfBytes = await loadWaitPdfBytes();
            this.waitPdfFile = encode(waitPdfBytes);;
            
            const url = 'https://apisoftexpert.servicios.mitur.gob.do/storage/6zOE5VWm9v.pdf'
            //const url = file.route;
            const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer())
            const pdfDoc = await PDFDocument.load(existingPdfBytes)
            const pages = pdfDoc.getPages();
            
            this.width = pages[0].getWidth()
            this.height = pages[0].getHeight();
            this.pages = pages;
            this.showThisPage = pages[0];

            const pdfBytes = await pdfDoc.save();
            const base64String = encode(pdfBytes);

            this.src = `data:application/pdf;base64,${base64String}#toolbar=0&navpanes=0&scrollbar=0`
            this.file = base64String
        },
        setSamePosition(samePosition) {
            this.samePosition = samePosition
        },
        setInsertInAllPages(insertInAllPages) {
            this.insertInAllPages = insertInAllPages
            this.samePosition = !this.samePosition
        },
        async addText(text) {
            const existingPdfBytes = await decode(this.file)

            const pdfDoc = await PDFDocument.load(existingPdfBytes)
            const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)

            const pages = pdfDoc.getPages()
            const firstPage = pages[0]
            const { width, height } = firstPage.getSize()
            firstPage.drawText('This text was added with JavaScript!', {
                x: 5,
                y: height / 2 + 300,
                size: 50,
                font: helveticaFont,
                color: rgb(0.95, 0.1, 0.1),
                rotate: degrees(-45),
            })

            const pdfBytes = await pdfDoc.save()
            var base64String = encode(pdfBytes)

            this.file = base64String
        },
        async updateQr(){
            const existingPdfBytes = await decode(this.file)
            const pdfDoc = await PDFDocument.load(existingPdfBytes)
            const qr = this.qr.replace('data:image/png;base64,', '')
            const pngImageBytes = decode(qr)
            const pngImage = await pdfDoc.embedPng(pngImageBytes)

            const pngDims = pngImage.scale(0.2)
            if( this.insertInAllPages) {
                const pages = pdfDoc.getPages();
                for( let i = 0; i < pages.length; i++) {
                    const page = pages[i];
                    page.drawImage(pngImage, {
                        x: this.position.x,
                        y:  this.position.y == 0 ? this.height - this.size : this.height -  (this.position.y + this.size),
                        width: this.size,
                        height: this.size
                    })

                }
            }else {
                const page = pdfDoc.getPages()[this.currentPage - 1];
                page.drawImage(pngImage, {
                    x: this.position.x,
                    y:  this.position.y,
                    width: this.size,
                    height: this.size,
                });
            }
            const pdfBytes = await pdfDoc.save()
            
            var base64String = encode(pdfBytes)
            this.file =  base64String
            this.src = `data:application/pdf;base64,${base64String}#toolbar=0&navpanes=0&scrollbar=0`
            // this.showQr = false

        },
        async updateSignature(signature, position, pages){ 

        },
        async saveDocument(image, position, pages){

        },
        setSize(size){
            this.size = size
        },
        downloadDocument(){
            const pdfBytes = decode(this.file)
            download(pdfBytes,`${this.document.NMTITLE}.pdf`, "application/pdf");
        },

        
    
    }
})
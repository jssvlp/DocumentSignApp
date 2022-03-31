import { defineStore } from 'pinia'
import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { decode, encode } from 'base64-arraybuffer';

export const useDocumentStore = defineStore('document', {
    state: () => ({
        file: null,
        pages: 0,
        currentPage: 0,
        samePosition: true,
        insertInAllPages: true,
        qr: null,
        position: {
            x: 0,
            y: 0
        }

    }),
    actions: {
        setQr(qr) {
            this.qr = qr
        },
        setPages(pages) {
            this.pages = pages
        },
        next(){
            this.currentPage++
        },
        prev(){
            this.currentPage--
        },
        setCurrentPage( page) {
            this.currentPage = page
        },
        async setFile(file) {
            const existingPdfBytes = await decode(file)

            const pdfDoc = await PDFDocument.load(existingPdfBytes)
            const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)

            const pages = pdfDoc.getPages()
            this.pages = pages.length
            this.file = file
            
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
        async updateQr(position){
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
                        x:  10  ,
                        y: page.getHeight()  - pngDims.height - 10 ,
                        width: pngDims.width,
                        height: pngDims.height
                    })
                }
            }else {
                const page = pdfDoc.getPages()[this.currentPage];
                page.drawImage(pngImage, {
                    x:  10  ,
                    y: page.getHeight()  - pngDims.height - 10 ,
                    width: pngDims.width,
                    height: pngDims.height,
                });
            }
            const pdfBytes = await pdfDoc.save()
            
            var base64String = encode(pdfBytes)
            this.file = base64String
        },
        async updateSignature(signature, position, pages){ 

        },
        async saveDocument(image, position, pages){

        }
    }
})
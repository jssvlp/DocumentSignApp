

const loadWaitPdfBytes = async () => {
    const url = '/wait.pdf';
    const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer())

    return existingPdfBytes;
}

export { loadWaitPdfBytes };
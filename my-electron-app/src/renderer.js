const information = document.getElementById('info')
information.innerText = `This app is using Chrome (v${versions.chrome()}),
 Node.js (v${versions.node()}), and Electron (v${versions.electron()})`

const fsButton = document.getElementById('fsButton')

fsButton.addEventListener('click', async (filePath) => {
    console.log('fs button clicked')

    // const outputData = document.getElementById('output');

    // window.fileSelector.readFile(filePath).then(data => {
    //     outputData.textContent = `File content: ${data}`;
    // }).catch(err => {
    //     outputData.textContent = `Error reading file: ${err.message}`;
    // })
})



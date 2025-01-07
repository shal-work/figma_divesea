
const formsUpload = () => {
    const form = document.querySelectorAll('form'),
          inputs = document.querySelectorAll('input'),
          upload = document.querySelectorAll('[id="upload"]');



    upload[0].addEventListener('click', () => {
        upload.forEach(item => {
            // debugger
            item.addEventListener('input', () => {
                let f = item.files[0];
                if (f) {
                    img1.src = URL.createObjectURL(f);
                    localStorage.setItem('myImage', img1.src);
                }
            });
        });
    })
};

export default formsUpload;

$(`[data-btn="upload"]`).on('click', () => {
    $('.sell__upload-file ').toggleClass("sell__upload-file-hiden");
    $('.sell__upload-file .sell__comment').toggleClass("sell__comment-hiden");
    $(`[id="img1"]`).toggleClass("sell__upload-photo-hiden");
    $(`[id="img1"]`).toggleClass("sell__upload-photo");
});
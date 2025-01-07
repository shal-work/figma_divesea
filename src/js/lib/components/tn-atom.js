const tnAtom = () => {
    const atom = document.querySelector('.tn-atom');
    const height = window.getComputedStyle(document.querySelector('body')).height;
    if (window.getComputedStyle(atom, null).display !== 'none') atom.style.height = height;
    else atom.style.height = 0;

};

export default tnAtom;

import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


function Editor() {
    const [value, setValue] = useState('');

    const modules = {
        toolbar: [
          [{ 'header': [1, 2, false] }],
          ['bold', 'italic', 'underline','strike', 'blockquote'],
          [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
          ['link', 'image'],
          ['clean']
        ],
    }

    return (
        <>
            {/* DEBUG */}
            <br/>
            {value}
            <br/>
            {/* DEBUG */}

            <ReactQuill 
                theme="snow" 
                value={value} 
                onChange={setValue}
                modules={modules} 
            />
        </>
    );
}


export default Editor;

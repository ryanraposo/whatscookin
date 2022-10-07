import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


function PostForm() {
    const [value, setValue] = useState('');

    const quillModules = {
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
            <h2 style={{color: "red"}}>DEBUG</h2>
            <br/>{value}<br/>
            <h2 style={{color: "red"}}>DEBUG</h2>
            {/* DEBUG */}
            <ReactQuill 
                theme="snow" 
                value={value} 
                onChange={setValue}
                modules={quillModules} 
            />

        </>
    );
}


export default PostForm;

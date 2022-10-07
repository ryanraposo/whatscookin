import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_POST } from '../../utils/mutations';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


function PostForm() {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [categories, setCategories] = useState({
        breakfast: false,
        lunch: false,
        dinner: false,
        dessert: false,
        soup: false
    });

    const [addPost, { error }] = useMutation(ADD_POST);

    const quillModules = {
        toolbar: [
          [{ 'header': [1, 2, false] }],
          ['bold', 'italic', 'underline','strike', 'blockquote'],
          [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
          ['link', 'image'],
          ['clean']
        ],
    }

    async function handleSubmit(event) {
        event.preventDefault();

        console.log({
            "title" : title,
            "body": body,
            "categories": categories
        });
        
        try {
            await addPost({
                variables: { title, body, categories }
            });
        } catch (e) {
            console.error(e);
        }
    }

    function handleCheckboxChange(e) {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        const name = e.target.name;

        setCategories(prevCategories => {
            return {
                ...prevCategories,
                [name]: value
            }
        });
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Title: </label>
                <input type="text" id="title" onChange={(e) => setTitle(e.target.value)} />
                <ReactQuill 
                    theme="snow" 
                    value={body} 
                    onChange={setBody}
                    modules={quillModules} 
                />
                <div>
                    <input type="checkbox"
                        name="breakfast"
                        onChange={handleCheckboxChange}
                        checked={categories.breakfast}
                    />
                    <label htmlFor="breakfast">Breakfast</label><br/>

                    <input type="checkbox"
                        name="lunch"
                        onChange={handleCheckboxChange}
                        checked={categories.lunch}
                    />
                    <label htmlFor="lunch">Lunch</label><br/>

                    <input type="checkbox"
                        name="dinner"
                        onChange={handleCheckboxChange}
                        checked={categories.dinner}
                    />
                    <label htmlFor="dinner">Dinner</label><br/>

                    <input type="checkbox"
                        name="dessert"
                        onChange={handleCheckboxChange}
                        checked={categories.dessert}
                    />
                    <label htmlFor="dessert">Dessert</label><br/>

                    <input type="checkbox"
                        name="soup"
                        onChange={handleCheckboxChange}
                        checked={categories.soup}
                    />
                    <label htmlFor="soup">Soup</label><br/>

                </div>
                <button className="btn col-12 col-md-3" type="submit">
                    Submit
                </button>
                {error && <span className="ml-2"><br/>Something went wrong...</span>}
            </form>
        </div>
    );
}


export default PostForm;

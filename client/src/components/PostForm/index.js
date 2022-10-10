import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_POST } from '../../utils/mutations';
import { QUERY_CATEGORIES } from '../../utils/queries';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


function PostForm() {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [categories, setCategories] = useState({
        "breakfast": false,
        "lunch": false,
        "dinner": false,
        "dessert": false,
        "soup": false
    });

    const [addPost, { error }] = useMutation(ADD_POST);
    const { loading, data } = useQuery(QUERY_CATEGORIES);


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

        const categoryIDs = {
            "breakfast": data.categories[0]._id,
            "lunch": data.categories[1]._id,
            "dinner": data.categories[2]._id,
            "dessert": data.categories[3]._id,
            "soup": data.categories[4]._id
        }

        console.log(categoryIDs);

        const selectedCategories = [];
        for (const [category, isChecked] of Object.entries(categories)) {
            if (isChecked) {
                selectedCategories.push(categoryIDs[category]);
            } 
        };

        const vars = {
            "postTitle" : title,
            "postBody": body,
            "categories": selectedCategories
        };

        
        try {
            await addPost({
                variables: vars
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

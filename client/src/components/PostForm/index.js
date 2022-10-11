import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_POST } from '../../utils/mutations';
import { QUERY_CATEGORIES } from '../../utils/queries';

import {Button, Container, Form, Card} from 'react-bootstrap'
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

        console.log(vars);

        
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
        <Container className = "postMain">
            <Card className = "postCard">
            <h2>Create a new Post!</h2>
            <Form.Group  onSubmit={handleSubmit}>
                <Form.Control className = "mb-2" placeholder = "What is the Name of your Dish!?" type="text" id="title" onChange={(e) => setTitle(e.target.value)} />
                <ReactQuill 
                    className = "quill"
                    theme="snow" 
                    value={body} 
                    onChange={setBody}
                    modules={quillModules} 
                />
                <h5>What categories best descibe your dish?</h5>
                <Container>
                    <Form.Check type="checkbox"
                    label = "Breakfast"
                        name="breakfast"
                        onChange={handleCheckboxChange}
                        checked={categories.breakfast}
                    />
                    

                    <Form.Check type="checkbox"
                    label = "Lunch"
                        name="lunch"
                        onChange={handleCheckboxChange}
                        checked={categories.lunch}
                    />
                    

                    <Form.Check type="checkbox"
                    label = "Dinner"
                        name="dinner"
                        onChange={handleCheckboxChange}
                        checked={categories.dinner}
                    />
                    

                    <Form.Check type="checkbox"
                    label = "Dessert"
                        name="dessert"
                        onChange={handleCheckboxChange}
                        checked={categories.dessert}
                    />
                    

                    <Form.Check type="checkbox"
                    label = "Soup"
                        name="soup"
                        onChange={handleCheckboxChange}
                        checked={categories.soup}
                    />
                    

                </Container>
                <Button className="btn col-12 col-md-3" type="submit">
                    Submit
                </Button>
                {error && <span className="ml-2"><br/>Something went wrong...</span>}
            </Form.Group>
            </Card>
        </Container>
    );
}


export default PostForm;
